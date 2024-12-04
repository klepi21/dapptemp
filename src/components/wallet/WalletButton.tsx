'use client'

import React from 'react';
import { ExtensionLoginButton, WalletConnectLoginButton, WebWalletLoginButton } from '@multiversx/sdk-dapp/UI';
import { routeNames } from '@/routes';

interface WalletButtonProps {
  name: string;
  description: string;
  type: 'extension' | 'xportal' | 'web';
  onClose: () => void;
}

export const WalletButton = ({ name, description, type, onClose }: WalletButtonProps) => {
  const buttonClass = "w-full p-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-surface-light-hover dark:hover:bg-surface-dark-hover text-left transition-colors";
  
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    onClose: onClose,
    className: buttonClass,
    loginButtonText: name
  };

  const renderButton = () => {
    switch (type) {
      case 'extension':
        return <ExtensionLoginButton {...commonProps} />;
      case 'xportal':
        return <WalletConnectLoginButton {...commonProps} />;
      case 'web':
        return <WebWalletLoginButton {...commonProps} />;
    }
  };

  return (
    <div className={buttonClass}>
      <div className="font-medium text-stone-900 dark:text-white">{name}</div>
      <div className="mt-1 text-sm text-stone-500 dark:text-stone-400">{description}</div>
      {renderButton()}
    </div>
  );
};