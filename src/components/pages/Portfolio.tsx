'use client'

import React from 'react';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetTokens } from '@/hooks/useGetTokens';
import { TokenList } from '../portfolio/TokenList';

export const Portfolio = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const { tokens, isLoading, error } = useGetTokens();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Portfolio</h1>
      
      <div className="bg-white shadow-sm rounded-lg border border-stone-200 overflow-hidden">
        <TokenList tokens={tokens} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};