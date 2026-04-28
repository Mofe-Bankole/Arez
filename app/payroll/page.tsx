"use client";

import React from "react";
import SideBar from "@/components/Sidebar";
import WalletConnectButton from "@/components/ConnectWalletButton";
import {
  Bell,
  CheckCircle2,
  CloudUpload,
  Eye,
  Lock,
  Shield,
  ShieldCheck,
} from "lucide-react";

const payrollRows = [
  {
    initials: "JD",
    name: "Jane Doe",
    address: "0x71C...aB21",
    department: "Engineering",
    amount: "4,500.00 USDC",
    statusIcon: "check_circle",
  },
  {
    initials: "MR",
    name: "Marcus Reed",
    address: "0x32D...fE09",
    department: "Design",
    amount: "3,800.00 USDC",
    statusIcon: "check_circle",
  },
  {
    initials: "SL",
    name: "Sarah Linn",
    address: "0x99F...12B4",
    department: "Growth",
    amount: "5,200.00 USDC",
    statusIcon: "check_circle",
  },
  {
    initials: "KT",
    name: "Kevin T.",
    address: "0xA34...C980",
    department: "Ops",
    amount: "4,100.00 USDC",
    statusIcon: "check_circle",
  },
  {
    initials: "AW",
    name: "Anita W.",
    address: "0x5C2...F091",
    department: "Engineering",
    amount: "6,000.00 USDC",
    statusIcon: "check_circle",
  },
];

