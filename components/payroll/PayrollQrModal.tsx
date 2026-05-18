"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { Copy, Download, X } from "lucide-react";

type Props = {
  open: boolean;
  qrDataUrl: string;
  claimUrl: string;
  recipientCount: number;
  totalSol: number;
  onClose: () => void;
};

export default function PayrollQrModal({
  open,
  qrDataUrl,
  claimUrl,
  recipientCount,
  totalSol,
  onClose,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  if (!open) return null;

  const downloadQr = () => {
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "arez-payroll-batch-qr.png";
    link.click();
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(claimUrl);
  };

  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  return (
    <Overlay onClose={onClose}>
      <Panel onClick={stopPropagation}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xl font-black text-on-surface uppercase tracking-tight">
              Payroll Batch QR
            </h3>
            <p className="text-sm text-on-surface-variant mt-1">
              {recipientCount} recipients ·{" "}
              {totalSol.toLocaleString("en-US", { minimumFractionDigits: 2 })} SOL
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex justify-center py-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={qrDataUrl}
            alt="Payroll batch claim QR code"
            className="w-56 h-56 rounded-lg bg-white p-3"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={downloadQr}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-outline-variant/30 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-surface-container-high transition-colors"
          >
            <Download size={14} /> Download QR
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-on-primary-container rounded-xl text-xs font-black uppercase tracking-widest"
          >
            <Copy size={14} /> Copy Link
          </button>
        </div>
      </Panel>
    </Overlay>
  );
}

function Overlay({
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

function Panel({
  onClick,
  children,
}: {
  onClick: (e: MouseEvent) => void;
  children: ReactNode;
}) {
  return (
    <div
      className="bg-surface-container rounded-xl border border-outline-variant/10 p-8 max-w-md w-full mx-4 space-y-4 shadow-2xl"
      onClick={onClick}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}
