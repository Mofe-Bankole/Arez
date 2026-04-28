"use client";
import { useEffect, useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUmbraClient } from "@/hooks/useUmbraClient";
import { handleUmbraRegistration } from "@/lib/umbraRegister";

export default function WalletConnectButton() {
  const {
    connected,
    connecting,
    publicKey,
    connect,
    disconnect,
    select,
    wallets,
  } = useWallet();
  const {
    umbraClient,
    loading: umbraLoading,
    ready,
    initializeClient,
    resetClient,
  } = useUmbraClient();
  const [copied, setCopied] = useState(false);

  // init Umbra silently after wallet connects
  useEffect(() => {
    if (connected && !umbraClient && !umbraLoading) {
      initializeClient();
    }
    if (!connected) {
      resetClient();
    }
  }, [connected]); // ← only depend on connected, not the functions

  useEffect(() => {
    if (!connected || umbraClient || umbraLoading) return;

    // small delay — wallet.accounts populates after connected fires
    const timer = setTimeout(() => {
      initializeClient();
    }, 300);

    return () => clearTimeout(timer);
  }, [connected]);

  // register after client is ready
  useEffect(() => {
    if (!ready || !umbraClient) return;

    handleUmbraRegistration({ umbraClient }).catch((err) => {
      console.error("Registration failed:", err);
    });
  }, [ready]); // ← fires once when ready flips to true

  // copy address on click when connected
  const copyAddress = useCallback(async () => {
    if (!publicKey) return;
    await navigator.clipboard.writeText(publicKey.toBase58());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [publicKey]);

  const onButtonClick = async () => {
    if (connecting) return;

    if (!connected) {
      try {
        // find solflare in adapter list
        const solflare = wallets.find((w) =>
          w.adapter.name.toLowerCase().includes("solflare"),
        );

        const walletName = solflare?.adapter.name ?? wallets[0]?.adapter.name;

        if (!walletName) {
          console.error("No wallet found in adapter list");
          return;
        }

        select(walletName); // synchronous call

        // wait for adapter to register the selection
        await new Promise((res) => setTimeout(res, 100));

        await connect();
      } catch (err) {
        console.error("Connect failed:", err);
      }
      return;
    }

    await copyAddress();
  };

  const onRightClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (connected) {
      await disconnect();
      resetClient();
    }
  };

  // label logic — Umbra loading is invisible to the user
  const label = connecting
    ? "Connecting..."
    : connected && publicKey
      ? copied
        ? "Copied!"
        : `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
      : "Connect Wallet";

  return (
    <button
      onClick={onButtonClick}
      onContextMenu={onRightClick}
      disabled={connecting}
      type="button"
      title={
        connected
          ? "Left-click to copy • Right-click to disconnect"
          : "Connect wallet"
      }
      className="px-5 py-2 glow-button text-on-primary-container font-bold text-xs uppercase tracking-wider rounded-md active:opacity-80 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {label}
      {connected && (
        <span
          className={`ml-2 inline-block w-1.5 h-1.5 rounded-full ${
            ready ? "bg-green-400" : "bg-yellow-400 animate-pulse"
          }`}
        />
      )}
    </button>
  );
}
