import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function useArezWallet() {
  const { connected, connecting, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const openWalletModal = () => setVisible(true);

  const copyAddress = async () => {
    if (!publicKey) return false;
    const address = publicKey.toBase58();

    try {
      await navigator.clipboard.writeText(address);
      return true;
    } catch {
      return false;
    }
  };

  const handleClick = async (opts?: { disconnect?: boolean }) => {
    if (connecting) return;

    if (!connected) {
      openWalletModal();
      return;
    }

    // Default: keep the wallet connected; clicking copies address.
    if (opts?.disconnect) {
      await disconnect();
      return;
    }

    await copyAddress();
  };

  const label = connecting
    ? "Connecting…"
    : connected
      ? publicKey?.toBase58().slice(0, 4) +
        "..." +
        publicKey?.toBase58().slice(-4)
      : "Connect Wallet";
    
  return {
    label,
    handleClick,
    connected,
    connecting,
    publicKey,
  };
}
