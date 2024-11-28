'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletConnectContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const WalletConnectContext = createContext<WalletConnectContextType | undefined>(undefined);

export const WalletConnectProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <WalletConnectContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnect = () => {
  const context = useContext(WalletConnectContext);
  if (context === undefined) {
    throw new Error('useWalletConnect must be used within a WalletConnectProvider');
  }
  return context;
};