"use client";

import Sidebar from "@/components/Sidebar";
import "../globals.css";
import { Download, Filter, Search } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  Connection,
  ConfirmedSignatureInfo,
  ParsedTransactionWithMeta,
  PublicKey,
} from "@solana/web3.js";
import { config } from "@/lib/config";
import BoardHeader from "@/components/BoardHeader";

const connection = new Connection(config.devnet_rpc, "confirmed");

type TxRow = {
  signature: string;
  date: string;
  time: string;
  type: "Sent" | "Received" | "Unknown";
  counterparty: string;
  amount: string;
  token: string;
  status: "confirmed" | "failed";
};

function shortenAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

async function parseTx(
  tx: ParsedTransactionWithMeta,
  sig: ConfirmedSignatureInfo,
  walletAddress: string,
): Promise<TxRow> {
  const date = new Date((tx.blockTime ?? 0) * 1000);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toISOString().split("T")[1].split(".")[0] + " UTC";

  let type: TxRow["type"] = "Unknown";
  let counterparty = "Unknown";
  let amount = "—";
  let token = "SOL";

  try {
    const accountKeys = tx.transaction.message.accountKeys.map(
      (k: any) => k.pubkey?.toString() ?? k.toString(),
    );
    const preBalances = tx.meta?.preBalances ?? [];
    const postBalances = tx.meta?.postBalances ?? [];
    const walletIdx = accountKeys.indexOf(walletAddress);

    if (walletIdx !== -1) {
      const diff = (postBalances[walletIdx] - preBalances[walletIdx]) / 1e9;
      if (Math.abs(diff) > 0.000001) {
        amount = Math.abs(diff).toFixed(4);
        token = "SOL";
        type = diff > 0 ? "Received" : "Sent";
        const otherIdx = accountKeys.findIndex(
          (k: string, i: number) =>
            i !== walletIdx &&
            Math.abs((postBalances[i] - preBalances[i]) / 1e9) > 0.000001,
        );
        counterparty =
          otherIdx !== -1 ? shortenAddress(accountKeys[otherIdx]) : "Unknown";
      }
    }

    const tokenBalances = tx.meta?.postTokenBalances ?? [];
    const preTokenBalances = tx.meta?.preTokenBalances ?? [];

    if (tokenBalances.length > 0) {
      for (const post of tokenBalances) {
        const pre = preTokenBalances.find(
          (p) => p.accountIndex === post.accountIndex,
        );
        const postAmt = parseFloat(post.uiTokenAmount.uiAmountString ?? "0");
        const preAmt = parseFloat(pre?.uiTokenAmount.uiAmountString ?? "0");
        const diff = postAmt - preAmt;

        if (Math.abs(diff) > 0) {
          const owner = post.owner ?? accountKeys[post.accountIndex];
          amount = Math.abs(diff).toFixed(2);
          token = post.uiTokenAmount.decimals === 6 ? "USDC" : "SPL";
          type =
            owner === walletAddress
              ? diff > 0
                ? "Received"
                : "Sent"
              : "Unknown";
          const otherOwner = tokenBalances.find(
            (t) => t.owner !== owner,
          )?.owner;
          counterparty = otherOwner
            ? shortenAddress(otherOwner)
            : shortenAddress(accountKeys[1]);
          break;
        }
      }
    }
  } catch (_) {}

  return {
    signature: sig.signature,
    date: dateStr,
    time: timeStr,
    type,
    counterparty,
    amount,
    token,
    status: sig.err ? "failed" : "confirmed",
  };
}

export default function HistoryPage() {
  const { publicKey } = useWallet();
  const [txRows, setTxRows] = useState<TxRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const fetchTxs = async () => {
    try {
      const sigs = await connection.getSignaturesForAddress(
        publicKey as PublicKey,
        {
          limit: 5,
        },
      );

      if (sigs.length === 0) {
        setTxRows([]);
        return;
      }

      // ✅ fetch in one batch, not individually
      const parsed = await connection.getParsedTransactions(
        sigs.map((s) => s.signature),
        { maxSupportedTransactionVersion: 0 },
      );

      const rows: TxRow[] = [];
      for (let i = 0; i < sigs.length; i++) {
        const tx = parsed[i];
        if (!tx) continue;
        if (!publicKey) return;
        const row = await parseTx(tx, sigs[i], publicKey.toString());
        rows.push(row);
      }
      setTxRows(rows);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
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

            {publicKey && !hasFetched && (
              <div className="py-16 text-center bg-surface-container-low">
                <button
                  onClick={handleRefresh}
                  className="px-6 py-3 bg-primary text-on-primary-container rounded-xl font-black text-xs uppercase tracking-widest"
                >
                  Load Transactions
                </button>
              </div>
            )}

            {filtered.map((tx, i) => (
              <div
                key={tx.signature}
                className={`grid grid-cols-12 gap-4 py-6 px-6 items-center hover:bg-surface-container transition-all cursor-pointer border-t border-outline-variant/5 ${
                  i % 2 === 0 ? "bg-surface-container-low" : "bg-surface"
                }`}
                onClick={() =>
                  window.open(
                    `https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`,
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
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between px-2">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant/40 tracking-widest">
              Showing {filtered.length} of {txRows.length} transactions
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
