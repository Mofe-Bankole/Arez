"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { scanAndClaimUtxos } from "@/lib/umbra/claim";
import { useWallet } from "@solana/wallet-adapter-react";
import SideBar from "@/components/ui/Sidebar";
import BoardHeader from "@/components/ui/BoardHeader";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { useUmbra } from "@/context/UmbraContext";
import { ENABLE_BATCH_QR } from "@/lib/features";
import {
  fetchPayrollBatch,
  type PayrollBatchRow,
  type PayrollRecipient,
} from "@/lib/supabase";

function ClaimPageContent() {
  const searchParams = useSearchParams();
  const batchId = searchParams.get("batch");
  const { publicKey } = useWallet();
  const { umbraClient, initializeClient, ready, loading } = useUmbra();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{
    claimed: number;
    results: unknown[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [payrollBatch, setPayrollBatch] = useState<PayrollBatchRow | null>(
    null,
  );
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey && !ready && !loading) initializeClient();
  }, [publicKey, ready, loading, initializeClient]);

  useEffect(() => {
    if (!ENABLE_BATCH_QR || !batchId) return;

    const loadBatch = async () => {
      setBatchLoading(true);
      setBatchError(null);
      try {
        const batch = await fetchPayrollBatch(batchId);
        if (!batch) {
          setBatchError("Payroll batch not found");
          return;
        }
        setPayrollBatch(batch);
      } catch (err: unknown) {
        setBatchError(
          err instanceof Error ? err.message : "Failed to load batch",
        );
      } finally {
        setBatchLoading(false);
      }
    };

    void loadBatch();
  }, [batchId]);

  const myPayment: PayrollRecipient | null = useMemo(() => {
    if (!payrollBatch || !publicKey) return null;
    const wallet = publicKey.toString();
    return (
      payrollBatch.recipients.find((r) => r.wallet === wallet) ?? null
    );
  }, [payrollBatch, publicKey]);

  const handleScanAndClaim = async () => {
    if (!umbraClient) return;
    setScanning(true);
    setError(null);
    setResult(null);

    try {
      const res = await scanAndClaimUtxos(umbraClient);
      setResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Claim failed");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <main className="flex-1 flex flex-col bg-surface-dim overflow-y-auto">
        <BoardHeader title="Claim Payments" />
        <div className="max-w-2xl mx-auto p-12 space-y-8 w-full">
          <div>
            <h2 className="text-3xl font-black text-primary tracking-tight mb-2">
              Claim Private Payments
            </h2>
            <p className="text-on-surface-variant text-sm">
              Scan the Umbra mixer for payments addressed to your wallet and
              claim them into your encrypted balance.
            </p>
          </div>

          {batchId && ENABLE_BATCH_QR && (
            <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary-container">
                Payroll Batch Claim
              </h3>
              {batchLoading && (
                <p className="text-sm text-on-surface-variant animate-pulse">
                  Loading batch details...
                </p>
              )}
              {batchError && (
                <p className="text-sm text-red-400">{batchError}</p>
              )}
              {payrollBatch && !batchLoading && (
                <>
                  <p className="text-xs text-on-surface-variant">
                    Batch from employer · {payrollBatch.recipients.length}{" "}
                    recipients · status {payrollBatch.status}
                  </p>
                  {!publicKey && (
                    <p className="text-sm text-on-surface-variant">
                      Connect your wallet to see your payment in this batch.
                    </p>
                  )}
                  {publicKey && myPayment && (
                    <div className="rounded-xl bg-surface-container p-4 border border-primary-container/20 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        Your payment
                      </p>
                      <p className="text-2xl font-bold text-on-surface">
                        {myPayment.amount} SOL
                      </p>
                      {myPayment.memo && (
                        <p className="text-xs text-on-surface-variant">
                          Memo: {myPayment.memo}
                        </p>
                      )}
                      <p className="text-[10px] font-mono text-outline">
                        To: {publicKey.toString().slice(0, 8)}...
                        {publicKey.toString().slice(-4)}
                      </p>
                    </div>
                  )}
                  {publicKey && !myPayment && (
                    <p className="text-sm text-outline">
                      No payment in this batch is assigned to your connected
                      wallet.
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/10 space-y-2">
            <div className="flex items-center gap-3">
              <ShieldCheck
                className={`h-5 w-5 ${ready ? "text-green-400" : "text-outline-variant"}`}
              />
              <span className="text-sm font-bold">
                {loading
                  ? "Initializing Umbra..."
                  : ready
                    ? "Umbra Ready"
                    : "Umbra not initialized"}
              </span>
            </div>
            {result && (
              <div className="flex items-center gap-3 pt-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <span className="text-sm text-green-400 font-bold">
                  {result.claimed} UTXO{result.claimed !== 1 ? "s" : ""} claimed
                  successfully
                </span>
              </div>
            )}
            {result?.claimed === 0 && !error && (
              <p className="text-sm text-outline pt-2">
                No claimable UTXOs found for this wallet.
              </p>
            )}
            {error && <p className="text-sm text-red-400 pt-2">{error}</p>}
          </div>

          <button
            type="button"
            onClick={handleScanAndClaim}
            disabled={!ready || scanning}
            className="w-full py-5 bg-primary text-on-primary-container rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,245,255,0.2)] hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {scanning ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Scanning Mixer...
              </>
            ) : (
              "Scan & Claim Payments"
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default function ClaimPage() {
  return (
    <Suspense
      fallback={<ClaimLoadingFallback />}
    >
      <ClaimPageContent />
    </Suspense>
  );
}

function ClaimLoadingFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-surface-dim text-on-surface-variant text-sm">
      Loading...
    </div>
  );
}
