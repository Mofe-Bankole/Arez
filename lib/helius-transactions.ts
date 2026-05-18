const HeliusApiKey = process.env.NEXT_PUBLIC_HELIUS_API_KEY ?? "";
const HeliusBaseUrl = "https://api-devnet.helius-rpc.com/v0/addresses";

export const USDC_MINT = "4oG4sjmopf5MzvTHLE8rpVJ2uyczxfsw2K84SUTpNDx7";
export const USDT_MINT = "DXQwBNGgyQ2BzGWxEriJPVmXYFQBsQbXvfvfSNTaJkL6";

export type TxRow = {
  signature: string;
  date: string;
  time: string;
  type: "Sent" | "Received" | "Unknown";
  counterparty: string;
  counterpartyFull: string;
  amount: string;
  token: string;
  status: "confirmed" | "failed";
  timestamp: number;
};

type NativeTransfer = {
  amount: number;
  fromUserAccount: string;
  toUserAccount: string;
};

type TokenTransfer = {
  amount: number;
  fromUserAccount: string;
  toUserAccount: string;
  mint?: string;
  tokenSymbol?: string;
};

export type HeliusTransaction = {
  signature: string;
  timestamp?: number;
  blockTime?: number;
  nativeTransfers?: NativeTransfer[];
  tokenTransfers?: TokenTransfer[];
};

export function parseHeliusTx(
  tx: HeliusTransaction,
  walletAddress: string,
): TxRow {
  const signature = tx.signature;
  const timestamp = tx.timestamp ?? tx.blockTime ?? 0;
  const dateObj = new Date(timestamp * 1000);
  const dateStr = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = dateObj.toISOString().split("T")[1].split(".")[0] + " UTC";

  let type: TxRow["type"] = "Unknown";
  let counterpartyFull = "Unknown";
  let amount = "—";
  let token = "SOL";

  if (tx.nativeTransfers && tx.nativeTransfers.length > 0) {
    const nt = tx.nativeTransfers[0];
    const diff = nt.amount / 1e9;
    amount = Math.abs(diff).toFixed(4);
    token = "SOL";
    if (nt.fromUserAccount === walletAddress) {
      type = "Sent";
      counterpartyFull = nt.toUserAccount;
    } else if (nt.toUserAccount === walletAddress) {
      type = "Received";
      counterpartyFull = nt.fromUserAccount;
    }
  }

  if (type === "Unknown" && tx.tokenTransfers && tx.tokenTransfers.length > 0) {
    const tt = tx.tokenTransfers[0];
    amount = Math.abs(tt.amount).toString();
    if (tt.mint === USDC_MINT) {
      token = "USDC";
    } else if (tt.mint === USDT_MINT) {
      token = "USDT";
    } else {
      token = tt.tokenSymbol ?? "SPL";
    }
    if (tt.fromUserAccount === walletAddress) {
      type = "Sent";
      counterpartyFull = tt.toUserAccount;
    } else if (tt.toUserAccount === walletAddress) {
      type = "Received";
      counterpartyFull = tt.fromUserAccount;
    }
  }

  const counterparty =
    counterpartyFull !== "Unknown"
      ? `${counterpartyFull.slice(0, 6)}...${counterpartyFull.slice(-4)}`
      : "Unknown";

  return {
    signature,
    date: dateStr,
    time: timeStr,
    type,
    counterparty,
    counterpartyFull,
    amount,
    token,
    status: "confirmed",
    timestamp,
  };
}

export async function fetchHeliusTransactions(
  address: string,
): Promise<HeliusTransaction[]> {
  if (!HeliusApiKey) {
    throw new Error("Helius API key not configured");
  }

  const url = `${HeliusBaseUrl}/${address}/transactions?api-key=${HeliusApiKey}`;
  const resp = await fetch(url);
  const data = (await resp.json()) as HeliusTransaction[] | { error?: string };

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}

export function txDetailsForPrompt(tx: TxRow): string {
  return `Type: ${tx.type}, Amount: ${tx.amount} ${tx.token}, Counterparty: ${tx.counterparty}, Date: ${tx.date} ${tx.time}`;
}
