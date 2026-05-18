"use client";

import type { ReactNode } from "react";
import { Copy, Loader2, X } from "lucide-react";
import type { WeeklyReportResponse } from "@/app/api/history/report/route";

type Props = {
  open: boolean;
  loading: boolean;
  error: string | null;
  report: WeeklyReportResponse | null;
  onClose: () => void;
};

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10">
      <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-1">
        {label}
      </p>
      <p className="text-lg font-bold text-on-surface">{value}</p>
    </div>
  );
}

export default function WeeklyReportModal({
  open,
  loading,
  error,
  report,
  onClose,
}: Props) {
  if (!open) return null;

  const copyReport = async () => {
    if (!report) return;
    const text = `${report.summary}\n\nSent: ${report.stats.sent} SOL\nReceived: ${report.stats.received} SOL\nCounterparties: ${report.stats.counterparties}\nMost Active Day: ${report.stats.mostActiveDay}`;
    await navigator.clipboard.writeText(text);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="bg-surface-container rounded-xl border border-outline-variant/10 p-8 max-w-lg w-full mx-4 space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="weekly-report-title"
      >
        <div className="flex items-center justify-between">
          <h3
            id="weekly-report-title"
            className="text-xl font-black text-on-surface uppercase tracking-tight"
          >
            Weekly Report
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {loading && (
          <div className="flex items-center gap-3 py-8">
            <Loader2 className="h-5 w-5 animate-spin text-primary-container" />
            <p className="text-sm text-on-surface-variant animate-pulse">
              Generating weekly report...
            </p>
          </div>
        )}

        {error && !loading && (
          <p className="text-sm text-outline">{error}</p>
        )}

        {report && !loading && (
          <>
            <p className="text-sm text-on-surface font-body leading-relaxed">
              {report.summary}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Sent" value={`${report.stats.sent} SOL`} />
              <StatCard label="Received" value={`${report.stats.received} SOL`} />
              <StatCard
                label="Counterparties"
                value={String(report.stats.counterparties)}
              />
              <StatCard
                label="Most Active Day"
                value={report.stats.mostActiveDay}
              />
            </div>
            <button
              type="button"
              onClick={copyReport}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-on-primary-container rounded-xl font-black text-xs uppercase tracking-widest"
            >
              <Copy size={14} /> Copy Report
            </button>
          </>
        )}
      </div>
    </ModalOverlay>
  );
}

function ModalOverlay({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      {children}
    </div>
  );
}
