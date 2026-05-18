"use client";

import Sidebar from "@/components/ui/Sidebar";
import "../globals.css";
import { Download, Filter, FileText, Search } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Fragment, useState, useMemo } from "react";
import BoardHeader from "@/components/ui/BoardHeader";
import {
  ENABLE_AI_SUMMARY,
  ENABLE_HISTORY_REPORT,
} from "@/lib/features";
import {
  fetchHeliusTransactions,
  parseHeliusTx,
  type TxRow,
} from "@/lib/helius-transactions";
import TxAiSummary from "@/components/history/TxAiSummary";
import WeeklyReportModal from "@/components/history/WeeklyReportModal";
import type { WeeklyReportResponse } from "@/app/api/history/report/route";

export default function HistoryPage() {
  const { publicKey } = useWallet();
  const [txRows, setTxRows] = useState<TxRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const [reportOpen, setReportOpen] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const [report, setReport] = useState<WeeklyReportResponse | null>(null);

  const fetchTxs = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const address = publicKey.toString();
      const data = await fetchHeliusTransactions(address);
      setTxRows(data.map((tx) => parseHeliusTx(tx, address)));
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!publicKey) return;
    setReportOpen(true);
    setReportLoading(true);
    setReportError(null);
    setReport(null);

    try {
      const res = await fetch(
        `/api/history/report?wallet=${encodeURIComponent(publicKey.toString())}`,
      );
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Failed to generate report");
      }
      setReport((await res.json()) as WeeklyReportResponse);
    } catch (err) {
      setReportError(
        err instanceof Error ? err.message : "Report unavailable",
      );
    } finally {
      setReportLoading(false);
    }
  };
  const handleRefresh = async () => {
    if (!publicKey) return;
    setHasFetched(true);
    await fetchTxs();
  };

  // useEffect(() => {
  //   if (!publicKey) return;
  //   if (hasFetched.current) return; // ✅ only fetch once per mount
  //   hasFetched.current = true;

  //   const fetchTxs = async () => {
  //     setLoading(true);
  //     try {
  //       const sigs = await connection.getSignaturesForAddress(publicKey, {
  //         limit: 5,
  //       });

  //       if (sigs.length === 0) {
  //         setTxRows([]);
  //         return;
  //       }

  //       // ✅ fetch in one batch, not individually
  //       const parsed = await connection.getParsedTransactions(
  //         sigs.map((s) => s.signature),
  //         { maxSupportedTransactionVersion: 0 },
  //       );

  //       const rows: TxRow[] = [];
  //       for (let i = 0; i < sigs.length; i++) {
  //         const tx = parsed[i];
  //         if (!tx) continue;
  //         const row = await parseTx(tx, sigs[i], publicKey.toString());
  //         rows.push(row);
  //       }
  //       setTxRows(rows);
  //     } catch (err) {
  //       console.error("Failed to fetch transactions:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTxs();
  // }, [publicKey]); // ✅ only re-run if publicKey changes

  // ✅ reset hasFetched when wallet changes so new wallet triggers fresh fetch
  // useEffect(() => {
  //   hasFetched.current = false;
  // }, [publicKey]);

  const filtered = useMemo(
    () =>
      txRows.filter(
        (tx) =>
          search === "" ||
          tx.signature.toLowerCase().includes(search.toLowerCase()) ||
          tx.counterparty.toLowerCase().includes(search.toLowerCase()),
      ),
    [txRows, search],
  );

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-surface overflow-y-auto relative">
        <BoardHeader title="History" />
        <section className="p-8 mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tighter text-on-surface mb-2">
                History
              </h2>
              <p className="text-on-surface-variant/60 font-medium tracking-wide text-sm">
                Public on-chain transactions. Private Umbra transfers will
                appear here once configured.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {ENABLE_HISTORY_REPORT && (
                <button
                  type="button"
                  onClick={handleGenerateReport}
                  disabled={!publicKey}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary-container text-xs font-black uppercase tracking-wider rounded-lg transition-all disabled:opacity-40"
                >
                  <FileText size={14} /> Generate Weekly Report
                </button>
              )}
              <div className="relative flex items-center">
                <Search
                  className="absolute left-3 text-on-surface-variant/50"
                  size={14}
                />
                <input
                  className="bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2.5 text-xs text-on-surface w-64 focus:ring-1 focus:ring-primary-container/30 transition-all"
                  placeholder="Search hash, address..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface-variant hover:text-on-surface text-xs font-bold uppercase tracking-wider rounded-lg border border-outline-variant/10 transition-all">
                <Filter size={14} /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface-variant hover:text-on-surface text-xs font-bold uppercase tracking-wider rounded-lg border border-outline-variant/10 transition-all">
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-outline-variant/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-12 gap-4 bg-surface-container-lowest py-4 px-6 text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant/40">
              <div className="col-span-2">Date & Time</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Counterparty</div>
              <div className="col-span-3">Amount</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            {!publicKey && (
              <div className="py-16 text-center text-on-surface-variant/50 text-sm bg-surface-container-low">
                Connect your wallet to view transaction history.
              </div>
            )}

            {publicKey && loading && (
              <div className="py-16 text-center text-on-surface-variant/50 text-sm bg-surface-container-low animate-pulse">
                Fetching transactions...
              </div>
            )}

            {publicKey && !hasFetched && !loading && (
              <div className="py-16 text-center bg-surface-container-low">
                <button
                  onClick={handleRefresh}
                  className="px-6 py-4 bg-primary text-on-primary-container rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  Load Transactions
                </button>
              </div>
            )}

            {filtered.map((tx, i) => (
              <Fragment key={tx.signature}>
              <div
                key={tx.signature}
                className={`grid grid-cols-12 gap-4 py-6 px-6 items-center hover:bg-surface-container transition-all cursor-pointer border-t border-outline-variant/5 ${
                  i % 2 === 0 ? "bg-surface-container-low" : "bg-surface"
                }`}
                onClick={() =>
                  window.open(
                    `https://solscan.io/tx/${tx.signature}?cluster=devnet`,
                    "_blank",
                  )
                }
              >
                <div className="col-span-2 flex flex-col">
                  <span className="text-sm font-bold text-on-surface">
                    {tx.date}
                  </span>
                  <span className="text-[10px] text-on-surface-variant/50 uppercase tracking-tighter">
                    {tx.time}
                  </span>
                </div>

                <div className="col-span-2">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${
                      tx.type === "Received"
                        ? "bg-tertiary-container/20 border-tertiary-fixed-dim/20 text-tertiary-fixed-dim"
                        : tx.type === "Sent"
                          ? "bg-on-primary-fixed-variant/20 border-primary-container/10 text-primary-container"
                          : "bg-surface-container border-outline-variant/20 text-on-surface-variant"
                    }`}
                  >
                    {tx.type}
                  </div>
                </div>

                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-on-surface-variant/30 text-xs font-mono">
                    {tx.counterparty.slice(0, 2)}
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant truncate">
                    {tx.counterparty}
                  </span>
                </div>

                <div className="col-span-3">
                  <span className="text-lg font-bold tracking-tight text-on-surface">
                    {tx.amount}
                  </span>
                  <span className="text-[10px] font-bold text-primary-container ml-1">
                    {tx.token}
                  </span>
                </div>

                <div className="col-span-2 text-right">
                  {tx.status === "confirmed" ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary-fixed-dim border border-tertiary-fixed-dim/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Confirmed
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container/20 text-error border border-error/20">
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Failed
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {ENABLE_AI_SUMMARY && <TxAiSummary tx={tx} />}
              </Fragment>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between px-2">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant/40 tracking-widest">
              Showing {filtered.length} of {txRows.length} transactions
            </span>
          </div>
        </section>
      </main>

      <WeeklyReportModal
        open={reportOpen}
        loading={reportLoading}
        error={reportError}
        report={report}
        onClose={() => setReportOpen(false)}
      />
    </div>
  );
}
