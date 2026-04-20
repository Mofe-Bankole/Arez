import { useState, useEffect, useCallback } from "react";
import {
  getUmbraClient,
  getUserRegistrationFunction,
} from "@umbra-privacy/sdk";
import type { UmbraClient } from "../lib/umbra";
import { UMBRA_CONFIG } from "../lib/umbra";
import { useWallet } from "@solana/wallet-adapter-react";
import { createSignerFromAdapter } from "@/lib/umbraAdapter";


//state for umbra hook
export type UmbraState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; client: UmbraClient }
  | { status: "error"; error: string };

export function useUmbra() {
  const {
    publicKey,
    signAllTransactions,
    connected,
    signMessage,
    signTransaction,
  } = useWallet();
  const [state, setState] = useState<UmbraState>({ status: "idle" });

  useEffect(() => {
    const walletReady =
      connected && !!publicKey && !!signMessage && !!signTransaction;
    if (!walletReady) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setState({ status: "loading" });
    });

    const signer = createSignerFromAdapter({
      publicKey,
      signTransaction,
      signMessage,
      signAllTransactions,
    });

    getUmbraClient({
      signer,
      ...UMBRA_CONFIG,
      deferMasterSeedSignature: true,
    })
      .then((client) => {
        if (!cancelled) setState({ status: "ready", client });
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to initialize Umbra client";
        if (!cancelled) setState({ status: "error", error: message });
      });

    return () => {
      cancelled = true;
    };
  }, [connected, publicKey, signMessage, signTransaction, signAllTransactions]);

  const register = useCallback(async () => {
    if (state.status !== "ready") return;
    const reg = getUserRegistrationFunction({ client: state.client });
    await reg({ confidential: true, anonymous: true });
  }, [state]);

  
  return {
    client:
      connected && publicKey && state.status === "ready" ? state.client : null,
    isLoading: connected && publicKey ? state.status === "loading" : false,
    error: connected && publicKey && state.status === "error" ? state.error : null,
    register,
  };
}
