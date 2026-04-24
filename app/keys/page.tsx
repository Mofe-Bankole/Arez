import WalletConnectButton from "@/components/ConnectWalletButton";
import Sidebar from "@/components/Sidebar";
import { Bell, Shield } from "lucide-react";

export default function ViewingKeys() {
  return (
    <div className="flex h-screen w-full bg-background text-on-surface font-body overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-surface-dim overflow-y-auto relative">
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 w-full h-60 bg-[#131313]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(0,245,255,0.04)]">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-black text-[#e9feff] tracking-tighter uppercase">
                Viewing Keys
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-on-surface">
                Devnet
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
        <main className="flex-1 min-h-screen bg-surface">
          <div className="p-10 w-full mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-[#e9feff] mb-2 uppercase">
                  Viewing Keys
                </h2>
                <p className="text-on-surface-variant max-w-xl text-sm leading-relaxed">
                  Securely share read-only access to specific transaction data.
                  Viewing keys allow external auditors or partners to verify
                  payments without compromising your master privacy.
                </p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 stealth-glow text-on-primary-container font-bold rounded-md hover:opacity-90 transition-all">
                <span className="material-symbols-outlined">add_moderator</span>
                <span className="uppercase tracking-tighter text-sm">
                  Share New Viewing Key
                </span>
              </button>
            </div>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-4 space-y-8">
                <div className="p-8 bg-surface-container-low rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                  <h3 className="text-xs font-bold tracking-[0.2em] text-[#00f5ff] uppercase mb-6">
                    Security Perimeter
                  </h3>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center border border-primary-container/20">
                      {/* <span class="material-symbols-outlined text-primary-container" style="font-variation-settings: 'FILL' 1;">security</span> */}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">
                        Active Stealth
                      </div>
                      <div className="text-xs text-on-surface-variant uppercase tracking-wider">
                        Level 4 Encryption Enabled
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface-variant">
                        Active Keys
                      </span>
                      <span className="text-primary font-mono">08</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface-variant">
                        Pending Requests
                      </span>
                      <span className="text-primary font-mono">02</span>
                    </div>
                    <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-primary-container shadow-[0_0_8px_rgba(0,245,255,0.5)]"></div>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-surface-container-highest/30 rounded-xl ghost-border">
                  <h3 className="text-xs font-bold tracking-[0.2em] text-on-surface/40 uppercase mb-6">
                    Permission Logic
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <span className="material-symbols-outlined text-tertiary-fixed-dim text-lg">
                        visibility
                      </span>
                      <p className="text-xs text-on-surface-variant leading-normal">
                        <strong className="text-on-surface block mb-1 uppercase tracking-tighter">
                          Read-Only
                        </strong>
                        Cannot execute transactions or modify metadata.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <span className="material-symbols-outlined text-primary-container text-lg">
                        date_range
                      </span>
                      <p className="text-xs text-on-surface-variant leading-normal">
                        <strong className="text-on-surface block mb-1 uppercase tracking-tighter">
                          Timed Decay
                        </strong>
                        Keys automatically expire and shred after the set
                        duration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <div className="bg-surface-container-low rounded-xl overflow-hidden">
                  <div className="px-8 py-6 flex justify-between items-center border-b border-outline-variant/10">
                    <h3 className="text-xs font-bold tracking-[0.2em] text-on-surface/40 uppercase">
                      Active Permissions
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                        Filter by:
                      </span>
                      <select className="bg-transparent border-none text-xs font-bold text-[#00f5ff] uppercase focus:ring-0 p-0 cursor-pointer">
                        <option>Expiration</option>
                        <option>Recipient</option>
                      </select>
                    </div>
                  </div>
                  <div className="divide-y divide-outline-variant/5">
                    <div className="px-8 py-6 flex items-center justify-between hover:bg-surface-container transition-colors group">
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#e5e2e1]/40">
                            corporate_fare
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-primary mb-1 uppercase tracking-tight">
                            KPMG Audit 2024
                          </div>
                          <div className="text-xs text-on-surface-variant font-mono">
                            arez_key_...92f1_ auditor_group
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="hidden md:block">
                          <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">
                            Expires
                          </div>
                          <div className="text-xs text-on-surface font-medium">
                            In 12 Days
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <span
                              className="material-symbols-outlined text-[16px] text-primary-container"
                              data-weight="fill"
                              title="Payroll View"
                            >
                              account_balance_wallet
                            </span>
                            <span
                              className="material-symbols-outlined text-[16px] text-primary-container"
                              data-weight="fill"
                              title="Metadata access"
                            >
                              description
                            </span>
                            <span
                              className="material-symbols-outlined text-[16px] text-on-surface-variant/20"
                              title="No batch access"
                            >
                              inventory_2
                            </span>
                          </div>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-error/60 hover:text-error transition-colors px-3 py-1 ghost-border rounded">
                          Revoke
                        </button>
                      </div>
                    </div>
                    <div className="px-8 py-6 flex items-center justify-between hover:bg-surface-container transition-colors group">
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#e5e2e1]/40">
                            person
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-primary mb-1 uppercase tracking-tight">
                            Jameson (Private Contractor)
                          </div>
                          <div className="text-xs text-on-surface-variant font-mono">
                            arez_key_...44d2_ individual
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="hidden md:block">
                          <div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">
                            Expires
                          </div>
                          <div className="text-xs text-on-surface font-medium">
                            In 4 Hours
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <span
                              className="material-symbols-outlined text-[16px] text-primary-container"
                              data-weight="fill"
                              title="Payroll View"
                            >
                              account_balance_wallet
                            </span>
                            <span
                              className="material-symbols-outlined text-[16px] text-on-surface-variant/20"
                              title="No metadata access"
                            >
                              description
                            </span>
                            <span
                              className="material-symbols-outlined text-[16px] text-on-surface-variant/20"
                              title="No batch access"
                            >
                              inventory_2
                            </span>
                          </div>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-error/60 hover:text-error transition-colors px-3 py-1 ghost-border rounded">
                          Revoke
                        </button>
                      </div>
                    </div>
                    <div className="px-8 py-6 flex items-center justify-between bg-surface-container-low/50 opacity-40">
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded bg-surface-container-highest/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#e5e2e1]/40">
                            history
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-on-surface-variant mb-1 uppercase tracking-tight">
                            Q4 Tax Compliance
                          </div>
                          <div className="text-xs text-on-surface-variant/60 font-mono">
                            arez_key_...001a_ archived
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="hidden md:block">
                          <div className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest mb-1">
                            Status
                          </div>
                          <div className="text-xs text-on-surface-variant font-medium uppercase">
                            Expired Oct 31
                          </div>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors px-3 py-1 ghost-border rounded">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="relative">
                <div className="p-10 bg-surface-container-highest rounded-xl border border-primary-container/10">
                  <div className="mb-8">
                    <h3 className="text-xl font-black uppercase tracking-tighter text-primary mb-2">
                      Issue New Permission
                    </h3>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                      Generate a one-time cryptographic link
                    </p>
                  </div>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.1em] mb-2">
                        Recipient Entity
                      </label>
                      <input
                        className="w-full bg-surface-container border-none text-sm p-4 rounded focus:ring-1 focus:ring-primary-container/30 transition-all placeholder:text-on-surface-variant/30"
                        placeholder="Legal Name or Wallet Address"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.1em] mb-4">
                        Granular Permissions
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-4 bg-surface-container rounded hover:bg-surface-container-high transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container">
                              account_balance_wallet
                            </span>
                            <span className="text-xs font-bold uppercase tracking-tight">
                              Transaction Values
                            </span>
                          </div>
                          <input
                            className="rounded border-outline-variant bg-surface-dim text-primary-container focus:ring-0 focus:ring-offset-0"
                            type="checkbox"
                          />
                        </label>
                        <label className="flex items-center justify-between p-4 bg-surface-container rounded hover:bg-surface-container-high transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary-container">
                              assignment_ind
                            </span>
                            <span className="text-xs font-bold uppercase tracking-tight">
                              Employee Identities
                            </span>
                          </div>
                          <input
                            className="rounded border-outline-variant bg-surface-dim text-primary-container focus:ring-0 focus:ring-offset-0"
                            type="checkbox"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.1em] mb-2">
                          Duration
                        </label>
                        <select className="w-full bg-surface-container border-none text-sm p-4 rounded focus:ring-0">
                          <option>24 Hours</option>
                          <option>7 Days</option>
                          <option>30 Days</option>
                          <option>Custom</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.1em] mb-2">
                          Usage Limit
                        </label>
                        <input
                          className="w-full bg-surface-container border-none text-sm p-4 rounded focus:ring-0"
                          type="number"
                          value="1"
                        />
                      </div>
                    </div>
                    <button
                      className="w-full py-4 stealth-glow text-on-primary-container font-black uppercase tracking-[0.1em] text-sm rounded shadow-[0_10px_20px_-5px_rgba(0,245,255,0.2)] hover:shadow-[0_15px_30px_-5px_rgba(0,245,255,0.3)] transition-all"
                      type="button"
                    >
                      Generate Viewing Key
                    </button>
                  </form>
                </div>
              </div>
              <div className="pt-10 space-y-12">
                <div>
                  {/* <span class="material-symbols-outlined text-4xl text-primary-container mb-4" style={{font-variation-settings: 'FILL' 1;}}>security</span> */}
                  <h4 className="text-sm font-black uppercase tracking-widest text-on-surface mb-3">
                    Zero-Knowledge Evidence
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Issuing a viewing key does not move funds. It generates a
                    proof that decrypts selected fields in your transaction
                    history for the specific viewer's public key.
                  </p>
                </div>
                <div className="relative p-6 ghost-border rounded-xl bg-primary-container/[0.02]">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim">
                      verified
                    </span>
                    <div>
                      <h5 className="text-xs font-bold uppercase text-on-surface mb-2">
                        Auditor Ready
                      </h5>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        This key is compatible with standard regulatory
                        interfaces, allowing tax authorities to verify payroll
                        compliance while your business remains ghosted to the
                        open web.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2 opacity-20">
                  <div className="h-1 bg-primary-container"></div>
                  <div className="h-1 bg-surface-container-highest"></div>
                  <div className="h-1 bg-primary-container"></div>
                  <div className="h-1 bg-primary-container"></div>
                  <div className="h-1 bg-surface-container-highest"></div>
                  <div className="h-1 bg-surface-container-highest"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <button className="fixed bottom-8 right-8 flex items-center justify-center w-14 h-14 bg-error text-on-error rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group">
          <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
            lock_reset
          </span>
          <div className="absolute right-full mr-4 px-3 py-1 bg-surface-container-highest text-error text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none rounded">
            Emergency Revoke All
          </div>
        </button>
      </main>
    </div>
  );
}
