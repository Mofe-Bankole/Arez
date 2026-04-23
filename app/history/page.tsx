"use client";

import Sidebar from "@/components/Sidebar";
import "../globals.css";
import WalletConnectButton from "@/components/ConnectWalletButton";
import { Bell, Shield } from "lucide-react";

export default function HistoryPage() {
  return (
    <>
      <div className="flex h-screen w-full">
        <Sidebar />
        {/* Main Canvas */}
        <main className="flex-1 flex flex-col md:ml-64 h-screen overflow-y-auto bg-surface relative">
          {/* TopNavBar */}
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
          {/* Page Content */}
          <section className="p-8 mx-auto w-full">
            {/* Page Title & Filters */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold tracking-tighter text-on-surface mb-2">
                  History
                </h2>
                <p className="text-on-surface-variant/60 font-medium tracking-wide text-sm">
                  Every transaction is cryptographically shielded. Hover over
                  sensitive data points to reveal details with your active
                  viewing key.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex items-center">
                  <span
                    className="material-symbols-outlined absolute left-3 text-on-surface-variant/50 text-lg"
                    data-icon="search"
                  >
                    search
                  </span>
                  <input
                    className="bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2.5 text-xs text-on-surface w-64 focus:ring-1 focus:ring-primary-container/30 transition-all"
                    placeholder="Search hash, address..."
                    type="text"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface-variant hover:text-on-surface text-xs font-bold uppercase tracking-wider rounded-lg border border-outline-variant/10 transition-all">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="filter_list"
                  >
                    filter_list
                  </span>
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface-variant hover:text-on-surface text-xs font-bold uppercase tracking-wider rounded-lg border border-outline-variant/10 transition-all">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="download"
                  >
                    download
                  </span>
                  Export
                </button>
              </div>
            </div>
            {/* Transaction Grid/Table */}
            <div className="grid grid-cols-1 gap-px bg-outline-variant/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 bg-surface-container-lowest py-4 px-6 text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant/40">
                <div className="col-span-2">Date &amp; Time</div>
                <div className="col-span-2">Transaction Type</div>
                <div className="col-span-3">Recipient/Sender</div>
                <div className="col-span-3">Amount</div>
                <div className="col-span-2 text-right">Status</div>
              </div>
              {/* Row 1 */}
              <div className="grid grid-cols-12 gap-4 bg-surface-container-low hover:bg-surface-container transition-all group cursor-pointer py-6 px-6 items-center">
                <div className="col-span-2 flex flex-col">
                  <span className="text-sm font-bold text-on-surface">
                    Oct 24, 2023
                  </span>
                  <span className="text-[10px] text-on-surface-variant/50 uppercase tracking-tighter">
                    14:22:05 UTC
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-primary-fixed-variant/20 border border-primary-container/10">
                    <span
                      className="material-symbols-outlined text-primary-container text-sm"
                      data-icon="account_balance_wallet"
                    >
                      account_balance_wallet
                    </span>
                    <span className="text-[10px] font-black uppercase text-primary-container tracking-wider">
                      Salary
                    </span>
                  </div>
                </div>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-primary-container/50">
                    <span
                      className="material-symbols-outlined"
                      data-icon="shield"
                    >
                      shield
                    </span>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant truncate">
                    arez_pub_...7xR9w
                  </span>
                </div>
                <div className="col-span-3 group/amount relative">
                  <div className="mask-overlay absolute inset-0 rounded-lg blur-[2px] opacity-100 group-hover/amount:opacity-0 transition-opacity flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-on-surface-variant/30 text-sm"
                      data-icon="visibility_off"
                    >
                      visibility_off
                    </span>
                  </div>
                  <div className="opacity-0 group-hover/amount:opacity-100 transition-opacity">
                    <span className="text-lg font-bold tracking-tight text-on-surface">
                      12,450.00
                    </span>
                    <span className="text-[10px] font-bold text-primary-container ml-1">
                      USDC
                    </span>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary-fixed-dim shield-glow border border-tertiary-fixed-dim/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Shielded
                    </span>
                  </div>
                </div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-12 gap-4 bg-surface py-6 px-6 items-center hover:bg-surface-container transition-all group cursor-pointer border-t border-outline-variant/5">
                <div className="col-span-2 flex flex-col">
                  <span className="text-sm font-bold text-on-surface">
                    Oct 23, 2023
                  </span>
                  <span className="text-[10px] text-on-surface-variant/50 uppercase tracking-tighter">
                    09:15:30 UTC
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 border border-secondary/10">
                    <span
                      className="material-symbols-outlined text-secondary text-sm"
                      data-icon="description"
                    >
                      description
                    </span>
                    <span className="text-[10px] font-black uppercase text-secondary tracking-wider">
                      Invoice
                    </span>
                  </div>
                </div>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-secondary/50">
                    <span
                      className="material-symbols-outlined"
                      data-icon="fingerprint"
                    >
                      fingerprint
                    </span>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant truncate">
                    arez_pub_...4kM2l
                  </span>
                </div>
                <div className="col-span-3 group/amount relative">
                  <div className="mask-overlay absolute inset-0 rounded-lg blur-[2px] opacity-100 group-hover/amount:opacity-0 transition-opacity flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-on-surface-variant/30 text-sm"
                      data-icon="visibility_off"
                    >
                      visibility_off
                    </span>
                  </div>
                  <div className="opacity-0 group-hover/amount:opacity-100 transition-opacity">
                    <span className="text-lg font-bold tracking-tight text-on-surface">
                      3,200.00
                    </span>
                    <span className="text-[10px] font-bold text-primary-container ml-1">
                      USDC
                    </span>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary-fixed-dim shield-glow border border-tertiary-fixed-dim/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Shielded
                    </span>
                  </div>
                </div>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-12 gap-4 bg-surface-container-low py-6 px-6 items-center hover:bg-surface-container transition-all group cursor-pointer border-t border-outline-variant/5">
                <div className="col-span-2 flex flex-col">
                  <span className="text-sm font-bold text-on-surface">
                    Oct 21, 2023
                  </span>
                  <span className="text-[10px] text-on-surface-variant/50 uppercase tracking-tighter">
                    22:00:11 UTC
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-primary-fixed-variant/20 border border-primary-container/10">
                    <span
                      className="material-symbols-outlined text-primary-container text-sm"
                      data-icon="account_balance_wallet"
                    >
                      account_balance_wallet
                    </span>
                    <span className="text-[10px] font-black uppercase text-primary-container tracking-wider">
                      Salary
                    </span>
                  </div>
                </div>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-primary-container/50">
                    <span
                      className="material-symbols-outlined"
                      data-icon="shield"
                    >
                      shield
                    </span>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant truncate">
                    arez_pub_...9zP1q
                  </span>
                </div>
                <div className="col-span-3 group/amount relative">
                  <div className="mask-overlay absolute inset-0 rounded-lg blur-[2px] opacity-100 group-hover/amount:opacity-0 transition-opacity flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-on-surface-variant/30 text-sm"
                      data-icon="visibility_off"
                    >
                      visibility_off
                    </span>
                  </div>
                  <div className="opacity-0 group-hover/amount:opacity-100 transition-opacity">
                    <span className="text-lg font-bold tracking-tight text-on-surface">
                      8,900.00
                    </span>
                    <span className="text-[10px] font-bold text-primary-container ml-1">
                      USDC
                    </span>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container/10 text-tertiary-fixed-dim shield-glow border border-tertiary-fixed-dim/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Shielded
                    </span>
                  </div>
                </div>
              </div>
              {/* Row 4 */}
              <div className="grid grid-cols-12 gap-4 bg-surface py-6 px-6 items-center hover:bg-surface-container transition-all group cursor-pointer border-t border-outline-variant/5">
                <div className="col-span-2 flex flex-col">
                  <span className="text-sm font-bold text-on-surface">
                    Oct 20, 2023
                  </span>
                  <span className="text-[10px] text-on-surface-variant/50 uppercase tracking-tighter">
                    11:04:45 UTC
                  </span>
                </div>
                <div className="col-span-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/20 border border-error/10">
                    <span
                      className="material-symbols-outlined text-error text-sm"
                      data-icon="block"
                    >
                      block
                    </span>
                    <span className="text-[10px] font-black uppercase text-error tracking-wider">
                      Revoked
                    </span>
                  </div>
                </div>
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center text-error/50">
                    <span
                      className="material-symbols-outlined"
                      data-icon="lock_reset"
                    >
                      lock_reset
                    </span>
                  </div>
                  <span className="text-xs font-mono text-on-surface-variant truncate">
                    arez_pub_...0vY3x
                  </span>
                </div>
                <div className="col-span-3 group/amount relative">
                  <div className="mask-overlay absolute inset-0 rounded-lg blur-[2px] opacity-100 group-hover/amount:opacity-0 transition-opacity flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-on-surface-variant/30 text-sm"
                      data-icon="visibility_off"
                    >
                      visibility_off
                    </span>
                  </div>
                  <div className="opacity-0 group-hover/amount:opacity-100 transition-opacity">
                    <span className="text-lg font-bold tracking-tight text-on-surface">
                      1,050.00
                    </span>
                    <span className="text-[10px] font-bold text-primary-container ml-1">
                      USDC
                    </span>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container/20 text-error border border-error/20">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Cancelled
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Bento Widgets for Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {/* Privacy Summary */}
              <div className="col-span-1 md:col-span-2 bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-primary-container/5 pointer-events-none group-hover:text-primary-container/10 transition-colors">
                  <span
                    className="material-symbols-outlined text-[120px] scale-150 rotate-12"
                    data-icon="security"
                  >
                    security
                  </span>
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-container mb-6">
                  Zero-Knowledge Stats
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                  <div>
                    <div className="text-3xl font-black tracking-tighter text-on-surface mb-1">
                      98.2%
                    </div>
                    <div className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-widest">
                      Shielding Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black tracking-tighter text-on-surface mb-1">
                      0.001s
                    </div>
                    <div className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-widest">
                      Proof Generation
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black tracking-tighter text-on-surface mb-1">
                      Active
                    </div>
                    <div className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-widest">
                      Encryption Shell
                    </div>
                  </div>
                </div>
              </div>
              {/* Rapid View Key */}
              <div className="col-span-1 glass-panel p-8 rounded-xl border border-primary-container/20 flex flex-col justify-between">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">
                    Active Viewing Key
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div>
                    <span className="text-xs font-mono text-on-surface/80">
                      K-392...884F
                    </span>
                  </div>
                </div>
                <button className="w-full py-3 bg-surface-container-highest text-on-surface hover:bg-surface-bright transition-colors text-[10px] font-black uppercase tracking-[0.15em] rounded border border-outline-variant/30">
                  Rotate Viewing Key
                </button>
              </div>
            </div>
            {/* Footer Pagination */}
            <div className="mt-8 flex items-center justify-between px-2">
              <span className="text-[10px] font-bold uppercase text-on-surface-variant/40 tracking-widest">
                Showing 4 of 1,284 entries
              </span>
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-on-surface transition-all">
                  <span
                    className="material-symbols-outlined text-lg"
                    data-icon="chevron_left"
                  >
                    chevron_left
                  </span>
                </button>
                <button className="px-4 h-10 flex items-center justify-center rounded bg-primary-container text-on-primary-container font-black text-[10px] uppercase">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-on-surface transition-all">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-on-surface transition-all">
                  3
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:text-on-surface transition-all">
                  <span
                    className="material-symbols-outlined text-lg"
                    data-icon="chevron_right"
                  >
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface-container-lowest border-t border-outline-variant/5 backdrop-blur-lg flex items-center justify-around px-6 z-50">
        <a
          className="flex flex-col items-center text-on-surface-variant/60"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="dashboard">
            dashboard
          </span>
          <span className="text-[8px] font-bold uppercase mt-1">Dash</span>
        </a>
        <a
          className="flex flex-col items-center text-on-surface-variant/60"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="payments">
            payments
          </span>
          <span className="text-[8px] font-bold uppercase mt-1">Send</span>
        </a>
        <a
          className="flex flex-col items-center text-primary-container"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="history">
            history
          </span>
          <span className="text-[8px] font-bold uppercase mt-1">History</span>
        </a>
        <a
          className="flex flex-col items-center text-on-surface-variant/60"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="vpn_key">
            vpn_key
          </span>
          <span className="text-[8px] font-bold uppercase mt-1">Keys</span>
        </a>
        <a
          className="flex flex-col items-center text-on-surface-variant/60"
          href="#"
        >
          <span className="material-symbols-outlined" data-icon="settings">
            settings
          </span>
          <span className="text-[8px] font-bold uppercase mt-1">Settings</span>
        </a>
      </nav>
    </>
  );
}
