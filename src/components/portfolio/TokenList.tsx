import React from 'react';
import { TokenListItem } from './TokenListItem';
import { TokenData } from '@/hooks/useGetTokens';
import { AlertCircle } from 'lucide-react';

interface TokenListProps {
  tokens: TokenData[];
  isLoading: boolean;
  error: Error | null;
}

export const TokenList = ({ tokens, isLoading, error }: TokenListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-stone-600 border-t-transparent" />
          <span className="text-stone-600">Loading tokens...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-start gap-2 text-red-600">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Failed to load tokens</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="text-center p-8 text-stone-600">
        No tokens found in this wallet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-stone-200">
        <thead className="bg-stone-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
              Token
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">
              Balance
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">
              Value (USD)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-stone-200">
          {tokens.map((token) => (
            <TokenListItem key={token.identifier} token={token} />
          ))}
        </tbody>
      </table>
    </div>
  );
};