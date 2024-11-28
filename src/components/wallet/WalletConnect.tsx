import React from 'react';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { WalletHeader } from './WalletHeader';
import { CustomWalletButton } from './CustomWalletButton';
import { useWalletConnect } from '../../context/WalletConnectContext';

interface WalletConnectProps {
  onConnect?: () => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const { isLoggedIn } = useGetLoginInfo();
  const { closeModal } = useWalletConnect();

  const handleConnect = () => {
    onConnect?.();
    closeModal();
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="space-y-6 w-full max-w-md">
      <WalletHeader />
      
      <div className="space-y-4">
        <CustomWalletButton type="xportal" onLoginRedirect={handleConnect} />
        <CustomWalletButton type="extension" onLoginRedirect={handleConnect} />
        <CustomWalletButton type="web" onLoginRedirect={handleConnect} />
      </div>
    </div>
  );
};