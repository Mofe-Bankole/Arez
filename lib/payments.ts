import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import {
  IUmbraClient,
  ZkProverForReceiverClaimableUtxoFromPublicBalance,
} from "@umbra-privacy/sdk/interfaces";
import { getPublicBalanceToReceiverClaimableUtxoCreatorFunction } from "@umbra-privacy/sdk";
import { address } from "@solana/kit";
import { createU64 } from "@umbra-privacy/sdk/utils";
import { config } from "./config";

/**
 * Payload for a public payment.
 * `amount` is expressed in whole units of the token (SOL or SPL token).
 * If `token` is omitted or "SOL", a native SOL transfer is performed.
 * Otherwise `token` should be the mint address of the SPL token (e.g., USDC).
 */
export interface PaymentRequest {
  mode: "public" | "private";
  amount: number; // In SOL or token units (not lamports)
  recipient: string; // Base‑58 address
  network: "devnet" | "mainnet"; // Network
  chain: "solana";
  token?: "SOL" | string; // mint address for SPL tokens
}

export interface ArezPrivateTransferPayload extends PaymentRequest {
  client: IUmbraClient;
  zkProver: ZkProverForReceiverClaimableUtxoFromPublicBalance;
  mint: string;
}
/** Result shape returned by every payment helper */
export type ArezTransactionPayload = {
  status: "successful" | "failed";
  id: string; // Transaction signature
  explorer: string; // Base explorer URL for the chosen network
  recipient: string;
  signer: string; // Public key of the sender
  network: "devnet" | "mainnet";
  chain: "solana";
  error: string | null;
};

/* -------------------------------------------------------------------------- */
/*  CORE IMPLEMENTATION – NO REACT HOOKS                                      */
/* -------------------------------------------------------------------------- */
/**
 * Core logic that performs a public payment.
 * It receives the wallet objects directly so it can be called from any context.
 */
export async function publicPayment(
  payload: PaymentRequest,
  publicKey: PublicKey,
  sendTransaction: (tx: Transaction, connection: Connection) => Promise<string>,
): Promise<ArezTransactionPayload> {
  // ---------- Guard clauses ----------
  if (!payload) {
    return {
      status: "failed",
      id: "",
      explorer: "",
      recipient: "",
      signer: "",
      network: "devnet",
      chain: "solana",
      error: "PAYLOAD NOT FOUND",
    };
  }

  if (payload.mode !== "public") {
    return {
      status: "failed",
      id: "",
      explorer: "",
      recipient: "",
      signer: "",
      network: payload.network,
      chain: "solana",
      error: "Transfer mode must be 'public'",
    };
  }

  const connection = new Connection(config.devnet_rpc, "confirmed");

  // ---------- Build transaction ----------
  const recipientPubkey = new PublicKey(payload.recipient);
  const transaction = new Transaction();

  // Native SOL transfer if token omitted or SOL
  if (!payload.token || payload.token === "SOL") {
    const lamports = Math.round(payload.amount * LAMPORTS_PER_SOL);
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubkey,
        lamports,
      }),
    );
  } else {
    // SPL token transfer (e.g., USDC)
    const mint = new PublicKey(payload.token);
    const senderTokenAccount = await getAssociatedTokenAddress(mint, publicKey);
    const recipientTokenAccount = await getAssociatedTokenAddress(
      mint,
      recipientPubkey,
    );
    const mintInfo = await getMint(connection, mint);
    const decimals = mintInfo.decimals;
    const amountInSmallest = Math.round(
      payload.amount * Math.pow(10, decimals),
    );
    transaction.add(
      createTransferCheckedInstruction(
        senderTokenAccount,
        mint,
        recipientTokenAccount,
        publicKey,
        amountInSmallest,
        decimals,
        [],
        TOKEN_PROGRAM_ID,
      ),
    );
  }

  // Set recent blockhash and fee payer
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash("finalized");
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = publicKey;

  // ---------- Send transaction ----------
  try {
    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });
    const explorerBase =
      payload.network === "mainnet"
        ? "https://solscan.io"
        : "https://solscan.io";
    const explorer = `${explorerBase}/tx/${signature}${payload.network === "devnet" ? "?cluster=devnet" : ""}`;
    return {
      status: "successful",
      id: signature,
      explorer,
      recipient: payload.recipient,
      signer: publicKey.toBase58(),
      network: payload.network,
      chain: "solana",
      error: null,
    };
  } catch (err: any) {
    console.error("Public payment failed:", err);
    return {
      status: "failed",
      id: "",
      explorer: "",
      recipient: payload.recipient,
      signer: publicKey.toBase58(),
      network: payload.network,
      chain: "solana",
      error: err?.message ?? "Unknown error",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*  HOOK EXPORT – PUBLIC API FOR COMPONENTS                                   */
/* -------------------------------------------------------------------------- */
/** React hook that returns a function to send a public payment. */
export function usePublicPayment() {
  const { publicKey, sendTransaction } = useWallet();
  return async (payload: PaymentRequest): Promise<ArezTransactionPayload> => {
    if (!publicKey) {
      return {
        status: "failed",
        id: "",
        explorer: "",
        recipient: payload.recipient,
        signer: "",
        network: payload.network,
        chain: "solana",
        error: "Wallet is not connected. Please connect your wallet.",
      };
    }
    return publicPayment(payload, publicKey, sendTransaction);
  };
}

export const SendPublicPayment = (payload: PaymentRequest) => {
  const sendFn = usePublicPayment();
  return sendFn(payload);
};

export async function SendPrivatePayment(payload: ArezPrivateTransferPayload) {
  const createUtxo = getPublicBalanceToReceiverClaimableUtxoCreatorFunction(
    { client: payload.client },
    { zkProver: payload.zkProver },
  );
  const RECIPIENT = payload.recipient;
  const MINT = payload.mint;
  const AMOUNT = payload.amount;

  const tx = await createUtxo({
    destinationAddress: address(RECIPIENT),
    mint: address(MINT),
    amount: createU64(BigInt(AMOUNT * LAMPORTS_PER_SOL)),
  });

  return tx;
}