export default function PayrollPage() {
  return (
    <div className="flex h-screen w-full bg-background text-on-surface font-body overflow-hidden">
      <SideBar />
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col bg-surface overflow-hidden relative">
        {/* TopNavBar */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 w-full h-16 bg-[#131313]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(0,245,255,0.04)] border-b-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-black text-primary tracking-tighter">
              Arez
            </h2>
            <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-bold text-primary-container tracking-widest uppercase">
              Batch Portal
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-on-surface/60">
              <Shield className="h-4 w-4" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Mainnet Encryption Active
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-on-surface/60 hover:text-primary-container hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="h-4 w-px bg-outline-variant/30"></div>
              <button className="px-4 py-1.5 border border-outline-variant text-[10px] font-bold tracking-widest uppercase rounded hover:bg-surface-container transition-colors">
                Mainnet
              </button>
              <WalletConnectButton />
            </div>
          </div>
        </header>
        {/* Page Content */}
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
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-container/20 border border-primary-container/40">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-primary-container transition"></span>
                </div>
              </div>
            </div>
            {/* Asymmetric Bento Layout */}
            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Drag & Drop Upload (Left Column) */}
              <div className="col-span-12 lg:col-span-5 space-y-6">
                <div className="aspect-square lg:aspect-auto lg:h-[400px] bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-xl flex flex-col items-center justify-center p-8 text-center hover:border-primary-container/40 transition-colors group">
                  <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-container/10 transition-colors">
                    <CloudUpload
                      className="h-10 w-10 text-primary-container"
                      aria-hidden="true"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-on-surface">
                    Upload Payroll CSV
                  </h4>
                  <p className="text-sm text-outline mt-2 max-w-[240px]">
                    Drag and drop your payroll template or click to browse
                    files.
                  </p>
                  <div className="mt-8 flex flex-col space-y-3 w-full max-w-[200px]">
                    <button className="w-full py-3 bg-surface-container-highest text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-surface-bright transition-colors">
                      Download Template
                    </button>
                    <button className="w-full py-3 border border-outline-variant/30 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-surface-container-high transition-colors">
                      Sample Data
                    </button>
                  </div>
                </div>
                {/* Live Batch Summary */}
                <div className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-container mb-6">
                    Batch Analytics Preview
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                      <span className="text-xs text-outline">
                        Total Recipients
                      </span>
                      <span className="text-xl font-bold font-['Inter'] tracking-tight">
                        142
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                      <span className="text-xs text-outline">Gross Amount</span>
                      <span className="text-xl font-bold font-['Inter'] tracking-tight text-on-surface">
                        84,200.00{" "}
                        <span className="text-[10px] text-outline font-medium">
                          USDC
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                      <span className="text-xs text-outline">
                        Shielding Fees (Network)
                      </span>
                      <span className="text-xl font-bold font-['Inter'] tracking-tight text-tertiary-fixed-dim">
                        12.40{" "}
                        <span className="text-[10px] text-outline font-medium uppercase">
                          ETH
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-bold text-on-surface uppercase">
                        Estimated Execution Time
                      </span>
                      <span className="text-xs font-bold text-primary-container">
                        ~ 42 Seconds
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Data Preview Table (Right Column) */}
              <div className="col-span-12 lg:col-span-7 bg-surface-container rounded-xl overflow-hidden shadow-2xl flex flex-col">
                <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/70">
                    Parsed Entries Preview
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-tertiary-fixed-dim rounded-full"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary-fixed-dim">
                      Data Validated
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
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">
                          Department
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
                      {payrollRows.map((row) => (
                        <tr
                          key={row.initials + row.name}
                          className="hover:bg-surface-container-highest transition-colors"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-outline-variant/20 flex items-center justify-center text-[10px] font-bold">
                                {row.initials}
                              </div>
                              <div>
                                <p className="text-xs font-bold">{row.name}</p>
                                <p className="text-[10px] text-outline truncate w-32">
                                  {row.address}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-medium text-outline uppercase tracking-wider">
                              {row.department}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right font-bold text-xs tracking-tight">
                            {row.amount}
                          </td>
                          <td className="px-6 py-5 text-center">
                            <CheckCircle2
                              className="h-4 w-4 inline-block text-tertiary-fixed-dim"
                              aria-label="Validated"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-surface-container-high flex items-center justify-between">
                  <p className="text-[10px] text-outline font-bold uppercase tracking-widest">
                    Showing 5 of 142 Recipients
                  </p>
                  <button className="text-[10px] font-bold text-primary-container uppercase tracking-[0.1em] hover:underline">
                    Expand Full Preview
                  </button>
                </div>
              </div>
            </div>
            {/* Footer Action Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 bg-surface-container-lowest border border-primary-container/10 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-container/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10 flex items-center space-x-6">
                <div className="flex -space-x-3">
                  <img
                    alt="Employee Avatar"
                    className="w-12 h-12 rounded-full border-2 border-background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCro_RqEvQw4paXGRAO4LTBJmgIWE9HuLhbunuyNuNdNa_o371PY8DkpNyP2Hmvsbjz_RfbuTQfREdsfCx_gdlRbA3RTYsNc61Ys3SVxImzCVD6Wm8v0PzMJKGNZTU4kCCC6TAHRtjo58JU89cN17AOJOnOzWBeJneVZDq8kxhrqREQ64uf-05YKOFL7YfrzSWL8kP2KWCGzNFI9oTeQm-NMhTEN1chxGcssq44pEyVplzOd6aXaZr967B55xKGiGAJFmWiUNJsHvM"
                  />
                  <img
                    alt="Employee Avatar"
                    className="w-12 h-12 rounded-full border-2 border-background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKi4O1CL6_Q-HyoVeZmeZGaUghHIh4_UzPVHsdocvcWa_gxWBXycENm3_CGr9i9lKL1wkmK4jSVb6aQqFuItj_UY3YJHluWINuVGfEY--prq29XgIXM4I1Rs3nJvbf_1dgimWzPCuDsSD7Sb52xzQk3PAfd5oGRZbGbVWW06-vUXhM0CkVEPjudeCYbTDExz1sL2o0KKCsnreTC1Cp3XuHoIuITmN0gGbGwmYakrNdrb3UDvdcjTUx8GPB6w_jkXeAAvGGESYTp2s"
                  />
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest border-2 border-background flex items-center justify-center text-xs font-bold text-primary-container">
                    +137
                  </div>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-on-surface">
                    Ready for Batch Transfer
                  </h5>
                  <p className="text-xs text-outline font-medium">
                    Verify total amounts and network fees before execution.
                  </p>
                </div>
              </div>
              <div className="relative z-10 w-full md:w-auto flex flex-col md:flex-row gap-4">
                <button className="px-8 py-5 border border-outline-variant/30 text-sm font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-surface-container-high transition-all flex items-center justify-center space-x-3">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                  <span>Simulate</span>
                </button>
                <button className="px-12 py-5 bg-gradient-to-br from-primary-container to-primary-fixed-dim text-on-primary-container text-sm font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_0_40px_rgba(0,245,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center space-x-4">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                  <span>Execute Private Batch Transfer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Privacy Mesh Overlay (Bottom Corner Branding) */}
        <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none">
          <div className="flex items-center space-x-2">
            <ShieldCheck
              className="h-10 w-10 text-primary-container animate-pulse"
              aria-hidden="true"
            />
            <div className="text-[10px] font-bold text-primary-container tracking-[0.3em] uppercase">
              Powered by Arez ZK-Shield
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
