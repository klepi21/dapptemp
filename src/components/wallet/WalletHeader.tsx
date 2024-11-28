import React from 'react';
import { Wallet2 } from 'lucide-react';

export const WalletHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
        <Wallet2 className="w-8 h-8 text-stone-600" />
      </div>
      <h2 className="text-2xl font-bold text-stone-900">Connect Wallet</h2>
      <p className="text-stone-600 mt-2">Choose your preferred wallet to connect</p>
    </div>
  );
};