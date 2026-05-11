"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { UserSearch, BadgeCheck, KeyRound, ChevronDown } from "lucide-react";
import {
  ArezPrivateTransferPayload,
  SendPrivatePayment,
  usePublicPayment,
} from "@/lib/payments";
import BoardHeader from "@/components/BoardHeader";
import TransactionModal from "@/components/TransactionModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { ArezkProver } from "@/lib/provers";
import { useUmbraClient } from "@/hooks/useUmbraClient";
import { IUmbraClient } from "@umbra-privacy/sdk/interfaces";

const SOL_MINT = "So11111111111111111111111111111111111111112";
// devnet USDC/USDT mints for dUSDC and dUSDT

export default function SendPage() {
  const { publicKey } = useWallet();
  const { umbraClient, initializeClient, ready, loading } = useUmbraClient();
  const [recipient, setRecipient] = React.useState("");
  const [amount, setAmount] = React.useState<number>(0);
  const [currency, setCurrency] = React.useState<"USDC" | "SOL">("SOL");
  const [memo, setMemo] = React.useState("");
  const [shield, setShield] = React.useState(true);
  const [attachViewingKey, setAttachViewingKey] = React.useState(false);
  const [successModal, setSuccessModal] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [txSig, setTxSig] = React.useState<string>("");
  const [txExplorerUrl, setTxExplorerUrl] = React.useState<string>("");

  const [result, setResult] = React.useState<
    | { status: "idle" }
    | { status: "ok"; sig: string; explorerUrl: string }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const sendPublic = usePublicPayment();

  // 🔑 KEY FIX — initialize client on mount when wallet connects
  useEffect(() => {
    if (publicKey && !ready && !loading) {
      initializeClient();
    }
  }, [publicKey, ready, loading]);

  const handleSend = async () => {
    if (!recipient) {
      setResult({ status: "error", message: "Recipient address is required" });
      return;
    }
    if (amount <= 0) {
      setResult({
        status: "error",
        message: "Amount must be greater than zero",
      });
      return;
    }

    setSubmitting(true);
    setResult({ status: "idle" });

    try {
      if (shield) {
        // 🔒 PRIVATE PATH — Umbra mixer
        if (!umbraClient) {
          setResult({
            status: "error",
            message: "Umbra client not ready — try reconnecting your wallet",
          });
          return;
        }

        const payload: ArezPrivateTransferPayload = {
          client: umbraClient as IUmbraClient,
          zkProver: ArezkProver,
          recipient,
          mint: SOL_MINT,
          amount,
          mode: "private",
          chain: "solana",
          network: "devnet",
        };

        const tx = await SendPrivatePayment(payload);

        if (!tx) {
          // console.log("Transaction was not successful");
          return;
        }

        setTxSig(tx.createUtxoSignature.toString());
        setSuccessModal(true);
      } else {
        const res = await sendPublic({
          mode: "public",
          recipient,
          network: "devnet",
          chain: "solana",
          amount,
        });

        if (res.status === "successful") {
          setTxSig(res.id);
          setTxExplorerUrl(res.explorer);
          setResult({ status: "ok", sig: res.id, explorerUrl: res.explorer });
          setSuccessModal(true);
        } else {
          setResult({
            status: "error",
            message: res.error ?? "Transaction failed",
          });
        }
      }
    } catch (e: any) {
      console.error(e);
      setResult({ status: "error", message: e.message ?? "Unexpected error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-surface-dim overflow-y-auto relative">
        {successModal && (
          <TransactionModal
            amount={amount}
            recipient={recipient}
            time={Math.floor(Date.now() / 1000)}
            type={shield ? "private" : "public"}
            chain="Solana"
            network="devnet"
            explorerURL={txExplorerUrl || null}
            token={currency}
          />
        )}
        <BoardHeader title="Send Payments" />

        {/* Umbra client status indicator */}
        {shield && (
          <div className="px-12 pt-4">
            {loading && (
              <div className="text-xs text-on-surface-variant animate-pulse">
                ⏳ Initializing Umbra client...
              </div>
            )}

            {!ready && !loading && publicKey && (
              <div
                className="text-xs text-yellow-400 cursor-pointer"
                onClick={initializeClient}
              >
                ⚠️ Umbra not initialized — click to retry
              </div>
            )}
          </div>
        )}

        <div className="flex-1 w-full max-w-6xl mx-auto p-12 grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-3xl font-black text-primary tracking-tight mb-2">
                Initiate {shield ? "Shielded" : "Public"} Transfer
              </h2>
              <p className="text-on-surface-variant font-label text-sm tracking-wide">
                Enter the details below to send a{" "}
                {shield ? "private" : "public"} SOL payment.
              </p>
            </div>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <div className="group">
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                  Recipient Identity
                </label>
                <div className="relative">
                  <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 pl-4 pr-12 text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm"
                    placeholder="Solana Address"
                    type="text"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <UserSearch
                      className="h-5 w-5 text-outline-variant"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                    Amount
                  </label>
                  <input
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 pl-4 pr-12 text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm"
                    placeholder="0.00"
                    inputMode="decimal"
                    type="number"
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                    Currency
                  </label>
                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as "SOL")}
                      className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 pl-4 pr-11 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm appearance-none cursor-pointer"
                    >
                      <option value="SOL">SOL (SPL-Token)</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-outline-variant"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {shield && (
                <div className="group">
                  <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                    Public Memo (Optional)
                  </label>
                  <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="w-full min-h-[120px] bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 px-4 text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm resize-none"
                    placeholder="Add a note to this transaction..."
                  />
                </div>
              )}

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
                      <BadgeCheck
                        className="h-5 w-5 text-primary-container"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">
                        Shield this payment
                      </div>
                      <div className="text-[10px] text-on-surface-variant uppercase tracking-tight">
                        Zero‑Knowledge Proof Enabled
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      checked={shield}
                      onChange={(e) => setShield(e.target.checked)}
                    />
                    <div className="relative inline-block h-6 w-11 shrink-0 rounded-full bg-surface-container-highest after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-primary-container/40 peer-checked:bg-primary-container peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-on-surface-variant/10 flex items-center justify-center">
                      <KeyRound
                        className="h-5 w-5 text-on-surface-variant"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">
                        Attach Viewing Key
                      </div>
                      <div className="text-[10px] text-on-surface-variant uppercase tracking-tight">
                        Allow recipient audit access
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      checked={attachViewingKey}
                      onChange={(e) => setAttachViewingKey(e.target.checked)}
                    />
                    <div className="relative inline-block h-6 w-11 shrink-0 rounded-full bg-surface-container-highest after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-primary-container/40 peer-checked:bg-primary-container peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              </div>

              {result.status === "error" && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-200">
                  {result.message}
                </div>
              )}
              {result.status === "ok" && (
                <div className="rounded-xl border border-tertiary-fixed-dim/20 bg-tertiary-fixed-dim/5 px-4 py-3 text-sm text-tertiary">
                  Transaction Successful —{" "}
                  <a
                    href={result.explorerUrl}
                    target="_blank"
                    className="underline"
                  >
                    View on Explorer ↗
                  </a>
                </div>
              )}

              <button
                className="w-full py-5 bg-primary text-on-primary-container rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,245,255,0.2)] hover:scale-[1.01] active:scale-95 transition-all duration-200 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                type="button"
                onClick={handleSend}
                disabled={submitting || (shield && !ready)}
              >
                {submitting
                  ? "Sending…"
                  : shield && !ready
                    ? "Initializing Umbra..."
                    : `Send ${shield ? "Private" : "Public"} Payment`}
              </button>
            </form>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col">
            {/* decorative/info UI */}
          </div>
        </div>
      </main>
    </div>
  );
}
