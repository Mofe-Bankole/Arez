"use client";

import React from "react";
import QRCode from "qrcode";
import { ArezPrivateTransferPayload, SendPrivatePayment } from "@/lib/payments";
import { ArezkProver } from "@/lib/umbra/provers";
import { IUmbraClient } from "@umbra-privacy/sdk/interfaces";
import SideBar from "@/components/ui/Sidebar";
import {
  CheckCircle2,
  CloudUpload,
  Eye,
  Lock,
  QrCode,
  ShieldCheck,
  XCircle,
  Loader2,
} from "lucide-react";
import BoardHeader from "@/components/ui/BoardHeader";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUmbra } from "@/context/UmbraContext";
import {
  ENABLE_BATCH_QR,
  ENABLE_BATCH_STATUS,
} from "@/lib/features";
import { savePayrollBatch } from "@/lib/supabase";
import PayrollQrModal from "@/components/payroll/PayrollQrModal";
import {
  addBatchHistoryEntry,
  loadBatchHistory,
  type BatchHistoryEntry,
} from "@/lib/storage/batch-history";

const SOL_MINT = "So11111111111111111111111111111111111111112";

type CSVRow = {
  recipient: string;
  amount: number;
  memo?: string;
};

type RowStatus = "pending" | "processing" | "success" | "failed";

type BatchRow = CSVRow & {
  status: RowStatus;
  error?: string;
  sig?: string;
};

function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

function parseCsvText(text: string): CSVRow[] {
  const lines = text.trim().split("\n");
  const headers = lines[0]
    .toLowerCase()
    .split(",")
    .map((h) => h.trim());

  const recipientIdx =
    headers.indexOf("wallet") !== -1
      ? headers.indexOf("wallet")
      : headers.indexOf("recipient");
  const amountIdx = headers.indexOf("amount");
  const memoIdx = headers.indexOf("memo");

  if (recipientIdx === -1 || amountIdx === -1) {
    throw new Error(
      'CSV must have "wallet" (or "recipient") and "amount" columns',
    );
  }

  const rows: CSVRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    if (!cols[recipientIdx] || !cols[amountIdx]) continue;
    rows.push({
      recipient: cols[recipientIdx],
      amount: parseFloat(cols[amountIdx]),
      memo: memoIdx !== -1 ? cols[memoIdx] : undefined,
    });
  }
  return rows;
}

