import {
  getClaimableUtxoScannerFunction,
  getReceiverClaimableUtxoToEncryptedBalanceClaimerFunction,
  getUmbraRelayer,
} from "@umbra-privacy/sdk";
import { getClaimReceiverClaimableUtxoIntoEncryptedBalanceProver } from "@umbra-privacy/web-zk-prover";

const RELAYER = "https://relayer.api.umbraprivacy.com";

export async function scanAndClaimUtxos(client: IUmbraClient) {
  const fetchUtxos = getClaimableUtxoScannerFunction({ client });
  const { received } = await fetchUtxos(0, 0);

  console.log("Found claimable UTXOs : ", received.length);

  if (received.length === 0) return { claimed: 0, results: [] };

  const zkProver = getClaimReceiverClaimableUtxoIntoEncryptedBalanceProver();
  const relayer = getUmbraRelayer({
    apiEndpoint: "https://relayer.api.umbraprivacy.com",
  });

  const claim = getReceiverClaimableUtxoToEncryptedBalanceClaimerFunction(
    { client },
    { zkProver: zkProver, relayer: relayer, fetchBatchMerkleProof: client },
  );

  const results = [];
  for (const utxo of received) {
    try {
      const result = await claim([utxo]);
      results.push({ status: "success", result });
    } catch (err: any) {
      results.push({ status: "failed", error: err.message });
    }
  }

  return {
    claimed: results.filter((r) => r.status === "success").length,
    results,
  };
}
