"use client"
import WalletConnectButton from "@/components/ConnectWalletButton";
import Sidebar from "@/components/Sidebar";
// import { WalletConnectButton } from "@solana/wallet-adapter-react-ui";
import { BadgeCheck, Bell, ChevronDown, HelpCircle, Info, KeyRound, Lock, Shield, UserSearch } from "lucide-react";
import * as React from "react";

export default function Send() {
  // Only state: include all state vars for the send form and related UI
  const [recipient, setRecipient] = React.useState("");
  const [amount, setAmount] = React.useState("");
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
              className="flex items-center justify-center h-10 w-10 rounded-lg text-on-surface hover:text-primary-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Security"
            >
              <Shield className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-lg text-on-surface hover:text-primary-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                Initiate Private Transfer
              </h2>
              <p className="text-on-surface-variant font-label text-sm tracking-wide">
                Enter the details below to generate a zero-knowledge payment
                proof.
              </p>
            </div>
            <form className="space-y-6">
              <div className="group">
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                  Recipient Identity
                </label>
                <div className="relative">
                  <input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 pl-4 pr-12 text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm"
                    placeholder="Solana Address or ENS Name"
                    type="text"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <UserSearch className="h-5 w-5 text-outline-variant" aria-hidden="true" />
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
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 pl-4 pr-12 text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm"
                      placeholder="0.00"
                      inputMode="decimal"
                      type="text"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                     
                    </div>
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
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-outline-variant" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                  Private Memo (Encrypted)
                </label>
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full min-h-[120px] bg-surface-container-highest border border-outline-variant/25 rounded-xl py-4 px-4 text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:ring-2 focus:ring-primary-container/35 focus:border-primary-container/40 transition-all font-body text-sm resize-none"
                  placeholder="Add a secure note to this transaction..."
                ></textarea>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
                      <BadgeCheck className="h-5 w-5 text-primary-container" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">
                        Shield this payment
                      </div>
                      <div className="text-[10px] text-on-surface-variant uppercase tracking-tight">
                        Zero-Knowledge Proof Enabled
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
                      <KeyRound className="h-5 w-5 text-on-surface-variant" aria-hidden="true" />
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
                className="w-full py-5 stealth-glow text-on-primary-container rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,245,255,0.2)] hover:scale-[1.01] active:scale-95 transition-all duration-200 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                type="button"
               
              >
                {submitting ? "Shielding…" : "Shield & Send"}
              </button>
            </form>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col">
            <div className="sticky top-28 space-y-6">
              <div className="bg-surface-container-high rounded-2xl p-8 relative overflow-hidden border border-outline-variant/10">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img
                    alt="Abstract Crypto Grid"
                    className="w-full h-full object-cover"
                    data-alt="abstract digital grid of glowing cyan lines and connections on a dark black background representing blockchain technology"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYag5oXZSEMN2uQHPi4I7daXxr97AA1GlYGGOi598ww8O7vbTfqciLO23xO6-LP8vvq70UAsLWpQXZ7GhR7z3uXRwTjNsRVkwnU4B5ikDqxeB3X3SqTOo7XngXuMq2eVUcfPsTZ73aCBZnMqkbOR0lnmJGDctAgWNKDV9H_HDS4nljdqxQelKGEVccR9bPaKxqZqhoRGC20XHVbk6hNMK7Nm7FLjfG4czHB6NK9s6G5zHSfbC9H61zVGs0WYLpBjU1ryPa1c17xtQ"
                  />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tertiary-container/20 flex items-center justify-center">
                      <Lock className="h-4 w-4 text-tertiary-fixed-dim" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-black text-tertiary-fixed-dim uppercase tracking-[0.2em]">
                      Transaction Security
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="text-4xl font-black text-primary tracking-tight">
                      Fully Confidential
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      This transaction will be obfuscated on-chain. Only the
                      sender and receiver will be able to decrypt the
                      transaction data using their private viewing keys.
                    </p>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-outline-variant/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        Protocol Fee
                      </span>
                      <span className="text-sm font-body text-on-surface">
                        0.001 SOL
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        Relay Latency
                      </span>
                      <span className="text-sm font-body text-on-surface">
                        ~2.4 seconds
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        Privacy Set
                      </span>
                      <span className="text-sm font-body text-tertiary-fixed-dim">
                        12,402 Participants
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-primary-container/5 rounded-xl border border-primary-container/20 flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary-container mt-0.5" aria-hidden="true" />
                    <span className="text-[11px] text-on-surface-variant leading-tight">
                      By proceeding, you are minting a non-custodial
                      zero-knowledge certificate for this asset transfer.
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-surface-container-highest rounded-lg">
                    <HelpCircle className="h-5 w-5 text-outline" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-on-surface">
                      Need help?
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      Read our guide on Private Transfers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[150px] -z-10"></div>
        <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-tertiary-fixed-dim/5 rounded-full blur-[100px] -z-10"></div>
      </main>
    </div>
  );
}
