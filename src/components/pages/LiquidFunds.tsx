'use client'

import React from 'react';
import { Search } from 'lucide-react';
import { LiquidFundsTable } from '@/components/liquidfunds/LiquidFundsTable';
import { Card } from '@/components/ui/Card';

export const LiquidFunds = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
          Liquid Funds
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type="text"
            placeholder="Filter liquid funds..."
            className="pl-10 pr-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-surface-light-card dark:bg-surface-dark-card text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary"
          />
        </div>
      </div>
      <Card>
        <LiquidFundsTable />
      </Card>
    </div>
  );
}; 