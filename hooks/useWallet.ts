import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { getUserRegistrationFunction } from "@umbra-privacy/sdk";

export default function useArezWallet() {
  const { connected, connecting, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const openWalletModal = () => setVisible(true);
  const register = getUserRegistrationFunction({client : cl})
  const handleClick = async (opts?: { disconnect?: boolean }) => {
    if (connected) disconnect;

    if (connecting) return;

    if (!connected) {
      openWalletModal();
      return;
    }

    // Default: keep the wallet connected.
    if (opts?.disconnect) {
      await disconnect();
      return;
    }
    
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
