// @ts-ignore
import {
  enrichWithMerkleProof,
  getClaimableUtxoScannerFunction,
  getReceiverClaimableUtxoToEncryptedBalanceClaimerFunction,
  getUmbraRelayer,
} from "@umbra-privacy/sdk";
import { IUmbraClient } from "@umbra-privacy/sdk/interfaces";
import { config } from "./config";
import { getClaimReceiverClaimableUtxoIntoEncryptedBalanceProver } from "@umbra-privacy/web-zk-prover";
import { createU32 } from "@umbra-privacy/sdk/utils";

export async function scanAndClaimUtxos(client: IUmbraClient) {
  const fetchUtxos = getClaimableUtxoScannerFunction({ client });
  console.log(client.signer);
  console.log(client);
  const { received } = await fetchUtxos(
    createU32(0n), // start tree
    createU32(0n), // start insertion index
    createU32(1000n), // end insertion index — catch everything up to leaf 1000
  );
  console.log(received);
  console.log("Found claimable UTXOs : ", received.length);

  if (received.length === 0) return { claimed: 0, results: [] };

  const zkProver = getClaimReceiverClaimableUtxoIntoEncryptedBalanceProver();
  const relayer = getUmbraRelayer({
    apiEndpoint: "https://relayer.api-devnet.umbraprivacy.com",
  });

  const claim = getReceiverClaimableUtxoToEncryptedBalanceClaimerFunction(
    {
      client,
    },
    { zkProver: zkProver, relayer },
  );

  const results = [];
  for (const utxo of received) {
    try {
      const result = await claim([utxo]);
      results.push({ status: "success", result });
    } catch (err: unknown) {
      results.push({ status: "failed", error: err.message });
    }
  }

  return {
    claimed: results.filter((r) => r.status === "success").length,
    results,
  };
}
