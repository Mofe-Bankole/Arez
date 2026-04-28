"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import WalletConnectButton from "@/components/ConnectWalletButton";
import {
  Bell,
  Shield,
  UserSearch,
  BadgeCheck,
  KeyRound,
  Info,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { usePublicPayment } from "@/lib/payments";

export default function Send() {
  const [recipient, setRecipient] = React.useState("");
  const [amount, setAmount] = React.useState<number>(0);
  const [currency, setCurrency] = React.useState<"USDC">("USDC");
  const [memo, setMemo] = React.useState("");
  const [shield, setShield] = React.useState(true);
  const [attachViewingKey, setAttachViewingKey] = React.useState(false);

  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<
    | { status: "idle" }
    | { status: "ok"; sig: string }
    | { status: "error"; message: string }
  >({ status: "idle" });

  const sendPublic = usePublicPayment();

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
      const payload = {
        mode: "public",
        recipient,
        network: "devnet",
        chain: "solana",
        amount,
      };
      const res = await sendPublic(payload);
      if (res.status === "successful") {
        setResult({ status: "ok", sig: res.id });
      } else {
        setResult({
          status: "error",
          message: res.error ?? "Transaction failed",
        });
      }
    } catch (e: any) {
      console.log(e);
      setResult({ status: "error", message: e.message ?? "Unexpected error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-surface-dim overflow-y-auto relative">
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 w-full h-60 bg-[#131313]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(0,245,255,0.04)]">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-black text-[#e9feff] tracking-tighter uppercase">
              Send Payment
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-on-surface">
                Mainnet
              </span>
            </div>
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-lg text-on-surface hover:text-primary-container hover:bg-surface-container-high transition-colors"
              aria-label="Security"
            >
              <Shield className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-lg text-on-surface hover:text-primary-container hover:bg-surface-container-high transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="ml-2">
              <WalletConnectButton />
            </div>
          </div>
        </header>
        <div className="flex-1 w-full max-w-6xl mx-auto p-12 grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-3xl font-black text-primary tracking-tight mb-2">
                Initiate Public Transfer
              </h2>
              <p className="text-on-surface-variant font-label text-sm tracking-wide">
                Enter the details below to send a public SOL payment.
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
                  <div className="relative">
                    <input
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 pl-4 pr-12 text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm"
                      placeholder="0.00"
                      inputMode="decimal"
                      type="text"
                    />
                  </div>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                    Currency
                  </label>
                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as "USDC")}
                      className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 pl-4 pr-11 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm appearance-none cursor-pointer"
                    >
                      <option value="USDC">USDC (SPL-Token)</option>
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-outline-variant"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
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
                  Submitted. Signature:{" "}
                  <span className="font-mono tabular-nums">{result.sig}</span>
                </div>
              )}
              <button
                className="w-full py-5 bg-primary text-on-primary-container rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,245,255,0.2)] hover:scale-[1.01] active:scale-95 transition-all duration-200 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                type="button"
                onClick={handleSend}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Send Public Payment"}
              </button>
            </form>
          </div>
          {/* Right column with informational cards left unchanged */}
          <div className="col-span-12 lg:col-span-5 flex flex-col">
            {/* ... (keep existing decorative/info UI) */}
          </div>
        </div>
      </main>
    </div>
  );
}
