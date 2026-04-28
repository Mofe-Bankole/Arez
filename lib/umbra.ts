import { getWallets } from "@wallet-standard/app";
import {
  createSignerFromWalletAccount,
  getUmbraClient,
} from "@umbra-privacy/sdk";
import { config } from "./config";

// wallets we actually support — order = preference
const SUPPORTED_WALLETS = ["Solflare", "Phantom", "Backpack"];

export async function createUmbraClientFromWallet() {
  if (typeof window === "undefined") {
    throw new Error("Umbra client can only be created in the browser");
  }

  const { get } = getWallets();
  const all = get();

  // filter to only Solana wallets we explicitly support
  const solanaWallets = all.filter((w) => {
    const features = Object.keys(w.features || {});
    const isSolana =
      features.includes("solana:signTransaction") &&
      features.includes("solana:signMessage");
    const isSupported = SUPPORTED_WALLETS.some((name) =>
      w.name.toLowerCase().includes(name.toLowerCase()),
    );
    return isSolana && isSupported;
  });

  // This reports if theres no wallet
  if (solanaWallets.length === 0) {
    throw new Error(
      "No supported Solana wallet found. Please install Solflare or Phantom.",
    );
  }

  // pick by preference order
  const wallet =
    SUPPORTED_WALLETS.map((name) =>
      solanaWallets.find((w) =>
        w.name.toLowerCase().includes(name.toLowerCase()),
      ),
    ).find(Boolean) ?? solanaWallets[0];

  const accounts = wallet!.accounts;

  if (!accounts || accounts.length === 0) {
    throw new Error(
      "Wallet connected but no accounts found. Try reconnecting.",
    );
  }

  const account = accounts[0];
  const signer = createSignerFromWalletAccount(wallet!, account);

  console.log("RPC config:", {
    rpcUrl: config.devnet_rpc,
    rpcSubscriptionsUrl: config.devnet_rpc_subscription_url,
    indexerApiEndpoint: config.indexerApiEndpoint,
  });

  return await getUmbraClient({
    signer,
    network: "devnet",
    rpcUrl: "https://api.devnet.solana.com",
    rpcSubscriptionsUrl: "wss://api.devnet.solana.com",
    indexerApiEndpoint: "https://utxo-indexer.api.umbraprivacy.com",
    deferMasterSeedSignature: true,
  });
}
