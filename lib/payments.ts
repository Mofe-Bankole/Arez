import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export interface PaymentRequest {
  mode: "public" | "private";
  amount: number;
  recipient: string;
  network: "devnet" | "mainnet";
  chain: "solana";
}

export type ArezTransactionPayload = {
  status: "successful" | "failed";
  id: string;
  explorer: string;
  recipient: string;
  signer: string;
  network: "devnet" | "mainnet";
  chain: "solana";
  error: string | null;
};

export async function sendPrivatePayment() {}

export async function SendPublicPayment(payload: PaymentRequest) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  if (!publicKey)
    return {
      status: "failed",
      id: "",
      explorer: "",
      signer: "",
      network: "",
      chain: "solana",
      error: "Wallet is not connected . Do connect your wallet",
    };

  if (!payload)
    return {
      status: "failed",
      id: "",
      explorer: "",
      signer: "",
      network: "",
      chain: "solana",
      error: "PAYLOAD NOT FOUND",
    };

  if (payload.mode !== "public")
    return {
      status: "failed",
      id: "",
      explorer: "",
      signer: "",
      network: "",
      chain: "solana",
      error: "Transfer Mode Set to Private",
    };

  console.log(payload);
  try {
    const recipient = new PublicKey(payload.recipient);
    const lamports = payload.amount * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipient,
        lamports,
      }),
    );
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = publicKey;

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    console.log(`${signature}`);

    return {
      status: "successful",
      id: signature,
      explorer: `https://solscan.io`,
      signer: publicKey.toString(),
      network: "devnet",
      chain: "solana",
    };
  } catch (err: any) {
    console.error(`${err}`);
    return {
      status: "failed",
      id: "",
      explorer: `https://solscan.io`,
      signer: publicKey.toString(),
      network: "devnet",
      chain: "solana",
    };
  }
}
