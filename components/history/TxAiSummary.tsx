"use client";

import { useState, type MouseEvent } from "react";
import { Copy, Sparkles } from "lucide-react";
import type { TxRow } from "@/lib/helius-transactions";
import { txDetailsForPrompt } from "@/lib/helius-transactions";
import { generateOpenRouterCompletion } from "@/lib/openrouter";
import { getTxSummary, setTxSummary } from "@/lib/storage/tx-summaries";

type Props = {
  tx: TxRow;
};

export default function TxAiSummary({ tx }: Props) {
  const [summary, setSummary] = useState<string | null>(() =>
    getTxSummary(tx.signature),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(() => !!getTxSummary(tx.signature));

  const generate = async (e: MouseEvent) => {
    e.stopPropagation();
    const cached = getTxSummary(tx.signature);
    if (cached) {
      setSummary(cached);
      setExpanded(true);
      return;
    }

    setLoading(true);
    setError(false);
    setExpanded(true);

    try {
      const prompt = `Summarize this Solana transaction in one plain English sentence for a business owner's records: ${txDetailsForPrompt(tx)}`;
      const result = await generateOpenRouterCompletion(prompt);
      setTxSummary(tx.signature, result);
      setSummary(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const copySummary = async (e: MouseEvent) => {
    e.stopPropagation();
    if (summary) await navigator.clipboard.writeText(summary);
  };

  return (
    <div className="col-span-12 pt-2 pb-4 px-6" onClick={(e) => e.stopPropagation()}>
      {!expanded && (
        <button
          type="button"
          onClick={generate}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-container hover:text-primary transition-colors"
        >
          <Sparkles size={12} /> Generate Summary
        </button>
      )}

      {expanded && (
        <div className="space-y-2">
          {loading && (
            <Skeleton />
          )}
          {!loading && error && (
            <p className="text-xs text-outline">Summary unavailable</p>
          )}
          {!loading && !error && summary && (
            <div className="flex items-start gap-3">
              <p className="text-xs text-on-surface-variant font-body flex-1">
                {summary}
              </p>
              <button
                type="button"
                onClick={copySummary}
                className="shrink-0 p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"
                aria-label="Copy summary"
              >
                <Copy size={14} />
              </button>
            </div>
          )}
          {!loading && !summary && !error && (
            <button
              type="button"
              onClick={generate}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-container"
            >
              <Sparkles size={12} /> Generate Summary
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Skeleton() {
  return <div className="h-4 w-3/4 rounded bg-surface-container-high animate-pulse" />;
}
