"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import { USDC_MINT_DEVNET } from "@/lib/constants";
import { config } from "@/lib/config";

type BalancesState =
  | { status: "disconnected" }
  | { status: "loading" }
  | { status: "ready"; sol: number; usdc: number; updatedAt: number }
  | { status: "error"; message: string };

function safeNumber(n: unknown): number | null {
  if (typeof n !== "number" || !Number.isFinite(n)) return null;
  return n;
}

export function useBalances(opts?: { pollMs?: number }) {
  const pollMs = opts?.pollMs ?? 15_000;
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const usdcMint = useMemo(() => new PublicKey(USDC_MINT_DEVNET), []);
  const [state, setState] = useState<BalancesState>({ status: "disconnected" });

  useEffect(() => {
    if (!connected || !publicKey) {
      queueMicrotask(() => setState({ status: "disconnected" }));
      return;
    }

    let cancelled = false;

    const fetchOnce = async () => {
      setState((prev) =>
        prev.status === "ready" ? prev : { status: "loading" },
      );

      try {
        const [lamports, tokenAccounts] = await Promise.all([
          connection.getBalance(publicKey, { commitment: "confirmed" }),
          connection.getParsedTokenAccountsByOwner(
            publicKey,
            { mint: usdcMint },
            "confirmed",
          ),
        ]);

        const sol = lamports / LAMPORTS_PER_SOL;

        const usdc = tokenAccounts.value.reduce((sum, acc) => {
          const parsed = acc.account.data.parsed;
          const uiAmount = parsed?.info?.tokenAmount?.uiAmount;
          const n = safeNumber(uiAmount);
          return sum + (n ?? 0);
        }, 0);

        if (cancelled) return;
        setState({ status: "ready", sol, usdc, updatedAt: Date.now() });
      } catch (e: unknown) {
        if (cancelled) return;
        setState({
          status: "error",
          message: e instanceof Error ? e.message : "Failed to fetch balances",
        });
      }
    };

    fetchOnce();
    const id = window.setInterval(fetchOnce, pollMs);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [connected, publicKey, connection, usdcMint, pollMs]);

  return state;
}
