import { getWallets } from "@wallet-standard/app";
import { StandardConnect } from "@wallet-standard/features";
import {
  createSignerFromWalletAccount,
  getUmbraClient,
} from "@umbra-privacy/sdk";

const { get } = getWallets();
const solanaWallets = get().filter((w) => {
  const features = Object.keys(w.features);
  return (
    features.includes("solana:signTransaction") &&
    features.includes("solana:signMessage")
  );
});

const wallet = solanaWallets[0];
const connectFeature = wallet.features[StandardConnect];
const { accounts } = await (connectFeature as any).connect();
const account = accounts[0];

const signer = createSignerFromWalletAccount(wallet, account);

export const UmbraClient = await getUmbraClient({
  signer,
  network: "mainnet",
  rpcUrl: "https://api.devnet.solana.com",
  rpcSubscriptionsUrl: "wss://api.devnet.solana.com",
  indexerApiEndpoint: "https://utxo-indexer.api.umbraprivacy.com",
  deferMasterSeedSignature: true,
});
