"use client";

import "../globals.css";
import SideBar from "@/components/Sidebar";
import WalletConnectButton from "@/components/ConnectWalletButton";
import { useBalances } from "@/hooks/useBalances";
// import useArezWallet from "@/hooks/useWallet";
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
import { useWallet } from "@solana/wallet-adapter-react";
import BoardHeader from "@/components/BoardHeader";

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
  const balances = useBalances();

  const addressLabel =
    connected && publicKey
      ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
      : "Not connected";

  const formatCompact = (n: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(n);

  const usdc = balances.status === "ready" ? balances.usdc : null;
  const sol = balances.status === "ready" ? balances.sol : null;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <SideBar />
      <main className="flex-1 flex flex-col min-h-screen bg-background">
        {/* TopNavBar Component */}
        <BoardHeader title="Dashboard" />
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
                      balances.status === "loading"
                        ? "animate-spin text-primary-container"
                        : "",
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
                    This is wallet USDC (devnet). “Shielded” totals can be wired
                    to Umbra indexer next.
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
                  --
                </h3>
                <p className="text-on-surface-variant text-[10px] mt-1">
                  Data not available
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
                  --
                </h3>
                <p className="text-on-surface-variant text-[10px] mt-1">
                  Data not available
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
        </div>
        {/* Privacy Pulse Indicator */}
        <div className="fixed bottom-8 right-8 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 rounded-full border border-primary-container/20 animate-ping"></div>
            <div className="relative w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center border border-primary-container/40">
              <ShieldCheck
                className="h-5 w-5 text-primary-container"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
