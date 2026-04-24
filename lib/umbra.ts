"use client";
import { getWallets } from "@wallet-standard/app";
import { StandardConnect } from "@wallet-standard/features";
import {
  createSignerFromWalletAccount,
  getUmbraClient,
} from "@umbra-privacy/sdk";

export async function createUmbraClientFromWallet() {
  const { get } = getWallets();
  const wallets = get();

  const solanaWallets = wallets.filter((w) => {
    const features = Object.keys(w.features || {});
    return (
      features.includes("solana:signTransaction") &&
      features.includes("solana:signMessage")
    );
  });

  if (solanaWallets.length === 0) {
    throw new Error(
      "No compatible Solana wallet found. Please connect a wallet.",
    );
  }
  const wallet = solanaWallets[0];

  // Connect if not already connected
  const connectFeature = wallet.features?.[StandardConnect];
  if (!connectFeature) {
    throw new Error("Wallet does not support StandardConnect");
  }

  const { accounts } = await (connectFeature as any).connect();
  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts returned after connect");
  }

  const account = accounts[0];

  const signer = createSignerFromWalletAccount(wallet, account);

  return await getUmbraClient({
    signer,
    network: "mainnet", // change to "devnet" if testing
    rpcUrl: "https://api.mainnet-beta.solana.com", // Use proper mainnet RPC
    rpcSubscriptionsUrl: "wss://api.mainnet-beta.solana.com",
    indexerApiEndpoint: "https://utxo-indexer.api.umbraprivacy.com",
    deferMasterSeedSignature: true,
  });
}
