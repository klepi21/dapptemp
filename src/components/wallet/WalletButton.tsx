import React from 'react';

interface WalletButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const WalletButton = ({ onClick, className = '', children }: WalletButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-3 px-4 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
};