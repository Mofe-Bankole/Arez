"use client";
import { useUmbraClient } from "@/hooks/useUmbraClient";
import { handleUmbraRegistration } from "@/lib/registerUser";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function WalletConnectButton() {
  const {
    connected,
    connecting,
    publicKey,
    connect,
    disconnect,
    select, // in case wallet selection is needed
  } = useWallet();

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

  // Reset copied state after 1.5s
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  // Button click handler
  const onButtonClick = async () => {
    if (connecting || umbraLoading) return;
    if (!connected) {
      try {
        select("Solflare");
        await connect();
   
      } catch (err) {
        console.error("Failed to connect wallet:", err);
      }
      return;
    }
    if (publicKey) {
      await copyAddress();
    }
  };

  // Right click: Disconnect wallet when connected
  const onRightClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (connected && disconnect) {
      try {
        await disconnect();
      } catch (err) {
        console.error("Failed to disconnect wallet:", err);
      }
    }
  };

  // Copy address logic
  const copyAddress = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toBase58());
        setCopied(true);
      } catch (err) {
        setCopied(false);
        console.error("Clipboard copy failed", err);
      }
    }
  };

  // Optional: Handle Umbra registration from a separate button or step if needed
  // For now, handle it automatically if both wallet and Umbra client are ready
  useEffect(() => {
    const doRegistration = async () => {
      if (connected && umbraClient) {
        try {
          await handleUmbraRegistration();
        } catch (err) {
          console.error("Umbra registration failed:", err);
        }
      }
    };
    doRegistration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, umbraClient]); // Only when ready

  return (
    <button
      onClick={onButtonClick}
      onContextMenu={onRightClick}
      className="px-5 py-2 glow-button text-on-primary-container font-bold text-xs uppercase tracking-wider rounded-md active:opacity-80 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={connecting || umbraLoading}
      title={
        connected
          ? copied
            ? "Copied!"
            : "Left-click to copy • Right-click to disconnect"
          : connecting
            ? "Connecting..."
            : umbraLoading
              ? "Loading Umbra client..."
              : "Connect wallet"
      }
      aria-busy={connecting || umbraLoading}
      type="button"
    >
      {connecting
        ? "Connecting..."
        : umbraLoading
        ? "Loading..."
        : connected && publicKey
        ? copied
          ? "Copied!"
          : `${publicKey.toBase58().slice(0, 4)}...${publicKey
              .toBase58()
              .slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
}
