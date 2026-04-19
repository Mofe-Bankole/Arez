import { Diamond, EyeClosed, GitBranch, Key, LucideVerified, Shield } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 w-full bg-[#131313]/70 backdrop-blur-xl h-16 shadow-[0_0_20px_rgba(0,245,255,0.04)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-primary-container rounded-lg">
            <span
              className="material-symbols-outlined text-on-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <Shield/>
            </span>
          </div>
          <span className="text-xl font-black text-[#e9feff] tracking-tighter">
            Arez
          </span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-[#e5e2e1] hover:text-[#00f5ff] transition-all duration-300"
            href="#"
          >
            Technology
          </a>
          <a
            className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-[#e5e2e1] hover:text-[#00f5ff] transition-all duration-300"
            href="#"
          >
            Privacy
          </a>
          <a
            className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-[#e5e2e1] hover:text-[#00f5ff] transition-all duration-300"
            href="#"
          >
            Compliance
          </a>
          <a
            className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-[#e5e2e1] hover:text-[#00f5ff] transition-all duration-300"
            href="#"
          >
            Documentation
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-['Inter'] text-[10px] font-bold tracking-[0.1em] uppercase text-tertiary-fixed-dim px-2 py-1 bg-tertiary-fixed-dim/10 rounded">
            Mainnet
          </span>
          <button className="px-5 py-2 glow-button text-on-primary-container font-bold text-xs uppercase tracking-wider rounded-md active:opacity-80 transition-all">
            Connect Wallet
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full">
        {/* <!-- Hero Section --> */}
        <section className="relative min-h-[921px] flex items-center justify-center pt-20 px-6">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-container/5 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-tertiary-container/5 rounded-full blur-[100px]"></div>
          </div>
          <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary-fixed-dim">
                  Stealth Intelligence Live
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-primary uppercase">
                Send Salaries <br />
                <span className="text-primary-container">Privately</span> <br />
                on Solana
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl font-light leading-relaxed">
                Shield your payroll from the public ledger. Obfuscate amounts,
                recipients, and timing while maintaining regulatory compliance
                through zero-knowledge proofs.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-8 py-4 glow-button text-on-primary-container font-black text-sm uppercase tracking-widest rounded-md hover:scale-[1.02] active:scale-95 transition-all">
                  Shield &amp; Send
                </button>
                <button className="px-8 py-4 bg-transparent border border-outline-variant text-primary font-black text-sm uppercase tracking-widest rounded-md hover:bg-surface-container-high transition-all">
                  Try Demo
                </button>
              </div>
              {/* <!-- Trust Signals --> */}
              <div className="pt-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-6">
                  Secured &amp; Powered By
                </p>
                <div className="flex flex-wrap gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-2xl">
                      <Diamond/>
                    </span>
                    <span className="font-bold tracking-tighter text-lg uppercase">
                      Solana
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-2xl">
                      visibility_off
                    </span>
                    <span className="font-bold tracking-tighter text-lg uppercase">
                      Umbra
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-2xl">
                      grain
                    </span>
                    <span className="font-bold tracking-tighter text-lg uppercase">
                      Arcium
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative hidden lg:block">
              {/* <!-- Asymmetric Bento Card for Hero Visual --> */}
              <div className="relative w-full aspect-square glass-panel rounded-xl p-1 bg-gradient-to-br from-outline-variant/20 to-transparent">
                <div className="bg-surface-container-lowest h-full w-full rounded-xl p-8 flex flex-col justify-between overflow-hidden relative">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-outline">
                          Privacy Mesh
                        </div>
                        <div className="text-xl font-bold text-primary-container">
                          Active Stealth
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-primary-container/20 flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-primary-container"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          security
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-12 w-full bg-surface-container-high rounded-lg animate-pulse flex items-center px-4 justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="w-6 h-6 rounded-full bg-surface-variant"></div>
                          <div className="w-24 h-2 bg-surface-variant rounded"></div>
                        </div>
                        <div className="w-12 h-2 bg-primary-container/30 rounded"></div>
                      </div>
                      <div className="h-12 w-full bg-surface-container-high rounded-lg opacity-60 flex items-center px-4 justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="w-6 h-6 rounded-full bg-surface-variant"></div>
                          <div className="w-24 h-2 bg-surface-variant rounded"></div>
                        </div>
                        <div className="w-12 h-2 bg-surface-variant rounded"></div>
                      </div>
                      <div className="h-12 w-full bg-surface-container-high rounded-lg opacity-30 flex items-center px-4 justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="w-6 h-6 rounded-full bg-surface-variant"></div>
                          <div className="w-24 h-2 bg-surface-variant rounded"></div>
                        </div>
                        <div className="w-12 h-2 bg-surface-variant rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-32 w-full mt-8 bg-surface-container overflow-hidden rounded-lg">
                    <img
                      className="w-full h-full object-cover mix-blend-overlay opacity-40"
                      data-alt="abstract visualization of digital network data streams in glowing cyan and dark obsidian background representing secure encrypted transmissions"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpc1pZLYM3He6DzcarPAoVL4g5Z5BeJMPX8AIrKRrJCCfcFHmKvynuBcNy4_qIbEaFtx65kpEwTia5WWIEax0Bfb02yRztDbgJbpxjTbQpQXx4U-pM_4HXRvkqS6MsnL_P9q-vWbYcfruBPIev9ZUzvXeT8Jqe3GJ8eAD4oUmWpE2l5aOMC3Y83zCcg-JcmBq55_vNG3d_lOi0__vDTby6EWux6PqTvGjDE0aNodFGhq0rFlsy23TlX5FoXYctzOo8zaeCi_Gcy7o"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="text-[40px] font-black leading-none text-primary-container tracking-tighter">
                        99.9%
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-outline pb-1">
                        Anonymity Score
                      </div>
                    </div>
                  </div>
                </div>
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
                  <span className="material-symbols-outlined text-4xl text-primary-container">
                    <EyeClosed/>
                  </span>
                  <h3 className="text-3xl font-black uppercase tracking-tight">
                    Shielded Transactions
                  </h3>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
                    Every payroll run is processed through our privacy layer,
                    disconnecting the sender's public identity from the
                    recipient's wallet. Hide amounts, timing, and internal team
                    hierarchies from curious competitors.
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-all duration-700"></div>
              </div>
              {/* <!-- Feature 2 --> */}
              <div className="bg-surface-container-high p-10 rounded-xl space-y-6 flex flex-col justify-center">
                <span className="material-symbols-outlined text-4xl text-tertiary-fixed-dim">
                  <Key/>
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Viewing Keys
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Granular transparency. Generate one-time or permanent viewing
                  keys to give tax authorities, auditors, or investors selective
                  visibility without exposing your entire treasury.
                </p>
              </div>
              {/* <!-- Feature 3 --> */}
              <div className="bg-surface-container-high p-10 rounded-xl space-y-6 flex flex-col justify-center">
                <span className="material-symbols-outlined text-4xl text-primary-container">
                  speed
                  
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Solana Speed
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Privacy doesn't have to be slow. Leveraging the
                  high-throughput architecture of Solana, Arez processes
                  thousands of private payments in seconds with sub-cent fees.
                </p>
              </div>
              {/* <!-- Feature 4 --> */}
              <div className="md:col-span-2 bg-surface-container-low p-1 p-px rounded-xl bg-gradient-to-r from-outline-variant/30 to-transparent">
                <div className="bg-surface-container-low h-full w-full rounded-xl p-10 flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1 space-y-6">
                    <span className="material-symbols-outlined text-4xl text-primary-container">
                      <GitBranch/>
                    </span>
                    <h3 className="text-3xl font-black uppercase tracking-tight">
                      Batch Efficiency
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      Upload a single CSV and distribute payments to 1,000+
                      contributors in a single transaction. Each recipient
                      receives their funds in a private stealth address unique
                      to them.
                    </p>
                  </div>
                  <div className="flex-1 bg-surface-container-lowest rounded-lg p-6 w-full border border-outline-variant/10">
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-bold text-outline uppercase tracking-widest">
                        <span>Status</span>
                        <span>Privacy Level</span>
                      </div>
                      <div className="h-[1px] bg-outline-variant/20"></div>
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
        <section className="py-32 px-6">
          <div className="container mx-auto flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Privacy without <br />
                <span className="text-outline">Anarchy.</span>
              </h2>
              <p className="text-xl text-on-surface-variant leading-relaxed">
                Arez is built for the professional world. Our ZK-compliance
                framework allows you to prove tax obligations and salary
                distributions without revealing individual worker data to the
                world.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container">
                    check_circle
                  </span>
                  <span className="text-on-surface">
                    Zero-Knowledge proof of tax withholdings
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container">
                    check_circle
                  </span>
                  <span className="text-on-surface">
                    Automated W-8/W-9 collection in encrypted vaults
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary-container">
                    check_circle
                  </span>
                  <span className="text-on-surface">
                    Auditor-only portal with hardware key access
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-primary-container/20 blur-[100px] rounded-full"></div>
              <div className="relative glass-panel bg-surface-container-high/40 rounded-2xl p-8 border border-primary-container/10">
                <img
                  className="rounded-xl object-cover w-full aspect-video grayscale opacity-80 mix-blend-screen"
                  data-alt="high-tech secure server room with glowing green and blue status lights and architectural server racks in a dark environment"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7sEbgKU09g-nPYzdn4beXG6PUUaGS7l8Nn3xOhrHAuJfn_37KJDPtLql9lds3ipXmA0Ba-dj5kUUlWm9lRR4SORhVAa57_zhSCEikbFdEbVC3PPpwIddCjAMn9l3bGP1XBc8ooAqto8lHCH9PyB9_oNFqANSd-Izeunbn6n5hx1KqBkJMujAUt_21LUeON_32z4Zn-yeFrhB_447FgAtSZ6BwrobxwskEp0RBddGozJrBv0O8W2urylovxSOAWLS5-tiUJ3alqHs"
                />
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-outline uppercase tracking-widest">
                      Encryption Standard
                    </div>
                    <div className="text-lg font-bold text-primary">
                      AES-256-GCM + ZK-SNARKs
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-4xl text-primary-container">
                    {/* verified_user */}
                    <LucideVerified/>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- CTA Section --> */}
        <section className="py-20 px-6 bg-primary-container/5 border-y border-outline-variant/10">
          <div className="container mx-auto text-center space-y-10 max-w-4xl">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic">
              Ready to go incognito?
            </h2>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
              Join 200+ organizations moving their payroll to the shadows of the
              Solana ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-6 glow-button text-on-primary-container font-black text-lg uppercase tracking-widest rounded-md transition-all hover:scale-105">
                Connect Your Wallet
              </button>
              <button className="px-12 py-6 bg-surface-container-highest text-primary font-black text-lg uppercase tracking-widest rounded-md border border-outline-variant transition-all hover:bg-surface-container">
                Book a Demo
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
                <span
                  className="material-symbols-outlined text-on-primary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
              </div>
              <span className="text-2xl font-black text-[#e9feff] tracking-tighter">
                Arez
              </span>
            </div>
            <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
              The privacy-first payroll engine for the decentralized economy.
              Built for security, designed for stealth.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary-container hover:border-primary-container transition-all cursor-pointer">
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-primary-container hover:border-primary-container transition-all cursor-pointer">
                <span className="material-symbols-outlined">share</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-container">
              Platform
            </h4>
            <ul className="space-y-4 text-sm text-outline">
              <li className="hover:text-primary transition-colors">
                <a href="#">Dashboard</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Viewing Keys</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Compliance</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Integrations</a>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-container">
              Technology
            </h4>
            <ul className="space-y-4 text-sm text-outline">
              <li className="hover:text-primary transition-colors">
                <a href="#">Whitepaper</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">ZK-Proofs</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Solana Core</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Security Audit</a>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-container">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-outline">
              <li className="hover:text-primary transition-colors">
                <a href="#">About</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Privacy</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Terms</a>
              </li>
              <li className="hover:text-primary transition-colors">
                <a href="#">Contact</a>
              </li>
            </ul>
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
