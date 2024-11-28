'use client'

import React from 'react';
import { Wallet2 } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Wallet2 className="h-8 w-8 text-stone-600" />
      <span className="text-xl font-bold text-stone-900">MultiversX dApp</span>
    </Link>
  );
};