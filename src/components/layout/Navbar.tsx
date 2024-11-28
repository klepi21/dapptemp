'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { WalletConnectButton } from '../wallet/WalletConnectButton';
import { ProfileButton } from '../wallet/ProfileButton';
import { Logo } from './Logo';

export const Navbar = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tutorial', path: '/tutorial' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Logo />
            <div className="hidden sm:flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${pathname === link.path
                      ? 'bg-stone-100 text-stone-900'
                      : 'text-stone-600 hover:text-stone-900'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? <ProfileButton /> : <WalletConnectButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};