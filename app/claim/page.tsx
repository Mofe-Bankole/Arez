// app/claim/page.tsx
"use client";
import React, { useEffect } from "react";
import { useUmbraClient } from "@/hooks/useUmbraClient";
import { scanAndClaimUtxos } from "@/lib/claim";
import { useWallet } from "@solana/wallet-adapter-react";
import SideBar from "@/components/Sidebar";
import BoardHeader from "@/components/BoardHeader";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ClaimPage() {
  const { publicKey } = useWallet();
  const { umbraClient, initializeClient, ready, loading } = useUmbraClient();
  const [scanning, setScanning] = React.useState(false);
  const [result, setResult] = React.useState<{
    claimed: number;
    results: any[];
  } | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (publicKey && !ready && !loading) initializeClient();
  }, [publicKey, ready, loading]);

  const handleScanAndClaim = async () => {
    if (!umbraClient) return;
    setScanning(true);
    setError(null);
    setResult(null);

    try {
      const res = await scanAndClaimUtxos(umbraClient);
      setResult(res);
    } catch (err: any) {
      setError(err.message ?? "Claim failed");
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

          {/* Status */}
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
