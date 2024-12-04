'use client'

import React, { createContext, useContext, useState } from 'react';
import { ExtensionLoginButton, WalletConnectLoginButton, WebWalletLoginButton } from '@multiversx/sdk-dapp/UI';
import { routeNames } from '@/routes';

interface WalletConnectContextType {
  isOpen: boolean;
  handleConnect: () => void;
  handleClose: () => void;
}

const WalletConnectContext = createContext<WalletConnectContextType>({
  isOpen: false,
  handleConnect: () => {},
  handleClose: () => {},
});

export const WalletConnectProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const commonProps = {
    callbackRoute: routeNames.dashboard,
    onClose: handleClose,
  };

  return (
    <WalletConnectContext.Provider value={{ isOpen, handleConnect, handleClose }}>
      {children}
    </WalletConnectContext.Provider>
  );
};

export const useWalletConnect = () => useContext(WalletConnectContext);