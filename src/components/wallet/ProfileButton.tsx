'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { Card } from '@/components/ui/Card';
import { LogOut, User, ChevronDown } from 'lucide-react';

export const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { address } = useGetAccountInfo();
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-light-hover dark:bg-surface-dark-hover text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      >
        <User className="h-4 w-4" />
        <span className="text-sm font-medium">{shortAddress}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 z-50">
          <Card className="p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 p-2 text-sm text-red-600 dark:text-red-400 hover:bg-surface-light-hover dark:hover:bg-surface-dark-hover rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </button>
          </Card>
        </div>
      )}
    </div>
  );
};