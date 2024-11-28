import React from 'react';
import { useGetLoginInfo } from '@multiversx/sdk-dapp/hooks';
import { Navigate } from 'react-router-dom';
import { EarnersInfo } from '../components/dashboard/EarnersInfo';
import { AdminsList } from '../components/dashboard/AdminsList';
import { SetEarnerForm } from '../components/dashboard/forms/SetEarnerForm';
import { RemoveEarnerForm } from '../components/dashboard/forms/RemoveEarnerForm';
import { AddAdminsForm } from '../components/dashboard/forms/AddAdminsForm';
import { RemoveAdminsForm } from '../components/dashboard/forms/RemoveAdminsForm';
import { TransferForm } from '../components/dashboard/forms/TransferForm';
import { ShareForm } from '../components/dashboard/forms/ShareForm';
import { TestTransactionForm } from '../components/dashboard/forms/TestTransactionForm';

export const Dashboard = () => {
  const { isLoggedIn } = useGetLoginInfo();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">QuantumX Fees Dashboard</h1>
      
      <div className="mb-8 p-6 bg-white shadow-sm rounded-lg border border-stone-200">
        <h2 className="text-xl font-semibold text-stone-900 mb-4">Test Transaction</h2>
        <p className="text-stone-600 mb-4">
          Send a test transaction to verify your wallet connection is working properly.
        </p>
        <TestTransactionForm />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* View Section */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">Current Status</h2>
            <div className="space-y-6">
              <EarnersInfo />
              <AdminsList />
            </div>
          </section>
        </div>

        {/* Actions Section */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">Manage Earners</h2>
            <div className="bg-white shadow-sm rounded-lg border border-stone-200 divide-y divide-stone-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-stone-900 mb-4">Set Earner</h3>
                <SetEarnerForm />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-stone-900 mb-4">Remove Earner</h3>
                <RemoveEarnerForm />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900 mb-4">Transfer & Share</h2>
            <div className="bg-white shadow-sm rounded-lg border border-stone-200 divide-y divide-stone-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-stone-900 mb-4">Transfer EGLD/ESDT</h3>
                <TransferForm />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-stone-900 mb-4">Share Tokens</h3>
                <ShareForm />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};