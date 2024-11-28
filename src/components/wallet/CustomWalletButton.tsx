import React from 'react';
import { ExtensionLoginButton, WalletConnectLoginButton, WebWalletLoginButton } from '@multiversx/sdk-dapp/UI';
import { Smartphone, Shield, Globe } from 'lucide-react';

interface CustomButtonProps {
  type: 'xportal' | 'extension' | 'web';
  onLoginRedirect?: () => void;
}

export const CustomWalletButton = ({ type, onLoginRedirect }: CustomButtonProps) => {
  const commonProps = {
    callbackRoute: '/',
    nativeAuth: true,
    onLoginRedirect,
    className: 'wallet-button',
  };

  const buttonContent = {
    xportal: {
      icon: <Smartphone className="w-5 h-5" />,
      text: 'xPortal Mobile App',
      component: WalletConnectLoginButton,
    },
    extension: {
      icon: <Shield className="w-5 h-5" />,
      text: 'DeFi Wallet',
      component: ExtensionLoginButton,
    },
    web: {
      icon: <Globe className="w-5 h-5" />,
      text: 'Web Wallet',
      component: WebWalletLoginButton,
    },
  };

  const { icon, text, component: Component } = buttonContent[type];

  return (
    <Component
      {...commonProps}
      loginButtonText={
        <div className="wallet-button-content">
          {icon}
          <span>{text}</span>
        </div>
      }
    />
  );
};