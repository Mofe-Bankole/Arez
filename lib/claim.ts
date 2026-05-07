import {
  getClaimableUtxoScannerFunction,
  getSelfClaimableUtxoToPublicBalanceClaimerFunction,
  getUmbraRelayer,
  getBatchMerkleProofFetcher,
} from "@umbra-privacy/sdk";
import { IUmbraClient } from "@umbra-privacy/sdk/interfaces";
import { getClaimSelfClaimableUtxoIntoPublicBalanceProver } from "@umbra-privacy/web-zk-prover";
import { createU32 } from "@umbra-privacy/sdk/utils";

export async function scanAndClaimUtxos(client: IUmbraClient) {
  const fetchUtxos = getClaimableUtxoScannerFunction({ client });

  const { received } = await fetchUtxos(
    createU32(BigInt(0)),
    createU32(BigInt(0)),
    createU32(BigInt(1000)),
  );

  console.log("Found claimable UTXOs:", received.length);
  if (received.length === 0) return { claimed: 0, results: [] };

  const zkProver = getClaimSelfClaimableUtxoIntoPublicBalanceProver();
  const relayer = getUmbraRelayer({
    apiEndpoint: "https://relayer.api-devnet.umbraprivacy.com",
  });

  const fetchBatchMerkleProof = getBatchMerkleProofFetcher({
    apiEndpoint: "https://utxo-indexer.api-devnet.umbraprivacy.com",
  });

  const claim = getSelfClaimableUtxoToPublicBalanceClaimerFunction(
    { client },
    { zkProver, relayer, fetchBatchMerkleProof },
  );

  const results = [];
  for (const utxo of received) {
    try {
      const result = await claim([utxo]);
      console.log("Claim result : ", result);
      results.push({ status: "success", result });
    } catch (err: any) {
      console.error("Claim error : ", err);
      results.push({ status: "failed", error: err.message });
    }
  }

  return {
    claimed: results.filter((r) => r.status === "success").length,
    results,
  };
}
