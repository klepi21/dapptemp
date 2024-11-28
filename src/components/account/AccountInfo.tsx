import React from 'react';
import { useGetAccountInfo, useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { AccountHeader } from './AccountHeader';
import { AccountDetails } from './AccountDetails';

export const AccountInfo = () => {
  const { address, account } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
      <AccountHeader />
      <AccountDetails address={address} account={account} />
    </div>
  );
};