import "../globals.css"

export default function Dashboard() {
  return (
    <>
      <aside className="hidden md:flex flex-col h-full py-8 px-4 bg-[#0e0e0e] border-r-0 fixed left-0 w-64 z-50">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-black tracking-tighter text-[#e9feff]">Arez</h1>
          <p className="text-[10px] text-outline tracking-[0.2em] uppercase mt-1">
            Privacy-First Payroll
          </p>
        </div>
        <nav className="flex-1 space-y-1">
          {/* Dashboard (Active) */}
          <a
            className="flex items-center px-3 py-3 text-[#00f5ff] font-bold border-r-2 border-[#00f5ff] transition-all duration-200 hover:bg-[#1c1b1b]"
            href="#"
          >
            <span className="material-symbols-outlined mr-3" data-icon="dashboard">
              <Dashboard/>
            </span>
            <span className="font-['Inter'] text-sm tracking-wide uppercase font-medium">
              Dashboard
            </span>
          </a>
          {/* Send Payment */}
          <a
            className="flex items-center px-3 py-3 text-[#e5e2e1]/60 hover:text-[#e5e2e1] transition-colors duration-200 hover:bg-[#1c1b1b] group"
            href="#"
          >
            <span className="material-symbols-outlined mr-3" data-icon="payments">
              payments
            </span>
            <span className="font-['Inter'] text-sm tracking-wide uppercase font-medium">
              Send Payment
            </span>
          </a>
          {/* Payroll Batch */}
          <a
            className="flex items-center px-3 py-3 text-[#e5e2e1]/60 hover:text-[#e5e2e1] transition-colors duration-200 hover:bg-[#1c1b1b] group"
            href="#"
          >
            <span className="material-symbols-outlined mr-3" data-icon="account_tree">
              account_tree
            </span>
            <span className="font-['Inter'] text-sm tracking-wide uppercase font-medium">
              Payroll Batch
            </span>
          </a>
          {/* Invoices */}
          <a
            className="flex items-center px-3 py-3 text-[#e5e2e1]/60 hover:text-[#e5e2e1] transition-colors duration-200 hover:bg-[#1c1b1b] group"
            href="#"
          >
            <span className="material-symbols-outlined mr-3" data-icon="description">
              description
            </span>
            <span className="font-['Inter'] text-sm tracking-wide uppercase font-medium">
              Invoices
            </span>
          </a>
          {/* History */}
          <a
            className="flex items-center px-3 py-3 text-[#e5e2e1]/60 hover:text-[#e5e2e1] transition-colors duration-200 hover:bg-[#1c1b1b] group"
            href="#"
          >
            <span className="material-symbols-outlined mr-3" data-icon="history">
              history
            </span>
            <span className="font-['Inter'] text-sm tracking-wide uppercase font-medium">
              History
            </span>
          </a>
          {/* Viewing Keys */}
          <a
            className="flex items-center px-3 py-3 text-[#e5e2e1]/60 hover:text-[#e5e2e1] transition-colors duration-200 hover:bg-[#1c1b1b] group"
            href="#"
          >
            <span className="material-symbols-outlined mr-3" data-icon="vpn_key">
              vpn_key
            </span>
            <span className="font-['Inter'] text-sm tracking-wide uppercase font-medium">
              Viewing Keys
            </span>
          </a>
          {/* Settings */}
          <a
            className="flex items-center px-3 py-3 text-[#e5e2e1]/60 hover:text-[#e5e2e1] transition-colors duration-200 hover:bg-[#1c1b1b] group"
            href="#"
          >
            <span className="material-symbols-outlined mr-3" data-icon="settings">
              settings
            </span>
            <span className="font-['Inter'] text-sm tracking-wide uppercase font-medium">
              Settings
            </span>
          </a>
        </nav>
        <div className="mt-auto">
          <button className="w-full stealth-glow text-on-primary-container font-bold py-4 rounded-xl text-xs tracking-widest uppercase scale-95 active:scale-90 transition-transform">
            Shield &amp; Send
          </button>
        </div>
      </aside>
      {/* Main Content Canvas */}
      <main className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen bg-background">
        {/* TopNavBar Component */}
        <header className="sticky top-0 z-50 flex justify-between items-center px-8 w-full h-16 bg-[#131313]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(0,245,255,0.04)]">
          <div className="flex items-center gap-4">
            <span
              className="material-symbols-outlined text-outline"
              data-icon="shield"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield
            </span>
            <div className="flex items-center space-x-2 bg-surface-container-high px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
              <span className="font-['Inter'] text-xs font-bold tracking-[0.05em] text-[#e5e2e1]">
                Mainnet
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-surface-container-highest px-3 py-1.5 rounded-lg border border-outline-variant/20">
                <span className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-primary">
                  0x71C...4eD2
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="text-outline hover:text-[#00f5ff] transition-all duration-300">
                <span className="material-symbols-outlined" data-icon="notifications">
                  notifications
                </span>
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
                Status: Active &amp; Encrypted
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
            {/* Total Shielded Balance */}
            <div className="md:col-span-2 bg-surface-container-low p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <span
                  className="material-symbols-outlined text-8xl"
                  data-icon="account_balance_wallet"
                >
                  account_balance_wallet
                </span>
              </div>
              <label className="text-[10px] text-outline font-bold uppercase tracking-[0.1em]">
                Total Shielded Balance
              </label>
              <div className="mt-4 flex items-baseline space-x-2">
                <h3 className="text-4xl font-black tracking-tighter text-primary-container">
                  1,240,582.00
                </h3>
                <span className="text-primary-fixed-dim font-bold text-sm">USDC</span>
              </div>
              <div className="mt-6 flex items-center text-tertiary-fixed-dim text-xs font-bold">
                <span
                  className="material-symbols-outlined text-sm mr-1"
                  data-icon="trending_up"
                >
                  trending_up
                </span>
                <span>+12.5% from last month</span>
              </div>
            </div>
            {/* This Month Payroll */}
            <div className="bg-surface-container-low p-6 rounded-xl border-l border-primary-container/20">
              <label className="text-[10px] text-outline font-bold uppercase tracking-[0.1em]">
                This Month Payroll
              </label>
              <div className="mt-4">
                <h3 className="text-2xl font-black tracking-tight text-[#e5e2e1]">
                  428,100.00
                </h3>
                <p className="text-on-surface-variant text-[10px] mt-1">
                  Estimated gas: 0.042 ETH
                </p>
              </div>
            </div>
            {/* Active Recipients */}
            <div className="bg-surface-container-low p-6 rounded-xl border-l border-tertiary-fixed-dim/20">
              <label className="text-[10px] text-outline font-bold uppercase tracking-[0.1em]">
                Active Recipients
              </label>
              <div className="mt-4">
                <h3 className="text-2xl font-black tracking-tight text-[#e5e2e1]">142</h3>
                <p className="text-on-surface-variant text-[10px] mt-1">
                  across 12 departments
                </p>
              </div>
            </div>
            {/* Private Tx Count */}
            <div className="bg-surface-container-low p-6 rounded-xl col-span-1 border-l border-outline-variant/30">
              <label className="text-[10px] text-outline font-bold uppercase tracking-[0.1em]">
                Private Tx Count
              </label>
              <div className="mt-4">
                <h3 className="text-2xl font-black tracking-tight text-[#e5e2e1]">3,892</h3>
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
                          <span
                            className="material-symbols-outlined text-xs text-outline"
                            data-icon="lock"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            lock
                          </span>
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
                      <button className="text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" data-icon="visibility">
                          visibility
                        </span>
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
                          <span
                            className="material-symbols-outlined text-xs text-outline"
                            data-icon="lock"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            lock
                          </span>
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
                      <button className="text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" data-icon="visibility">
                          visibility
                        </span>
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
                          <span
                            className="material-symbols-outlined text-xs text-outline"
                            data-icon="lock"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            lock
                          </span>
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
                      <button className="text-outline hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" data-icon="visibility">
                          visibility
                        </span>
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
              <span
                className="material-symbols-outlined text-primary-container text-xl"
                data-icon="gpp_good"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                gpp_good
              </span>
            </div>
          </div>
        </div>
      </main>
      {/* Mobile BottomNavBar (Suppressed on Web per requirements) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#131313]/90 backdrop-blur-lg flex justify-around items-center px-4 z-50">
        <button className="text-[#00f5ff]">
          <span className="material-symbols-outlined" data-icon="dashboard">
            dashboard
          </span>
        </button>
        <button className="text-outline">
          <span className="material-symbols-outlined" data-icon="payments">
            payments
          </span>
        </button>
        <button className="text-outline">
          <span className="material-symbols-outlined" data-icon="account_tree">
            account_tree
          </span>
        </button>
        <button className="text-outline">
          <span className="material-symbols-outlined" data-icon="history">
            history
          </span>
        </button>
        <button className="text-outline">
          <span className="material-symbols-outlined" data-icon="settings">
            settings
          </span>
        </button>
      </nav>
    </>
  );
}