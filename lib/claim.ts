import {
  getClaimableUtxoScannerFunction,
  getReceiverClaimableUtxoToEncryptedBalanceClaimerFunction,
  getSelfClaimableUtxoToPublicBalanceClaimerFunction,
  getUmbraRelayer,
  isClaimUtxoError,
  // getBatchMerkleProofFetcher,
} from "@umbra-privacy/sdk";
import {
  BatchMerkleProofFetcherFunction,
  IUmbraClient,
} from "@umbra-privacy/sdk/interfaces";
import {
  getClaimReceiverClaimableUtxoIntoEncryptedBalanceProver,
  getClaimSelfClaimableUtxoIntoPublicBalanceProver,
} from "@umbra-privacy/web-zk-prover";
import { createU32 } from "@umbra-privacy/sdk/utils";

export async function scanAndClaimUtxos(client: IUmbraClient) {
  const fetchUtxos = getClaimableUtxoScannerFunction({ client });

  const { received } = await fetchUtxos(
    createU32(BigInt(100000)),
    createU32(BigInt(0)),
  );
  console.log(received);
  console.log("Found claimable UTXOs:", received.length);
  if (received.length === 0) return { claimed: 0, results: [] };

  const claimProver = getClaimReceiverClaimableUtxoIntoEncryptedBalanceProver();

  const relayer = getUmbraRelayer({
    apiEndpoint: "https://relayer.api-devnet.umbraprivacy.com",
  });

  if (!client) return { claimed: 0, results: [] };
  const claim = getReceiverClaimableUtxoToEncryptedBalanceClaimerFunction(
    { client },
    {
      zkProver: claimProver,
      relayer: relayer,
      fetchBatchMerkleProof:
        client.fetchBatchMerkleProof as BatchMerkleProofFetcherFunction,
    },
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
      if (isClaimUtxoError(err)) {
        switch (err.stage) {
          case "zk-proof-generation":
            // ZK proof generation failed.
            // This may indicate an out-of-memory condition, or a zkProver mismatch.
            console.error("Proof generation failed:", err.message);
            console.log("Failed to generate proof. Please try again.");
            break;

          case "transaction-sign":
            // User rejected the transaction in their wallet.
            console.log("Claim cancelled.");
            break;

          case "transaction-validate":
            // Pre-flight simulation failed - often indicates a stale Merkle proof.
            // Re-fetch the proof using getClaimableUtxoScannerFunction and try again.
            console.warn(
              "Claim pre-flight failed - Merkle proof may be stale:",
              err.message,
            );
            break;

          case "transaction-send":
            // Transaction submitted but confirmation timed out.
            // Always verify on-chain before retrying - the nullifier may already be burned.
            console.warn(
              "Confirmation timeout. Check on-chain before retrying.",
            );
            break;

          default:
            // Other stages: initialization, validation, key-derivation, pda-derivation,
            // instruction-build, transaction-build, transaction-compile.
            console.error("Claim failed at stage:", err.stage, err);
        }
      } else {
        throw err;
      }
    }
  }

  return {
    claimed: results.filter((r) => r.status === "success").length,
    results,
  };
}
