import { getUmbraClient } from "@umbra-privacy/sdk";

export const UMBRA_CONFIG = {
  network: "devnet" as const,
  rpcUrl: "https://api.devnet.solana.com",
  rpcSubscriptionsUrl: "wss://api.devnet.solana.com",
  indexerApiEndpoint: "https://utxo-indexer.api.umbraprivacy.com",
};

type GetUmbraClientArgs = Parameters<typeof getUmbraClient>[0];

export type UmbraClient = Awaited<ReturnType<typeof getUmbraClient>>;

export async function createUmbraClient(args: Pick<GetUmbraClientArgs, "signer">) {
  return getUmbraClient({
    signer: args.signer,
    ...UMBRA_CONFIG,
    deferMasterSeedSignature: true,
  });
}
