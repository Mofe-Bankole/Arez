import { NextRequest, NextResponse } from "next/server";
import {
  fetchHeliusTransactions,
  parseHeliusTx,
  type TxRow,
} from "@/lib/helius-transactions";
import { generateOpenRouterCompletion } from "@/lib/openrouter";

export type WeeklyReportStats = {
  sent: string;
  received: string;
  counterparties: number;
  mostActiveDay: string;
};

export type WeeklyReportResponse = {
  summary: string;
  stats: WeeklyReportStats;
};

const SEVEN_DAYS_SEC = 7 * 24 * 60 * 60;

function computeStats(rows: TxRow[]): WeeklyReportStats {
  let sentVolume = 0;
  let receivedVolume = 0;
  const counterpartySet = new Set<string>();
  const dayCounts = new Map<string, number>();

  for (const tx of rows) {
    const amountNum = parseFloat(tx.amount);
    if (!Number.isNaN(amountNum) && tx.amount !== "—") {
      if (tx.type === "Sent") sentVolume += amountNum;
      if (tx.type === "Received") receivedVolume += amountNum;
    }
    if (tx.counterpartyFull !== "Unknown") {
      counterpartySet.add(tx.counterpartyFull);
    }
    const dayKey = tx.date;
    dayCounts.set(dayKey, (dayCounts.get(dayKey) ?? 0) + 1);
  }

  let mostActiveDay = "—";
  let maxCount = 0;
  for (const [day, count] of dayCounts) {
    if (count > maxCount) {
      maxCount = count;
      mostActiveDay = day;
    }
  }

  return {
    sent: sentVolume.toFixed(4),
    received: receivedVolume.toFixed(4),
    counterparties: counterpartySet.size,
    mostActiveDay,
  };
}

export async function GET(request: NextRequest) {
  const wallet = request.nextUrl.searchParams.get("wallet");
  if (!wallet) {
    return NextResponse.json(
      { error: "wallet query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const nowSec = Math.floor(Date.now() / 1000);
    const cutoff = nowSec - SEVEN_DAYS_SEC;

    const raw = await fetchHeliusTransactions(wallet);
    const weekRows = raw
      .map((tx) => parseHeliusTx(tx, wallet))
      .filter((row) => row.timestamp >= cutoff);

    const stats = computeStats(weekRows);

    const txLines = weekRows
      .slice(0, 20)
      .map(
        (tx) =>
          `${tx.type} ${tx.amount} ${tx.token} on ${tx.date} (${tx.counterparty})`,
      )
      .join("; ");

    const prompt = `You are summarizing a business wallet's Solana activity for the past 7 days.
Stats: total sent volume ${stats.sent}, total received volume ${stats.received}, ${stats.counterparties} unique counterparties, most active day ${stats.mostActiveDay}.
Transactions: ${txLines || "No transactions this week"}.
Write a concise 2-3 sentence plain English summary for a business owner's weekly records.`;

    let summary: string;
    try {
      summary = await generateOpenRouterCompletion(prompt);
    } catch {
      summary =
        weekRows.length === 0
          ? "No on-chain activity recorded for this wallet in the past 7 days."
          : `This week: ${stats.sent} SOL sent, ${stats.received} SOL received across ${weekRows.length} transactions with ${stats.counterparties} unique counterparties. Most active on ${stats.mostActiveDay}.`;
    }

    const body: WeeklyReportResponse = { summary, stats };
    return NextResponse.json(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Report generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
