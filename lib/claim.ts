import {
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
  const { received } = await fetchUtxos(
    createU32(BigInt(0)),
    createU32(BigInt(0)),
  );
  console.log(received);
  console.log("Found claimable UTXOs : ", received.length);

  if (received.length === 0) return { claimed: 0, results: [] };

  const zkProver = getClaimReceiverClaimableUtxoIntoEncryptedBalanceProver();
  const relayer = getUmbraRelayer({
    apiEndpoint: config.umbra_relayer,
  });

  const claim = getReceiverClaimableUtxoToEncryptedBalanceClaimerFunction(
    {
      client,
    },
    { zkProver, relayer },
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
