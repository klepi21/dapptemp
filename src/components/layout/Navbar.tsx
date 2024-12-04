'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { WalletConnectButton } from '../wallet/WalletConnectButton';
import { ProfileButton } from '../wallet/ProfileButton';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Logo } from './Logo';

export const Navbar = () => {
  const { isLoggedIn } = useGetLoginInfo();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tutorial', path: '/tutorial' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Liquid Funds', path: '/liquid-funds' },
    ...(isLoggedIn ? [{ name: 'Dashboard', path: '/dashboard' }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-surface-light-card dark:bg-surface-dark-card backdrop-blur-xl border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Logo />
            <div className="hidden sm:flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === link.path
                      ? 'bg-primary-light dark:bg-primary/10 text-primary-hover dark:text-primary'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isLoggedIn ? <ProfileButton /> : <WalletConnectButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};