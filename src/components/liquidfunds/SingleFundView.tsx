'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, BarChart, Wallet, DollarSign, Percent, TrendingUp } from 'lucide-react';
import { liquidFunds, LiquidFund } from '@/data/liquidFunds';
import Image from 'next/image';

interface SingleFundViewProps {
  id: string;
}

interface FundHolding {
  token: string;
  identifier: string;
  allocation: number;
  amount: string;
  price: number;
  change24h: number;
  value: number;
  apr: number;
}

export const SingleFundView = ({ id }: SingleFundViewProps) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const fund = liquidFunds.find((f: LiquidFund) => f.id === id);

  if (!fund) return <div>Fund not found</div>;

  const holdings: FundHolding[] = [
    {
      token: 'Hatom',
      identifier: 'HTM-f51d55',
      allocation: 40,
      amount: '2,149.78',
      price: 1.31,
      change24h: 13.64,
      value: 2816.23,
      apr: 42.5
    },
    {
      token: 'AshSwap',
      identifier: 'ASH-a642d1',
      allocation: 35,
      amount: '136,901.98',
      price: 0.01,
      change24h: 6.70,
      value: 1860.98,
      apr: 28.3
    },
    {
      token: 'MEX',
      identifier: 'MEX-455c57',
      allocation: 25,
      amount: '676,208,924.59',
      price: 0.0000061,
      change24h: 5.35,
      value: 4163.08,
      apr: 35.7
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/liquid-funds"
        className="inline-flex items-center text-sm text-stone-400 hover:text-lime-400 mb-8 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Funds
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fund Header */}
          <div className="bg-stone-900/60 backdrop-blur-xl rounded-2xl border border-stone-800 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-white">
                    {fund.name}
                  </h1>
                  <div className="flex gap-1.5">
                    {fund.tokens.map((token: string) => (
                      <span
                        key={token}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-stone-800/80 text-lime-400 border border-lime-400/20"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-stone-400 max-w-2xl">
                  {fund.description}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className={`text-2xl font-bold ${fund.change24h >= 0 ? 'text-lime-400' : 'text-red-400'}`}>
                  {fund.change24h >= 0 ? '+' : ''}{fund.change24h}%
                </div>
                <div className="text-sm text-stone-400">24h Change</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Price', value: `$${fund.price.toFixed(2)}`, icon: DollarSign, trend: '+2.5%' },
              { label: 'Average APR', value: '14%', icon: TrendingUp, trend: '+0.5%' },
              { label: 'TVL', value: '$8.8M', icon: BarChart, trend: '+1.2%' },
              { label: 'Volume 24H', value: '$1.2M', icon: BarChart, trend: '+5.4%' },
            ].map((stat) => (
              <div key={stat.label} className="bg-stone-900/60 backdrop-blur-xl rounded-2xl border border-stone-800 p-4">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <stat.icon className="h-4 w-4 text-lime-400" />
                    <span className="text-xs">{stat.label}</span>
                  </div>
                  <span className="text-xs text-lime-400">{stat.trend}</span>
                </div>
                <div className="text-xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Holdings Table */}
          <div className="bg-stone-900/60 backdrop-blur-xl rounded-2xl border border-stone-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-800">
              <h3 className="text-lg font-semibold text-white">Fund Holdings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-stone-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-stone-400 uppercase tracking-wider">Allocation</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-stone-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-stone-400 uppercase tracking-wider">24h</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-stone-400 uppercase tracking-wider">APR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {holdings.map((holding) => (
                    <tr key={holding.identifier} className="hover:bg-stone-800/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`https://media.elrond.com/tokens/asset/${holding.identifier}/logo.png`}
                            alt={holding.token}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-medium text-white">{holding.token}</div>
                            <div className="text-xs text-stone-400">{holding.identifier}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-white">
                        {holding.allocation}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-white">
                        ${holding.price.toFixed(holding.price < 0.01 ? 8 : 2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={holding.change24h >= 0 ? 'text-lime-400' : 'text-red-400'}>
                          {holding.change24h >= 0 ? '+' : ''}{holding.change24h}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-lime-400">{holding.apr}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Buy/Sell Panel - Right Side */}
        <div className="bg-stone-900/60 backdrop-blur-xl rounded-2xl border border-stone-800">
          <div className="flex border-b border-stone-800">
            {['buy', 'sell'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'buy' | 'sell')}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-lime-400 border-b-2 border-lime-400'
                    : 'text-stone-400 hover:text-stone-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="text-sm font-medium text-stone-400 mb-2">
                {activeTab === 'buy' ? 'YOU PAY' : 'YOU SELL'}
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-800 rounded-xl">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://media.elrond.com/tokens/asset/USDC-c76f1f/logo.png"
                    alt="USDC"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium text-white">USDC</span>
                </div>
                <input
                  type="number"
                  className="w-24 text-right bg-transparent border-none focus:outline-none text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-stone-400 mb-2">
                YOU RECEIVE
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-800 rounded-xl">
                <span className="text-sm text-stone-400">Shares</span>
                <span className="text-sm font-medium text-white">10.00</span>
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-lime-500 hover:bg-lime-600 text-stone-900 font-medium rounded-xl transition-colors">
              {activeTab === 'buy' ? 'Buy' : 'Sell'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 