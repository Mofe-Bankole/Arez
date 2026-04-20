import useArezWallet from "@/hooks/useWallet";
import { useEffect, useState } from "react";

export default function WalletConnectButton(){
    const { label, handleClick, connected, connecting } = useArezWallet();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (!copied) return;
      const t = window.setTimeout(() => setCopied(false), 900);
      return () => window.clearTimeout(t);
    }, [copied]);

    return (
      <button
        onClick={async () => {
          if (connecting) return;
          await handleClick();
          if (connected) setCopied(true);
        }}
        onContextMenu={async (e) => {
          // Right-click: disconnect (escape hatch without extra UI).
          e.preventDefault();
          if (connecting || !connected) return;
          await handleClick({ disconnect: true });
        }}
        className="px-5 py-2 glow-button text-on-primary-container font-bold text-xs uppercase tracking-wider rounded-md active:opacity-80 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={connecting}
        aria-label={
          connecting
            ? "Connecting wallet"
            : connected
              ? "Wallet connected (click to copy address)"
              : "Connect wallet"
        }
        title={
          connected
            ? "Click to copy address • Right-click to disconnect"
            : "Connect wallet"
        }
      >
        {copied && connected ? "Copied" : label}
      </button>
    );
}