export default function PayrollPage() {
  const { publicKey } = useWallet();
  const [shieldAll, setShieldAll] = React.useState(true);
  const [batchRows, setBatchRows] = React.useState<BatchRow[]>([]);
  const [parseError, setParseError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [qrOpen, setQrOpen] = React.useState(false);
  const [qrDataUrl, setQrDataUrl] = React.useState("");
  const [claimUrl, setClaimUrl] = React.useState("");
  const [qrLoading, setQrLoading] = React.useState(false);
  const [qrError, setQrError] = React.useState<string | null>(null);
  const [batchHistory, setBatchHistory] = React.useState<BatchHistoryEntry[]>(
    [],
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { umbraClient, initializeClient, ready } = useUmbra();

  React.useEffect(() => {
    if (ENABLE_BATCH_STATUS) {
      setBatchHistory(loadBatchHistory());
    }
  }, []);

  // — CSV handling —
  const handleFile = (file: File) => {
    setParseError(null);
    setIsDone(false);

    if (!file.name.endsWith(".csv")) {
      setParseError("File must be a .csv");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const rows = parseCsvText(text);

        if (rows.length === 0) {
          setParseError("No valid rows found in CSV");
          return;
        }

        // validate each row
        const validated: BatchRow[] = rows.map((row) => {
          if (!isValidSolanaAddress(row.recipient)) {
            return {
              ...row,
              status: "failed",
              error: "Invalid Solana address",
            };
          }
          if (isNaN(row.amount) || row.amount <= 0) {
            return { ...row, status: "failed", error: "Invalid amount" };
          }
          return { ...row, status: "pending" };
        });

        setBatchRows(validated);
      } catch (err: any) {
        setParseError(err.message ?? "Failed to parse CSV");
      }
    };
    reader.readAsText(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // — Batch execution —
  const handleExecute = async () => {
    if (!umbraClient) {
      await initializeClient();
      return;
    }

    const hasValid = batchRows.some((r) => r.status === "pending");
    if (!hasValid) return;

    setIsExecuting(true);
    setIsDone(false);
    let successInRun = 0;
    const pendingAtStart = batchRows.filter((r) => r.status === "pending").length;

    for (let i = 0; i < batchRows.length; i++) {
      if (batchRows[i].status !== "pending") continue;

      // mark as processing
      setBatchRows((prev) =>
        prev.map((r, idx) => (idx === i ? { ...r, status: "processing" } : r)),
      );

      try {
        const payload: ArezPrivateTransferPayload = {
          client: umbraClient as IUmbraClient,
          zkProver: ArezkProver,
          recipient: batchRows[i].recipient,
          mint: SOL_MINT,
          amount: batchRows[i].amount,
          mode: "private",
          chain: "solana",
          network: "devnet",
        };

        const tx = await SendPrivatePayment(payload);
        console.log(`Row ${i} tx:`, JSON.stringify(tx, null, 2));

        const sig = "confirmed";

        successInRun += 1;
        setBatchRows((prev) =>
          prev.map((r, idx) =>
            idx === i ? { ...r, status: "success", sig } : r,
          ),
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed";
        setBatchRows((prev) =>
          prev.map((r, idx) =>
            idx === i ? { ...r, status: "failed", error: message } : r,
          ),
        );
      }
    }

    setIsExecuting(false);
    setIsDone(true);

    if (ENABLE_BATCH_STATUS && shieldAll && successInRun > 0) {
      const batchType =
        batchRows.find((r) => r.memo)?.memo?.replace(/\s+/g, "") ?? "Salaries";
      addBatchHistoryEntry({
        recipientCount: totalRecipients,
        totalAmount: grossAmount,
        status: successInRun === pendingAtStart ? "Confirmed" : "Pending",
        batchType,
      });
      setBatchHistory(loadBatchHistory());
    }
  };

  const handleGenerateQr = async () => {
    if (!publicKey || batchRows.length === 0) return;
    setQrLoading(true);
    setQrError(null);

    try {
      const recipients = batchRows
        .filter((r) => r.status !== "failed" || !r.error?.includes("Invalid"))
        .map((r) => ({
          wallet: r.recipient,
          amount: r.amount,
          memo: r.memo,
        }));

      const batchId = await savePayrollBatch(
        publicKey.toString(),
        recipients,
      );

      const appUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      const url = `${appUrl}/claim?batch=${batchId}`;
      const dataUrl = await QRCode.toDataURL(url, { width: 400, margin: 2 });

      setClaimUrl(url);
      setQrDataUrl(dataUrl);
      setQrOpen(true);
    } catch (err: unknown) {
      setQrError(err instanceof Error ? err.message : "Failed to generate QR");
    } finally {
      setQrLoading(false);
    }
  };

  // — Derived stats —
  const totalRecipients = batchRows.length;
  const grossAmount = batchRows.reduce((sum, r) => sum + (r.amount || 0), 0);
  const successCount = batchRows.filter((r) => r.status === "success").length;
  const failedCount = batchRows.filter((r) => r.status === "failed").length;
  const pendingCount = batchRows.filter((r) => r.status === "pending").length;

  const downloadTemplate = () => {
    const csv =
      "wallet,amount,memo\n7xKpExampleAddress123,100,Engineering Salary\n9mQrExampleAddress456,250,Design Salary";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "arez_payroll_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen w-full bg-background text-on-surface font-body overflow-hidden">
      <SideBar />
      <main className="flex-1 flex flex-col bg-surface overflow-hidden relative">
        <BoardHeader title="Batch Payroll" />
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header & Shield Toggle */}
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-3xl font-black tracking-tighter text-primary">
                  Batch Payroll
                </h3>
                <p className="text-on-surface-variant font-medium text-sm mt-1">
                  Execute high-volume private transfers with zero knowledge
                  proofs.
                </p>
              </div>
              <div className="flex items-center space-x-4 bg-surface-container-low p-2 rounded-xl border border-outline-variant/10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface/50">
                  Shield All Transfers
                </span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    className="peer sr-only"
                    type="checkbox"
                    checked={shieldAll}
                    onChange={(e) => setShieldAll(e.target.checked)}
                  />
                  <div className="relative inline-block h-6 w-11 shrink-0 rounded-full bg-surface-container-highest after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-container peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Left — Upload + Stats */}
              <div className="col-span-12 lg:col-span-5 space-y-6">
                {/* Drop Zone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`aspect-square lg:aspect-auto lg:h-[400px] bg-surface-container-low border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 text-center transition-colors cursor-pointer
                    ${
                      isDragging
                        ? "border-primary-container bg-primary-container/5"
                        : batchRows.length > 0
                          ? "border-green-500/40 bg-green-500/5"
                          : "border-outline-variant/30 hover:border-primary-container/40"
                    }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors
                    ${
                      batchRows.length > 0
                        ? "bg-green-500/10"
                        : "bg-surface-container-high group-hover:bg-primary-container/10"
                    }`}
                  >
                    {batchRows.length > 0 ? (
                      <CheckCircle2 className="h-10 w-10 text-green-400" />
                    ) : (
                      <CloudUpload className="h-10 w-10 text-primary-container" />
                    )}
                  </div>

                  {batchRows.length > 0 ? (
                    <>
                      <h4 className="text-lg font-bold text-green-400">
                        CSV Loaded
                      </h4>
                      <p className="text-sm text-outline mt-2">
                        {totalRecipients} recipients parsed
                      </p>
                      <p className="text-xs text-outline/60 mt-1">
                        Click to replace file
                      </p>
                    </>
                  ) : (
                    <>
                      <h4 className="text-lg font-bold text-on-surface">
                        Upload Payroll CSV
                      </h4>
                      <p className="text-sm text-outline mt-2 max-w-[240px]">
                        Drag and drop or click to browse. Columns: wallet,
                        amount, memo (optional)
                      </p>
                    </>
                  )}

                  {parseError && (
                    <p className="mt-4 text-xs text-red-400 font-medium">
                      {parseError}
                    </p>
                  )}

                  <div
                    className="mt-8 flex flex-col space-y-3 w-full max-w-[200px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={downloadTemplate}
                      className="w-full py-3 bg-surface-container-highest text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-surface-bright transition-colors"
                    >
                      Download Template
                    </button>
                  </div>
                </div>

                {/* Live Batch Summary */}
                <div className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full blur-3xl -mr-16 -mt-16" />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-container mb-6">
                    Batch Analytics Preview
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                      <span className="text-xs text-outline">
                        Total Recipients
                      </span>
                      <span className="text-xl font-bold font-['Inter'] tracking-tight">
                        {totalRecipients || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                      <span className="text-xs text-outline">Gross Amount</span>
                      <span className="text-xl font-bold font-['Inter'] tracking-tight text-on-surface">
                        {totalRecipients > 0
                          ? grossAmount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })
                          : "—"}{" "}
                        {totalRecipients > 0 && (
                          <span className="text-[10px] text-outline font-medium">
                            SOL
                          </span>
                        )}
                      </span>
                    </div>
                    {isDone && (
                      <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                        <span className="text-xs text-outline">Results</span>
                        <span className="text-xs font-bold">
                          <span className="text-green-400">
                            {successCount} success
                          </span>
                          {failedCount > 0 && (
                            <span className="text-red-400 ml-2">
                              {failedCount} failed
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-bold text-on-surface uppercase">
                        Status
                      </span>
                      <span className="text-xs font-bold text-primary-container">
                        {isExecuting
                          ? `Processing ${batchRows.filter((r) => r.status === "success" || r.status === "failed").length} / ${totalRecipients}`
                          : isDone
                            ? "Complete"
                            : totalRecipients > 0
                              ? "Ready"
                              : "Awaiting CSV"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Preview Table */}
              <div className="col-span-12 lg:col-span-7 bg-surface-container rounded-xl overflow-hidden shadow-2xl flex flex-col">
                <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/70">
                    Parsed Entries Preview
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2 h-2 rounded-full ${totalRecipients > 0 ? "bg-green-400" : "bg-outline-variant"}`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface/50">
                      {totalRecipients > 0
                        ? `${pendingCount} Pending`
                        : "No Data"}
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-highest/50">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                          Recipient
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-right">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline text-center">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {batchRows.length === 0 ? (
                        <tr>
                          <td
                            colSpan={3}
                            className="px-6 py-16 text-center text-outline text-sm"
                          >
                            Upload a CSV to preview recipients
                          </td>
                        </tr>
                      ) : (
                        batchRows.map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-surface-container-highest transition-colors"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-outline-variant/20 flex items-center justify-center text-[10px] font-bold">
                                  {row.recipient.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <p className="text-[10px] text-outline font-mono truncate w-40">
                                    {row.recipient}
                                  </p>
                                  {row.memo && (
                                    <p className="text-[9px] text-outline/50">
                                      {row.memo}
                                    </p>
                                  )}
                                  {row.error && (
                                    <p className="text-[9px] text-red-400">
                                      {row.error}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-right font-bold text-xs tracking-tight">
                              {row.amount} SOL
                            </td>
                            <td className="px-6 py-5 text-center">
                              {row.status === "pending" && (
                                <span className="w-2 h-2 rounded-full bg-outline-variant inline-block" />
                              )}
                              {row.status === "processing" && (
                                <Loader2 className="h-4 w-4 inline-block text-primary-container animate-spin" />
                              )}
                              {row.status === "success" && (
                                <CheckCircle2 className="h-4 w-4 inline-block text-green-400" />
                              )}
                              {row.status === "failed" && (
                                <XCircle className="h-4 w-4 inline-block text-red-400" />
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-surface-container-high flex items-center justify-between">
                  <p className="text-[10px] text-outline font-bold uppercase tracking-widest">
                    {totalRecipients > 0
                      ? `${totalRecipients} Recipients Loaded`
                      : "Awaiting upload"}
                  </p>
                  {failedCount > 0 && (
                    <button
                      onClick={() =>
                        setBatchRows((prev) =>
                          prev.map((r) =>
                            r.status === "failed" &&
                            !r.error?.includes("Invalid")
                              ? { ...r, status: "pending", error: undefined }
                              : r,
                          ),
                        )
                      }
                      className="text-[10px] font-bold text-primary-container uppercase tracking-[0.1em] hover:underline"
                    >
                      Retry Failed
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-surface-container-lowest border border-primary-container/10 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h5 className="text-lg font-bold text-on-surface">
                  {totalRecipients > 0
                    ? `${totalRecipients} Recipients · ${grossAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })} SOL Total`
                    : "Upload a CSV to begin"}
                </h5>
                <p className="text-xs text-outline font-medium">
                  {shieldAll
                    ? "All transfers will be shielded via Umbra mixer"
                    : "Transfers will be public on-chain"}
                </p>
              </div>

              <div className="relative z-10 w-full md:w-auto flex flex-col md:flex-row gap-4">
                {ENABLE_BATCH_QR && (
                  <button
                    type="button"
                    disabled={
                      totalRecipients === 0 || isExecuting || qrLoading
                    }
                    onClick={handleGenerateQr}
                    className="px-8 py-5 border border-primary-container/30 text-sm font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-surface-container-high transition-all flex items-center justify-center gap-3 disabled:opacity-40 text-primary-container"
                  >
                    <QrCode className="h-5 w-5" />
                    {qrLoading ? "Generating..." : "Generate Payroll QR"}
                  </button>
                )}
                <button
                  type="button"
                  disabled={totalRecipients === 0 || isExecuting}
                  className="px-8 py-5 border border-outline-variant/30 text-sm font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-surface-container-high transition-all flex items-center justify-center space-x-3 disabled:opacity-40"
                  onClick={() => setBatchRows([])}
                >
                  <Eye className="h-5 w-5" aria-hidden="true" />
                  <span>Clear</span>
                </button>
                <button
                  disabled={
                    totalRecipients === 0 || isExecuting || pendingCount === 0
                  }
                  onClick={handleExecute}
                  className="px-10 flex flex-row items-center align-center py-4 glow-button text-on-primary-container font-black text-sm uppercase tracking-[0.2em] rounded-md hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_0_1px_rgba(0,245,255,0.15)]"
                >
                  {isExecuting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                  <span className="ml-[10px]">
                    {isExecuting
                      ? "Executing..."
                      : isDone
                        ? "Batch Complete"
                        : `Execute ${shieldAll ? "Private" : "Public"} Batch Transfer`}
                  </span>
                </button>
              </div>
              {qrError && (
                <p className="relative z-10 text-xs text-red-400 mt-2 w-full">
                  {qrError}
                </p>
              )}
            </div>

            {ENABLE_BATCH_STATUS && batchHistory.length > 0 && (
              <div className="bg-surface-container rounded-xl border border-outline-variant/10 overflow-hidden">
                <div className="p-6 border-b border-outline-variant/10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/70">
                    Recent Batches
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-surface-container-highest/50 text-[10px] font-bold uppercase tracking-widest text-outline">
                        <th className="px-6 py-4">Batch ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Recipients</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Privacy Level</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/5">
                      {batchHistory.map((batch) => (
                        <tr
                          key={batch.id}
                          className="hover:bg-surface-container-highest/30"
                        >
                          <td className="px-6 py-4 text-xs font-mono text-on-surface">
                            {batch.id}
                          </td>
                          <td className="px-6 py-4 text-xs text-on-surface-variant">
                            {new Date(batch.timestamp).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="px-6 py-4 text-xs font-bold">
                            {batch.recipientCount}
                          </td>
                          <td className="px-6 py-4 text-xs font-bold">
                            {batch.totalAmount.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            SOL
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-tertiary-fixed-dim">
                              Maximum
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`text-[10px] font-black uppercase tracking-widest ${
                                batch.status === "Confirmed"
                                  ? "text-green-400"
                                  : "text-yellow-400"
                              }`}
                            >
                              {batch.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <PayrollQrModal
          open={qrOpen}
          qrDataUrl={qrDataUrl}
          claimUrl={claimUrl}
          recipientCount={totalRecipients}
          totalSol={grossAmount}
          onClose={() => setQrOpen(false)}
        />
      </main>
    </div>
  );
}
