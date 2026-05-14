"use client";

/* ==== Feature Flags ==== */
const ENABLE_AI_SUMMARY = "true";
const ENABLE_BATCH_QR = "true";
const ENABLE_HISTORY_REPORT = "true";
const ENABLE_DUNE = "true";
import WalletConnectButton from "@/components/ui/ConnectWalletButton";
import { config } from "@/lib/config";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  BadgeCheck,
  CheckCircle2,
  GitBranch,
  Key,
  Mail,
  Share2,
  Shield,
  Zap,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 w-full bg-[#131313]/70 backdrop-blur-xl h-16 shadow-[0_0_20px_rgba(0,245,255,0.04)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-primary-container rounded-lg">
            <Shield
              className="h-5 w-5 text-on-primary-container"
              aria-hidden="true"
            />
          </div>
          <span className="text-xl font-black text-primary tracking-tighter">
            Arez
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-[#e5e2e1] hover:text-[#00f5ff] transition-all duration-300"
            href="/home"
          >
            Dashboard
          </a>
          <a
            className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-[#e5e2e1] hover:text-[#00f5ff] transition-all duration-300"
            href="/send"
          >
            Send
          </a>
          <a
            className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-[#e5e2e1] hover:text-[#00f5ff] transition-all duration-300"
            href="/invoices"
          >
            Invoices
          </a>
          <a
            className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-[#e5e2e1] hover:text-[#00f5ff] transition-all duration-300"
            href="payroll"
          >
            Payroll
          </a>
        </div>
        {/*<div className="flex items-center gap-4">
          <WalletConnectButton />
        </div>*/}
      </nav>

      <main className="flex-1 w-full">
        {/* <!-- Hero Section --> */}
        <section className="relative min-h-230.25 flex flex-col items-center justify-center pt-24 pb-16 px-6">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-tertiary-container/5 rounded-full blur-[100px]"></div>
          </div>
          <div className="container mx-auto relative z-10 flex flex-col items-center text-center max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="font-['Inter'] text-[10px] font-bold tracking-wider uppercase text-tertiary-fixed-dim px-2 py-1 bg-tertiary-fixed-dim/10 rounded">
                {config.network}
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary-fixed-dim">
                  Stealth Intelligence Live
                </span>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-[-0.04em] leading-[0.88] text-primary uppercase drop-shadow-[0_0_40px_rgba(0,245,255,0.12)]">
              Send Salaries <br />
              <span className="text-primary-container">Privately</span> <br />
              on Solana
            </h1>
            <p className="mt-8 text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
              Shield your payroll from the public ledger. Obfuscate amounts,
              recipients, and timing while maintaining regulatory compliance
              through zero-knowledge proofs.
            </p>
            <div className="flex flex-wrap gap-4 pt-10 justify-center">
              <button
                onClick={() => router.push("/home")}
                className="px-10 flex flex-row align-center py-4 glow-button text-on-primary-container font-black text-sm uppercase tracking-[0.2em] rounded-md hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_0_1px_rgba(0,245,255,0.15)]"
              >
                Shield &amp; Send
              </button>
              <a
                href=""
                className="px-10 py-4 bg-transparent border border-outline-variant text-primary font-black text-sm uppercase tracking-[0.2em] rounded-md hover:bg-surface-container-high transition-all"
              >
                Watch Demo
              </a>
            </div>
            {/* <!-- Trust Signals --> */}
            <div className="pt-16 w-full">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-6">
                Secured &amp; Powered By
              </p>
              <div className="flex flex-wrap gap-8 sm:gap-12 justify-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                <a
                  className="flex items-center gap-2"
                  href="https://solana.com/"
                >
                  <img
                    src="https://solana.com/src/img/branding/solanaLogoMark.svg"
                    alt="Solana Logo"
                    className="h-6 w-auto"
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  />

                  <span className="font-bold tracking-tighter text-lg uppercase">
                    Solana
                  </span>
                </a>
                <a
                  className="flex items-center gap-2 cursor-pointer"
                  href="https://www.umbraprivacy.com/"
                >
                  <img
                    src="https://mintcdn.com/umbraprivacy/8hktEtsVSIFo5XLc/logo/dark.svg?fit=max&auto=format&n=8hktEtsVSIFo5XLc&q=85&s=c9d5da458a3678e035eaf6e5a17efbe8"
                    alt="Umbra Logo"
                    className="h-6 w-auto"
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  />

                  <span className="font-bold tracking-tighter text-lg uppercase">
                    Umbra
                  </span>
                </a>
                <a
                  className="flex items-center gap-2"
                  href="https://www.arcium.com/"
                >
                  <img
                    src="https://cdn.prod.website-files.com/67086aa28c40f80ff00c0a83/67086aa28c40f80ff00c0ad0_Logomark.svg"
                    alt="Arcium Logo"
                    className="h-6 w-auto"
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  />

                  <span className="font-bold tracking-tighter text-lg uppercase">
                    Arcium
                  </span>
                </a>
                <a
                  className="flex items-center gap-2"
                  href="https://www.helius.dev/"
                >
                  <img
                    src="https://www.helius.dev/_next/image?url=%2FHelius-Brandkit%2FHelius%2FHelius-Icon.svg&w=256&q=75"
                    alt="Helius Logo"
                    className="h-6 w-auto"
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  />

                  <span className="font-bold tracking-tighter text-lg uppercase">
                    Helius
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Value Proposition Section (Bento Grid) --> */}
        <section className="py-32 px-6 bg-surface-container-lowest">
          <div className="container mx-auto">
            <div className="mb-20 space-y-4 text-center">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                Subtractive{" "}
                <span className="text-primary-container">Intelligence</span>
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                Traditional payroll is a public broadcast. Arez turns it into a
                private whisper, revealing only what is necessary for the
                parties involved.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* <!-- Feature 1 --> */}
              <div className="md:col-span-2 bg-surface-container p-10 rounded-xl relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                  <EyeOff
                    className="h-10 w-10 text-primary-container"
                    aria-hidden="true"
                  />
                  <h3 className="text-3xl font-black uppercase tracking-tight">
                    Shielded Transactions
                  </h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
                    Every payroll run is processed through our privacy layer,
                    <span className="text-primary-container font-bold">
                      {" "}
                      disconnecting
                    </span>{" "}
                    the sender&apos;s public identity from the recipient&apos;s
                    wallet. Hide amounts, timing, and internal team hierarchies
                    from curious competitors.
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-all duration-700"></div>
              </div>
              {/* <!-- Feature 2 --> */}
              <div className="bg-surface-container-high p-10 rounded-xl space-y-6 flex flex-col justify-center">
                <Key
                  className="h-10 w-10 text-tertiary-fixed-dim"
                  aria-hidden="true"
                />
                <h3 className="text-3xl font-black uppercase tracking-tight">
                  Viewing Keys
                </h3>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  Granular transparency. Generate one-time or permanent viewing
                  keys to give tax authorities, auditors, or investors selective
                  visibility without exposing your entire treasury.
                </p>
              </div>
              {/* <!-- Feature 3 --> */}
              <div className="bg-surface-container-high p-10 rounded-xl space-y-6 flex flex-col justify-center">
                <Zap
                  className="h-10 w-10 text-primary-container"
                  aria-hidden="true"
                />
                <h3 className="text-3xl font-black uppercase tracking-tight">
                  Solana Speed
                </h3>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  Privacy doesn&apos;t have to be slow. Leveraging the
                  high-throughput architecture of Solana and RPC infra from{" "}
                  <a
                    href="https://helius.dev"
                    className="text-[#E84125] font-bold"
                    target="_blank"
                  >
                    Helius
                  </a>
                  , Arez processes thousands of private payments in seconds with
                  sub-cent fees.
                </p>
              </div>
              {/* <!-- Feature 5 — AI Summary --> */}
              {ENABLE_AI_SUMMARY && (
                <div className="bg-surface-container p-10 rounded-xl space-y-6 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute -top-10 -left-10 w-48 h-48 bg-tertiary-fixed-dim/5 rounded-full blur-3xl group-hover:bg-tertiary-fixed-dim/10 transition-all duration-700" />
                  <div className="relative z-10 space-y-6">
                    <div className="w-10 h-10 rounded-lg bg-tertiary-fixed-dim/10 flex items-center justify-center">
                      <Zap
                        className="h-5 w-5 text-tertiary-fixed-dim"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tight">
                      AI Transaction Summaries
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      Every transaction explained in plain English. Arez calls a
                      Llama‑3 model to generate a one-sentence description of
                      each payment — perfect for records, reports, and audit
                      trails.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="relative z-10 mt-2 w-full py-4 border border-tertiary-fixed-dim/30 text-tertiary-fixed-dim text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-tertiary-fixed-dim/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    Generate Summary
                  </button>
                </div>
              )}

              {/* <!-- Feature 6 — Batch QR --> */}
              {ENABLE_BATCH_QR && (
                <div className="md:col-span-2 bg-surface-container-high p-10 rounded-xl relative overflow-hidden group">
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-all duration-700" />
                  <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                    <div className="flex-1 space-y-6">
                      <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center">
                        <Share2
                          className="h-5 w-5 text-primary-container"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">
                        Batch QR Payroll
                      </h3>
                      <p className="text-on-surface-variant leading-relaxed">
                        Upload a CSV, generate a single QR code. Employees scan
                        it to claim their stealth payment — no wallet address
                        sharing, no coordination overhead. One code. Private for
                        every recipient.
                      </p>
                      <button
                        type="button"
                        className="py-4 px-8 border border-primary-container/30 text-primary-container text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-primary-container/10 transition-all flex items-center gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        Generate Payroll QR
                      </button>
                    </div>
                    {/* QR placeholder visual */}
                    <div className="flex-shrink-0 w-32 h-32 bg-surface-container-lowest rounded-xl border border-outline-variant/20 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-1 p-3 opacity-30">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-full aspect-square rounded-sm ${
                              [0, 2, 6, 8, 4].includes(i)
                                ? "bg-primary-container"
                                : "bg-outline-variant"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <!-- Feature 7 — Weekly Report --> */}
              {ENABLE_HISTORY_REPORT && (
                <div className="bg-surface-container-low p-px rounded-xl bg-gradient-to-br from-primary-container/20 to-transparent">
                  <div className="bg-surface-container-low h-full w-full rounded-xl p-10 space-y-6 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center">
                        <BadgeCheck
                          className="h-5 w-5 text-primary-container"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">
                        Weekly Transaction Report
                      </h3>
                      <p className="text-on-surface-variant leading-relaxed">
                        Get an AI-summarized digest of your week's activity —
                        total volume, recipient count, and anomalies — generated
                        privately and copied to your clipboard.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-2 w-full py-4 bg-primary-container/10 border border-primary-container/20 text-primary-container text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-primary-container/20 transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="h-4 w-4" />
                      Generate Weekly Report
                    </button>
                  </div>
                </div>
              )}

              {/* <!-- Feature 8 — Dune Analytics --> */}
              {ENABLE_DUNE && (
                <div className="md:col-span-2 bg-surface-container p-10 rounded-xl space-y-6 relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-tertiary-fixed-dim/10 flex items-center justify-center">
                      <GitBranch
                        className="h-5 w-5 text-tertiary-fixed-dim"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tight">
                      On‑Chain Analytics
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      Live Dune Analytics dashboard tracking Arez stealth pool
                      volume, unique senders, and transaction frequency — all
                      without de-anonymizing individual users.
                    </p>
                  </div>
                  <div className="w-full rounded-xl overflow-hidden border border-outline-variant/10 bg-surface-container-lowest">
                    <iframe
                      src="https://dune.com/embeds/YOUR_DUNE_EMBED_ID/YOUR_VISUALIZATION_ID"
                      className="w-full h-64"
                      frameBorder="0"
                      title="Arez On-Chain Analytics"
                    />
                  </div>
                </div>
              )}
              {/* <!-- Feature 4 --> */}
              <div className="md:col-span-2 bg-surface-container-low p-1 p-px rounded-xl bg-gradient-to-r from-outline-variant/30 to-transparent">
                <div className="bg-surface-container-low h-full w-full rounded-xl p-10 flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-6">
                    <GitBranch
                      className="h-10 w-10 text-primary-container"
                      aria-hidden="true"
                    />
                    <h3 className="text-3xl font-black uppercase tracking-tight">
                      Batch Efficiency
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      Upload a CSV and distribute private payments to your
                      entire team in one batch flow. Each recipient receives
                      funds in a stealth UTXO unique to them — no on-chain link
                      between sender and receiver.
                    </p>
                  </div>
                  <div className="flex-1 bg-surface-container-lowest rounded-lg p-6 w-full border border-outline-variant/10">
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-widest">
                        <span>Status</span>
                        <span>Privacy Level</span>
                      </div>
                      <div className="h-px bg-outline-variant/20"></div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-tertiary-fixed-dim rounded-full"></div>
                          <span className="text-xs">Batch_0492_Salaries</span>
                        </div>
                        <span className="text-xs text-primary-container">
                          Maximum
                        </span>
                      </div>
                      <div className="flex justify-between items-center opacity-50">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-tertiary-fixed-dim rounded-full"></div>
                          <span className="text-xs">
                            Batch_0491_Contractors
                          </span>
                        </div>
                        <span className="text-xs text-primary-container">
                          Maximum
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Compliance Section --> */}
        {/* <!-- CTA Section --> */}
        <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-primary-container/5 border-y border-outline-variant/10">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100vw,640px)] w-[min(100vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-container/10 blur-[100px] opacity-60"
            aria-hidden
          />
          <div className="container relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary-container">
              Start in seconds
            </p>
            <h2 className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.03em] text-primary sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_0_48px_rgba(0,245,255,0.14)]">
              Ready to go{" "}
              <span className="text-primary-container">incognito?</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-on-surface-variant">
              Join 200+ organizations moving their payroll to the shadows of the
              Solana ecosystem.
            </p>
            <div className="mt-12 flex w-full max-w-lg flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
              <button
                type="button"
                onClick={() => router.push("/home")}
                className="w-full px-10 py-5 bg-surface-container-highest text-primary font-black text-base uppercase tracking-[0.2em] rounded-md border border-outline-variant transition-all hover:bg-surface-container sm:w-auto sm:min-w-[240px]"
              >
                Shield & SEND
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- Footer --> */}
      <footer className="bg-surface-container-lowest py-20 px-8 border-t border-outline-variant/10">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-primary-container rounded-lg">
                <Shield
                  className="h-5 w-5 text-on-primary-container"
                  aria-hidden="true"
                />
              </div>
              <span className="text-2xl font-black text-primary tracking-tighter">
                Arez
              </span>
            </div>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              The privacy-first payroll engine for the decentralized economy.
              Built for security, designed for stealth.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary-container hover:border-primary-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary-container hover:border-primary-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-outline uppercase tracking-widest">
            © 2024 Arez Stealth Labs. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-tertiary-fixed-dim rounded-full"></span>
              <span className="text-[10px] text-outline uppercase tracking-widest">
                Network Secure
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-tertiary-fixed-dim rounded-full"></span>
              <span className="text-[10px] text-outline uppercase tracking-widest">
                Vault Encrypted
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
