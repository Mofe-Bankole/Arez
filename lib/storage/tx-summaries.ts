const STORAGE_KEY = "arez.tx.summaries";

type SummaryMap = Record<string, string>;

function readMap(): SummaryMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as SummaryMap;
  } catch {
    return {};
  }
}

function writeMap(map: SummaryMap): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore quota errors
  }
}

export function getTxSummary(signature: string): string | null {
  return readMap()[signature] ?? null;
}

export function setTxSummary(signature: string, summary: string): void {
  const map = readMap();
  map[signature] = summary;
  writeMap(map);
}
