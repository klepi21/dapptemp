'use client'

import React from 'react';
import { useWalletConnect } from '@/context/WalletConnectContext';
import { Card } from '@/components/ui/Card';
import { X } from 'lucide-react';
import { WalletButton } from './WalletButton';

export const WalletSidebar = () => {
  const { isOpen, handleClose } = useWalletConnect();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      <div className="fixed right-0 top-0 h-full w-full max-w-sm z-50">
        <Card className="h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-stone-900 dark:text-white">
              Connect Wallet
            </h2>
            <button 
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="h-5 w-5 text-stone-500 dark:text-stone-400" />
            </button>
          </div>

          <div className="space-y-4">
            <WalletButton
              name="xPortal App"
              description="Scan with xPortal App to connect"
              type="xportal"
              onClose={handleClose}
            />
            <WalletButton
              name="DeFi Wallet"
              description="Connect using MultiversX DeFi Wallet"
              type="extension"
              onClose={handleClose}
            />
            <WalletButton
              name="Web Wallet"
              description="Connect using MultiversX Web Wallet"
              type="web"
              onClose={handleClose}
            />
          </div>
        </Card>
      </div>
    </>
  );
};