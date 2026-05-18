"use client";

import Sidebar from "@/components/ui/Sidebar";
import BoardHeader from "@/components/ui/BoardHeader";
import { ENABLE_DUNE } from "@/lib/features";
import { BarChart2 } from "lucide-react";

const duneEmbedUrl = process.env.NEXT_PUBLIC_DUNE_EMBED_URL ?? "";

export default function AnalyticsPage() {
  if (!ENABLE_DUNE) {
    return null;
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-surface overflow-y-auto">
        <BoardHeader title="Analytics" />
        <section className="p-8 mx-auto w-full max-w-6xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-primary tracking-tight">
              On-Chain Analytics
            </h2>
            <p className="text-on-surface-variant text-sm font-body">
              Live Arez stealth pool volume — without de-anonymizing users
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              <BarChart2 size={12} className="text-tertiary-fixed-dim" />
              Powered by Dune
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-outline-variant/10 min-h-[600px] bg-surface-container-low">
            {duneEmbedUrl ? (
              <iframe
                src={duneEmbedUrl}
                title="Arez Dune Analytics"
                className="w-full min-h-[600px] border-0"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center min-h-[600px] text-on-surface-variant text-sm">
                Set NEXT_PUBLIC_DUNE_EMBED_URL to display the dashboard.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
