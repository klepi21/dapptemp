'use client'

import React from 'react';
import { Card } from '@/components/ui/Card';
import { TokenList } from '../portfolio/TokenList';

export const Portfolio = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-white">
          Portfolio
        </h1>
      </div>
      <Card>
        <TokenList />
      </Card>
    </div>
  );
};