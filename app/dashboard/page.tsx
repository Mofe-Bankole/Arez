"use client";

import "../globals.css";
import SideBar from "@/components/Sidebar";
import WalletConnectButton from "@/components/ConnectWalletButton";
import { useBalances } from "@/hooks/useBalances";
import useArezWallet from "@/hooks/useWallet";
import {
  Bell,
  Eye,
  Lock,
  Shield,
  ShieldCheck,
  TrendingUp,
  Coins,
  RefreshCw,
} from "lucide-react";

export default function Dashboard() {
  const { connected, publicKey } = useArezWallet();
  const balances = useBalances();

  const addressLabel = connected && publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : "Not connected";

  const formatCompact = (n: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);

  const usdc =
    balances.status === "ready" ? balances.usdc : null;
  const sol =
    balances.status === "ready" ? balances.sol : null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SideBar />
      <main className="flex-1 flex flex-col min-h-screen bg-background">
        {/* TopNavBar Component */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 w-full h-16 bg-[#131313]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(0,245,255,0.04)]">
          <div className="flex items-center gap-4">
            <Shield className="h-5 w-5 text-outline" aria-hidden="true" />
            <div className="flex items-center space-x-2 bg-surface-container-high px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
              <span className="font-['Inter'] text-xs font-bold tragecking-[0.05em] text-[#e5e2e1]">
                {process.env.NODE_ENV}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center gap-2">
              <div className="bg-surface-container-highest px-3 py-1.5 rounded-lg border border-outline-variant/20">
                {/* <span className="font-mono tabular-nums text-xs font-bold tracking-[0.05em] uppercase text-primary">
                  {addressLabel}
                </span> */}
              </div>
              <WalletConnectButton />
              <p>sssw</p>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-outline hover:text-primary-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden ring-1 ring-outline-variant/30">
                <img
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  data-alt="Close-up portrait of a professional male executive in a dark tech setting with soft rim lighting and minimalist background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ7gXRv3_DLp3b6em7_jlW9FF2KEeob18cSSygNLJni9M-onvx7uZsVaJuVkF1EmJ5XgO3MZcU0jUJddlNdAa50fECJhkgwdSwDcBKaLHPXNKko1KjAobIakEwixpu1-8VQ9ns7fVCYAtSc8fffpg72FPLpyl8EwU2lejMgOZ6xvlgmit9wJpZ0PTERZEiNjPXE7fn105DzSGT-bk-YYUxvthrlkq8CWHOn-OgJ3tePYzDvVPtweR5MQEIlBciY9e7IOKGaTEKpuI"
                />
              </div>
            </div>
          </div>
        </header>
        {/* Dashboard Content */}
        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Welcome Header */}
          <section className="flex justify-between items-end">
            <div>
              <h2 className="text-headline-sm font-black tracking-tight text-primary">
                Command Center
              </h2>
              <p className="text-on-surface-variant/70 text-sm mt-1">
                {balances.status === "loading"
                  ? "Syncing balances…"
                  : balances.status === "error"
                    ? `Failed To Fetch Balances`
                    : connected
                      ? "Status: Active & Encrypted"
                      : "Connect your wallet to view live balances."}
              </p>
            </div>
            <div className="hidden md:flex space-x-3">
              <button className="bg-surface-container-high px-4 py-2 text-xs font-bold uppercase tracking-widest text-on-surface hover:bg-surface-container-highest transition-colors rounded-lg">
                Export Report
              </button>
              <button className="stealth-glow text-on-primary-container px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg">
                New Batch
              </button>
            </div>
          </section>
          {/* KPI Grid (Bento Style) */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Primary: Shielded USDC (Wallet) */}
            <div className="md:col-span-2 bg-surface-container-low p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Coins className="h-20 w-20" aria-hidden="true" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <label className="text-[10px] text-outline font-bold uppercase tracking-widest">
                  USDC Balance (Devnet)
                </label>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-outline">
                  <RefreshCw
                    className={[
                      "h-3.5 w-3.5",
                      balances.status === "loading" ? "animate-spin text-primary-container" : "",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  <span>
                    {balances.status === "ready"
                      ? `Updated ${new Date(balances.updatedAt).toLocaleTimeString()}`
                      : balances.status === "loading"
                        ? "Updating"
                        : balances.status === "error"
                          ? "Degraded"
                          : "Idle"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <div className="text-5xl font-black tracking-tighter text-primary-container font-mono tabular-nums">
                  {usdc === null ? "--" : formatMoney(usdc)}
                </div>
                <div className="text-sm font-bold text-primary-fixed-dim uppercase tracking-widest">
                  USDC
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                <div className="inline-flex items-center gap-2 text-tertiary-fixed-dim font-bold">
                  <TrendingUp className="h-4 w-4" aria-hidden="true" />
                  <span>Privacy rail ready</span>
                </div>
                <div className="text-outline">
                  <span className="font-bold">Note:</span>{" "}
                  <span className="text-on-surface-variant">
                    This is wallet USDC (devnet). “Shielded” totals can be wired to Umbra indexer next.
                  </span>
                </div>
              </div>
            </div>

            {/* SOL Balance */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <label className="text-[10px] text-outline font-bold uppercase tracking-widest">
                SOL Balance
              </label>
              <div className="mt-4 flex items-baseline gap-2">
                <div className="text-2xl font-black tracking-tight text-[#e5e2e1] font-mono tabular-nums">
                  {sol === null ? "--" : formatCompact(sol)}
                </div>
                <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
                  SOL
                </span>
              </div>
              <p className="text-on-surface-variant text-[10px] mt-2">
                Used for network fees.
              </p>
            </div>
            {/* Active Recipients */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <label className="text-[10px] text-outline font-bold uppercase tracking-widest">
                Active Recipients
              </label>
              <div className="mt-4">
                <h3 className="text-2xl font-black tracking-tight text-[#e5e2e1] font-mono tabular-nums">
                  142
                </h3>
                <p className="text-on-surface-variant text-[10px] mt-1">
                  across 12 departments
                </p>
              </div>
            </div>
            {/* Private Tx Count */}
            <div className="bg-surface-container-low p-6 rounded-xl col-span-1 border border-outline-variant/10">
              <label className="text-[10px] text-outline font-bold uppercase tracking-widest">
                Private Tx Count
              </label>
              <div className="mt-4">
                <h3 className="text-2xl font-black tracking-tight text-[#e5e2e1] font-mono tabular-nums">
                  3,892
                </h3>
                <p className="text-on-surface-variant text-[10px] mt-1">
                  all-time encrypted
                </p>
              </div>
            </div>
            {/* Stealth Visualization Block (Editorial Asymmetry) */}
            <div className="md:col-span-3 bg-surface-container-low p-6 rounded-xl min-h-[300px] flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary">
                  Encrypted Volume Analytics
                </h4>
                <div className="flex space-x-2">
                  <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                  <span className="w-3 h-3 rounded-full bg-surface-container-highest"></span>
                </div>
              </div>
              <div className="flex-1 flex items-end justify-between space-x-2 pb-2">
                {/* Custom bar chart to avoid external libs */}
                <div className="w-full bg-surface-container-high rounded-t-sm h-[40%] transition-all hover:h-[45%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[60%] transition-all hover:h-[65%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[35%] transition-all hover:h-[40%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[80%] transition-all hover:h-[85%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[55%] transition-all hover:h-[60%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-primary-container/60 rounded-t-sm h-[95%]"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[45%] transition-all hover:h-[50%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[30%] transition-all hover:h-[35%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[65%] transition-all hover:h-[70%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[50%] transition-all hover:h-[55%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[40%] transition-all hover:h-[45%] hover:bg-primary-container/40"></div>
                <div className="w-full bg-surface-container-high rounded-t-sm h-[20%] transition-all hover:h-[25%] hover:bg-primary-container/40"></div>
              </div>
            </div>
          </section>
          {/* Recent Activity Feed */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface">
                Recent Activity
              </h4>
              <a
                className="text-[10px] font-bold text-primary-container hover:underline tracking-widest uppercase"
                href="#"
              >
                View All History
              </a>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/10">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                      Date &amp; Time
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                      Recipient (Masked)
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-outline">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {/* Row 1 */}
                  <tr className="hover:bg-surface-container-high transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-[#e5e2e1]">
                      Oct 24, 14:22
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-outline" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-sm text-outline tracking-wider">
                          • • • • 9f42
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#e5e2e1]">
                      4,500.00 USDC
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-tertiary-fixed-dim/10 text-tertiary-fixed-dim border border-tertiary-fixed-dim/20">
                        Shielded
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-outline hover:text-primary-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-surface-container-high transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-[#e5e2e1]">
                      Oct 24, 09:15
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-outline" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-sm text-outline tracking-wider">
                          • • • • a12c
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#e5e2e1]">
                      12,200.00 USDC
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-tertiary-fixed-dim/10 text-tertiary-fixed-dim border border-tertiary-fixed-dim/20">
                        Shielded
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-outline hover:text-primary-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-surface-container-high transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-[#e5e2e1]">
                      Oct 23, 18:45
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-outline" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-sm text-outline tracking-wider">
                          • • • • d771
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#e5e2e1]">
                      3,800.00 USDC
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-tertiary-fixed-dim/10 text-tertiary-fixed-dim border border-tertiary-fixed-dim/20">
                        Shielded
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-outline hover:text-primary-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {/* Privacy Pulse Indicator */}
        <div className="fixed bottom-8 right-8 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full border border-primary-container/20 animate-ping"></div>
            <div className="relative w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-primary-container/40">
              <ShieldCheck className="h-5 w-5 text-primary-container" aria-hidden="true" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}