'use client'

import { useWalletConnect } from '@/context/WalletConnectContext';

export const WalletConnectButton = () => {
  const { handleConnect } = useWalletConnect();

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium transition-colors"
    >
      Connect Wallet
    </button>
  );
};