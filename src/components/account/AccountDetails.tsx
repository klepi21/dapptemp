import React from 'react';
import { Coins, CreditCard, Database } from 'lucide-react';
import { AccountDetailItem } from './AccountDetailItem';
import { Account } from '@multiversx/sdk-dapp/types';

interface AccountDetailsProps {
  address: string;
  account: Account;
}

export const AccountDetails = ({ address, account }: AccountDetailsProps) => {
  return (
    <div className="space-y-4">
      <AccountDetailItem
        icon={<CreditCard className="w-6 h-6 text-indigo-600" />}
        label="Address"
        value={address}
        isAddress
      />
      
      <AccountDetailItem
        icon={<Coins className="w-6 h-6 text-indigo-600" />}
        label="Balance"
        value={`${account.balance / Math.pow(10, 18)} EGLD`}
      />
      
      <AccountDetailItem
        icon={<Database className="w-6 h-6 text-indigo-600" />}
        label="Nonce"
        value={account.nonce.toString()}
      />
    </div>
  );
};