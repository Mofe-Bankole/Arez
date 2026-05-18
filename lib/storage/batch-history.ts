const STORAGE_KEY = "arez.payroll.batch.history";

export type BatchHistoryEntry = {
  id: string;
  timestamp: number;
  recipientCount: number;
  totalAmount: number;
  status: "Confirmed" | "Pending";
  batchType: string;
};

function readBatches(): BatchHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BatchHistoryEntry[];
  } catch {
    return [];
  }
}

function writeBatches(batches: BatchHistoryEntry[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(batches));
  } catch {
    // ignore
  }
}

export function loadBatchHistory(): BatchHistoryEntry[] {
  return readBatches().sort((a, b) => b.timestamp - a.timestamp);
}

let batchCounter = 0;

function initCounter(batches: BatchHistoryEntry[]): void {
  const maxNum = batches.reduce((max, b) => {
    const match = b.id.match(/^Batch_(\d{4})_/);
    if (match) {
      return Math.max(max, parseInt(match[1], 10));
    }
    return max;
  }, 0);
  batchCounter = maxNum;
}

export function generateBatchId(batchType = "Salaries"): string {
  const batches = readBatches();
  if (batchCounter === 0) initCounter(batches);
  batchCounter += 1;
  const num = String(batchCounter).padStart(4, "0");
  return `Batch_${num}_${batchType}`;
}

export function addBatchHistoryEntry(entry: {
  recipientCount: number;
  totalAmount: number;
  status: BatchHistoryEntry["status"];
  batchType?: string;
}): BatchHistoryEntry {
  const batchType = entry.batchType ?? "Salaries";
  const batches = readBatches();
  const newEntry: BatchHistoryEntry = {
    id: generateBatchId(batchType),
    timestamp: Date.now(),
    recipientCount: entry.recipientCount,
    totalAmount: entry.totalAmount,
    status: entry.status,
    batchType,
  };
  batches.unshift(newEntry);
  writeBatches(batches.slice(0, 50));
  return newEntry;
}
