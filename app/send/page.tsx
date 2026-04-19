import "../globals.css"
export default function Send() {
  return (
    <div className="flex h-screen w-full">
      <aside className="docked left-0 h-screen w-64 bg-[#0e0e0e] border-r-0 flex flex-col h-full py-8 px-4 z-50">
        <div className="mb-10 px-2">
          <div className="text-2xl font-black tracking-tighter text-[#e9feff]">
            Arez
          </div>
          <div className="font-['Inter'] text-sm tracking-wide uppercase font-medium text-[#e5e2e1]/60 mt-1">
            Privacy-First Payroll
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <a
            className="flex items-center gap-3 px-3 py-2.5 font-['Inter'] text-sm tracking-wide uppercase font-medium text-[#e5e2e1]/60 hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 font-['Inter'] text-sm tracking-wide uppercase font-bold text-[#00f5ff] border-r-2 border-[#00f5ff] bg-[#1c1b1b] transition-colors duration-200"
            href="#"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              payments
            </span>
            <span>Send Payment</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 font-['Inter'] text-sm tracking-wide uppercase font-medium text-[#e5e2e1]/60 hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined text-lg">
              account_tree
            </span>
            <span>Payroll Batch</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 font-['Inter'] text-sm tracking-wide uppercase font-medium text-[#e5e2e1]/60 hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined text-lg">
              description
            </span>
            <span>Invoices</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 font-['Inter'] text-sm tracking-wide uppercase font-medium text-[#e5e2e1]/60 hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined text-lg">history</span>
            <span>History</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 font-['Inter'] text-sm tracking-wide uppercase font-medium text-[#e5e2e1]/60 hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined text-lg">vpn_key</span>
            <span>Viewing Keys</span>
          </a>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant/10">
          <a
            className="flex items-center gap-3 px-3 py-2.5 font-['Inter'] text-sm tracking-wide uppercase font-medium text-[#e5e2e1]/60 hover:text-[#e5e2e1] hover:bg-[#1c1b1b] transition-colors duration-200 group"
            href="#"
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Settings</span>
          </a>
          <div className="mt-6 flex items-center gap-3 px-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant/20">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                data-alt="close-up portrait of a professional individual in dark modern attire against a muted gray background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4SQTsyqJSYjEVLMYilBxUOBjzQ2XSY4iV_OH-qqm11MxNBs1b2mpSnd0lnkcDh-4sPtHWlRZ6e5G7jqU8QAN2yKxHV3DAuB5TBGePRzyU-JlC-3j54s1Sz9o_5HaqjXJQGb--MXf8rwCLmCVvN1IsPcQO5XOW2SfArFE1gVAyqSOxGmI5ePcBfPKbY0pbF_b7BTuZgem3AGvlN8wl1Brx_xJCyMKs_PteeNvkRDxkB5M7lz8ADu10Kf_cQtULAMvy9eHrBsaFutE"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary tracking-wider">
                SECURE_NODE_01
              </span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">
                Identity Shielded
              </span>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 flex flex-col bg-surface-dim overflow-y-auto relative">
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 w-full h-16 bg-[#131313]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(0,245,255,0.04)]">
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
            <button className="flex items-center gap-2 p-2 text-on-surface hover:text-[#00f5ff] transition-all">
              <span className="material-symbols-outlined text-xl">shield</span>
            </button>
            <button className="flex items-center gap-2 p-2 text-on-surface hover:text-[#00f5ff] transition-all">
              <span className="material-symbols-outlined text-xl">
                notifications
              </span>
            </button>
            <button className="ml-2 px-4 py-2 bg-primary-container text-on-primary-container font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase rounded-lg hover:opacity-90 transition-opacity">
              Connect Wallet
            </button>
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
                    className="w-full bg-surface-container-highest border-0 rounded-xl py-4 pl-4 pr-12 text-on-surface placeholder:text-outline-variant/60 focus:ring-1 focus:ring-primary-container/30 transition-all font-body text-sm"
                    placeholder="Solana Address or ENS Name"
                    type="text"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline-variant text-lg">
                      person_search
                    </span>
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
                      className="w-full bg-surface-container-highest border-0 rounded-xl py-4 pl-4 pr-12 text-on-surface placeholder:text-outline-variant/60 focus:ring-1 focus:ring-primary-container/30 transition-all font-body text-sm"
                      placeholder="0.00"
                      type="number"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <span className="text-[10px] font-black text-primary-fixed-dim uppercase tracking-tighter">
                        MAX
                      </span>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                    Currency
                  </label>
                  <select className="w-full bg-surface-container-highest border-0 rounded-xl py-4 px-4 text-on-surface focus:ring-1 focus:ring-primary-container/30 transition-all font-body text-sm appearance-none cursor-pointer">
                    <option>USDC (SPL-Token)</option>
                    <option>SOL (Native)</option>
                    <option>AREZ (Privacy Token)</option>
                  </select>
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2 px-1">
                  Private Memo (Encrypted)
                </label>
                <textarea
                  className="w-full bg-surface-container-highest border-0 rounded-xl py-4 px-4 text-on-surface placeholder:text-outline-variant/60 focus:ring-1 focus:ring-primary-container/30 transition-all font-body text-sm resize-none"
                  placeholder="Add a secure note to this transaction..."
                
                ></textarea>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-container">
                        verified_user
                      </span>
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      checked={false}
                      className="sr-only peer"
                      type="checkbox"
                    />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-on-surface-variant/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        key
                      </span>
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                  </label>
                </div>
              </div>
              <button
                className="w-full py-5 stealth-glow text-on-primary-container rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(0,245,255,0.2)] hover:scale-[1.01] active:scale-95 transition-all duration-200 mt-4"
                type="button"
              >
                Shield &amp; Send
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
                      <span
                        className="material-symbols-outlined text-tertiary-fixed-dim text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        lock
                      </span>
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
                    <span className="material-symbols-outlined text-primary-container text-lg">
                      info
                    </span>
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
                    <span className="material-symbols-outlined text-outline">
                      help_outline
                    </span>
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
