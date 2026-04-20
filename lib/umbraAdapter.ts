type AdapterPublicKey = { toBase58(): string };

type AdapterLike = {
  publicKey: AdapterPublicKey;
  signTransaction: (tx: unknown) => Promise<unknown>;
  signAllTransactions?: (txs: unknown[]) => Promise<unknown[]>;
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
};

type UmbraSigner = {
  address: string;
  signTransaction: (tx: unknown) => Promise<unknown>;
  signTransactions: (txs: unknown[]) => Promise<unknown[]>;
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
};

export function createSignerFromAdapter(adapter: AdapterLike): UmbraSigner {
  return {
    address: adapter.publicKey.toBase58(),

    signTransaction: async (tx: unknown) => {
      return adapter.signTransaction(tx);
    },

    signTransactions: async (txs: unknown[]) => {
      if (!adapter.signAllTransactions) {
        return Promise.all(txs.map((tx) => adapter.signTransaction(tx)));
      }
      return adapter.signAllTransactions(txs);
    },

    signMessage: async (message: Uint8Array) => {
      return adapter.signMessage(message);
    },
  };
}