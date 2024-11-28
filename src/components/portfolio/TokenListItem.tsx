import React from 'react';
import { TokenData } from '@/hooks/useGetTokens';
import Image from 'next/image';

interface TokenListItemProps {
  token: TokenData;
}

export const TokenListItem = ({ token }: TokenListItemProps) => {
  const formattedBalance = (Number(token.balance) / Math.pow(10, token.decimals)).toLocaleString(
    undefined,
    { maximumFractionDigits: 4 }
  );

  const formattedPrice = token.price.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
  });

  const formattedValue = token.valueUsd.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <tr className="hover:bg-stone-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {token.icon ? (
            <Image
              src={token.icon}
              alt={token.name}
              width={24}
              height={24}
              className="flex-shrink-0"
            />
          ) : (
            <div className="w-6 h-6 bg-stone-200 rounded-full flex-shrink-0" />
          )}
          <div className="ml-4">
            <div className="text-sm font-medium text-stone-900">
              {token.name}
            </div>
            <div className="text-sm text-stone-500">
              {token.ticker}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-stone-900">
        {formattedBalance}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-stone-900">
        {formattedPrice}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-stone-900">
        {formattedValue}
      </td>
    </tr>
  );
};