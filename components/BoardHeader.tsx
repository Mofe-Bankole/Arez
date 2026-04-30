import { Bell, Shield } from "lucide-react";
import WalletConnectButton from "./ConnectWalletButton";

export default function BoardHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 w-full h-16 bg-[#131313]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(0,245,255,0.04)]">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-black text-[#e9feff] tracking-tighter uppercase">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/20">
          <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
          <span className="font-['Inter'] text-xs font-bold tracking-[0.05em] uppercase text-on-surface">
            DEVNET
          </span>
        </div>
        <button
          type="button"
          className="flex items-center justify-center h-10 w-10 rounded-lg text-on-surface hover:text-primary-container hover:bg-surface-container-high transition-colors"
          aria-label="Security"
        >
          <Shield className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="flex items-center justify-center h-10 w-10 rounded-lg text-on-surface hover:text-primary-container hover:bg-surface-container-high transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="ml-2">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
