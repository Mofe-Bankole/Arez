"use client";
import useArezWallet from "@/hooks/useWallet";
import { useUmbraClient } from "@/hooks/useUmbraClient";
import { handleUmbraRegistration } from "@/lib/registerUser";
import { useEffect, useState } from "react";

export default function WalletConnectButton() {
  const { label, handleClick, connected, connecting, publicKey } =
    useArezWallet();
  const {
    umbraClient,
    loading: umbraLoading,
    error: umbraError,
    initializeClient,
  } = useUmbraClient();

  const [copied, setCopied] = useState(false);

  // Auto-initialize Umbra client once wallet is connected
  useEffect(() => {
    if (connected && !umbraClient && !umbraLoading) {
      initializeClient();
    }
  }, [connected, umbraClient, umbraLoading, initializeClient]);

  const onButtonClick = async () => {
    if (connecting) return;

    // If already connected and Umbra is ready → do registration
    if (connected && umbraClient) {
      try {
        await handleUmbraRegistration();
        console.log("Testing Clicked Again")
      } catch (err) {
        console.error(err);
      }
      return;
    }

    // Otherwise, let the original handleClick handle connect/disconnect
    await handleClick();
  };

  // Copy address logic (optional improvement)
  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
    }
  };

  return (
    <button
      onClick={async () => {
        if (connected) {
          copyAddress(); // left-click = copy when connected
        } else {
          await onButtonClick();
        }
      }}
      onContextMenu={async (e) => {
        e.preventDefault();
        await handleClick({ disconnect: true });
      }}
      className="px-5 py-2 glow-button text-on-primary-container font-bold text-xs uppercase tracking-wider rounded-md active:opacity-80 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={connecting || umbraLoading}
      title={
        connected
          ? "Left-click to copy • Right-click to disconnect"
          : "Connect wallet"
      }
    >
      {copied && connected
        ? "Copied By The Dev!"
        : umbraLoading
          ? "Initializing Umbra..."
          : label}
    </button>
  );
}
