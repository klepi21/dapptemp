import React from 'react';
import { Wallet2 } from 'lucide-react';
import { useWalletConnect } from '../../context/WalletConnectContext';

export const WalletConnectButton = () => {
  const { openModal } = useWalletConnect();

  return (
    <button
      onClick={openModal}
      className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md 
        bg-stone-50 text-stone-700 hover:text-stone-900 hover:bg-stone-100 
        border border-stone-200 shadow-sm 
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2"
    >
      <Wallet2 className="h-5 w-5 mr-2" />
      Connect Wallet
    </button>
  );
};