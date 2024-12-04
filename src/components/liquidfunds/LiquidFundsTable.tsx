'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { liquidFunds } from '@/data/liquidFunds';

export const LiquidFundsTable = () => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
        <thead className="bg-surface-light-hover dark:bg-surface-dark-hover">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              24h Change
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              7d Change
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Since Inception
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Assets Under Management
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light dark:divide-border-dark">
          {liquidFunds.map((fund) => (
            <tr 
              key={fund.id} 
              className="hover:bg-surface-light-hover dark:hover:bg-surface-dark-hover cursor-pointer transition-colors"
              onClick={() => router.push(`/liquid-funds/${fund.id}`)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-stone-900 dark:text-white">
                      {fund.name}
                    </span>
                    <div className="flex gap-1">
                      {fund.tokens.map((token) => (
                        <span
                          key={token}
                          className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full bg-stone-100 dark:bg-stone-800 text-primary dark:text-primary-light border border-primary/10"
                        >
                          <Image
                            src={`https://media.elrond.com/tokens/asset/${token}/logo.png`}
                            alt={token}
                            width={16}
                            height={16}
                            className="rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = '/fallback-token-icon.png'
                            }}
                          />
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                    {fund.description}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-stone-900 dark:text-white">
                ${fund.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <span className={fund.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {fund.change24h >= 0 ? '+' : ''}{fund.change24h}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <span className={fund.change7d >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {fund.change7d >= 0 ? '+' : ''}{fund.change7d}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <span className={fund.sinceInception >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {fund.sinceInception >= 0 ? '+' : ''}{fund.sinceInception}%
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-stone-900 dark:text-white">
                ${fund.aum.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 