"use client";
import { useState, useCallback, useRef } from "react";
// import { createUmbraClientFromWallet } from "@/lib/umbra";
import { IUmbraClient } from "@umbra-privacy/sdk/interfaces";
import { createUmbraClientFromWallet } from "@/lib/umbra/umbra";

export function useUmbraClient() {
  const [umbraClient, setUmbraClient] = useState<IUmbraClient | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const initializingRef = useRef(false); // prevents double-init

  const initializeClient = useCallback(async () => {
    if (initializingRef.current || umbraClient) return;
    initializingRef.current = true;

    setLoading(true);
    setError(null);

    try {
      const client = await createUmbraClientFromWallet();
      setUmbraClient(client);
      setReady(true);
      console.log("✅ Umbra Client Ready");
      console.log(client);
    } catch (err: any) {
      setError(err.message || "Failed to initialize Umbra client");
      console.error("Umbra client init failed:", err);
    } finally {
      setLoading(false);
      initializingRef.current = false;
    }
  }, [umbraClient]);

  // call this to reset everything on disconnect
  const resetClient = useCallback(() => {
    setUmbraClient(null);
    setReady(false);
    setError(null);
    setLoading(false);
  }, []);

  return { umbraClient, initializeClient, resetClient, loading, error, ready };
}
