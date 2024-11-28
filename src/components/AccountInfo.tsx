import React from 'react';
import { useGetAccountInfo, useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { Coins, CreditCard, Database, LogOut } from 'lucide-react';
import { logout } from '@multiversx/sdk-dapp/utils';

export const AccountInfo = () => {
  const { address, account } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Account Details</h2>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Disconnect
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <CreditCard className="w-6 h-6 text-indigo-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="text-sm font-mono break-all">{address}</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Coins className="w-6 h-6 text-indigo-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-lg font-semibold">
              {account.balance / Math.pow(10, 18)} EGLD
            </p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Database className="w-6 h-6 text-indigo-600 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Nonce</p>
            <p className="text-lg font-semibold">{account.nonce}</p>
          </div>
        </div>
      </div>
    </div>
  );
};