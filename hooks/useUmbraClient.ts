"use client";

import { useState, useEffect } from "react";
import { createUmbraClientFromWallet } from "@/lib/umbra";

export function useUmbraClient() {
  const [umbraClient, setUmbraClient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeClient = async () => {
    setLoading(true);
    setError(null);
    try {
      const client = await createUmbraClientFromWallet();
      console.log(`CLIENT VERSIONS : ${client}`);
      console.log(client);
      setUmbraClient(client);
    } catch (err: any) {
      setError(err.message || "Failed To Initialize Umbra Client");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { umbraClient, initializeClient, loading, error };
}
