export type ModalDataPayloadProps = {
  amount: number; // e.g. 500.00
  sender: string; // address or name
  time: number; // Unix timestamp (seconds)
  type: "private" | "public";
  chain: "Solana";
  network: string; // e.g. "Solana Mainnet"
  explorerURL: string | null; // optional link to explorer
  token: string; // token symbol, e.g. "USDC"
};

/**
 * Transaction success modal.
 * Rendered as a centered overlay with a glass‑morphism effect.
 */
export default function TransactionModal({
  amount,
  sender,
  time,
  type,
  chain,
  network,
  explorerURL,
  token,
}: ModalDataPayloadProps) {
  // Format the timestamp (fallback to “–” if invalid)
  const date = Number.isFinite(time)
    ? new Date(time * 1000).toUTCString()
    : "–";

  // Human‑readable amount with token symbol
  const formattedAmount = `${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${token}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#131313] border border-[#3a494a]/20 rounded-xl overflow-hidden glass-panel stealth-glow animate-in fade-in zoom-in duration-300">
        {/* Header – animated pulse */}
        <div className="relative pt-12 pb-6 flex flex-col items-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#3ce36a]/5 rounded-full blur-3xl" />
          <div className="relative z-10 w-20 h-20 rounded-full bg-[#1c1b1b] flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border border-[#3ce36a]/30 animate-pulse" />
            <span
              className="material-symbols-outlined text-[#3ce36a] text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <h2 className="text-2xl font-display font-bold text-[#e9feff] tracking-tight">
            Transaction Successful
          </h2>
          <p className="text-[#e5e2e1]/40 text-xs uppercase tracking-[0.2em] mt-1">
            Confirmed on‑chain
          </p>
        </div>

        {/* Body – transaction details */}
        <div className="px-8 pb-10 space-y-6">
          {/* Main value */}
          <div className="text-center bg-[#1c1b1b] py-6 rounded-lg">
            <span className="text-3xl font-display font-black text-[#00f5ff] tracking-tighter">
              {formattedAmount}
            </span>
            <div className="text-[10px] text-[#e5e2e1]/40 uppercase mt-1 tracking-widest">
              {type === "private" ? "Private" : "Public"} Transaction
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#e5e2e1]/40">Recipient</span>
              <span className="font-mono text-[#e5e2e1] bg-[#1c1b1b] px-2 py-0.5 rounded">
                {sender}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#e5e2e1]/40">Sender</span>
              <span className="font-mono text-[#e5e2e1]">{sender}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#e5e2e1]/40">Network</span>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]" />
                <span className="text-[#e5e2e1]">{network}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#e5e2e1]/40">Time (UTC)</span>
              <span className="text-[#e5e2e1]">{date}</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="pt-4 space-y-3">
            {explorerURL && (
              <a
                href={explorerURL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-[#e9feff] text-[#131313] text-center font-bold text-sm rounded-md hover:bg-white active:scale-95 transition-all"
              >
                View on Explorer
              </a>
            )}
            <button
              className="block w-full py-3 bg-[#1c1b1b] text-[#e5e2e1] text-center font-bold text-sm rounded-md border border-[#3a494a]/20 hover:bg-[#2a2a2a] transition-all"
              onClick={() => {
                // Parent component should control modal visibility.
                // Example: setShowModal(false);
              }}
            >
              Return to Dashboard
            </button>
          </div>
        </div>

        {/* Footer – transaction meta */}
        <div className="bg-[#0e0e0e] py-3 px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span
              className="material-symbols-outlined text-[#3ce36a] text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="text-[10px] text-[#3ce36a]/80 uppercase font-bold tracking-widest">
              {type === "private"
                ? "Private Transaction"
                : "Public Transaction"}
            </span>
          </div>
          <div className="text-[10px] text-[#e5e2e1]/30">
            Ref: AREZ_
            {/*{Math.floor(Math.random() * 1_000_000)
              .toString()
              .padStart(6, "0")}*/}
            _TX
          </div>
        </div>
      </div>
    </div>
  );
}
