import React, { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Address } from '@multiversx/sdk-core';
import { buildAddAdminsTransaction, sendTransaction } from '../../../utils/transactions';

export const AddAdminsForm = () => {
  const { address: senderAddress } = useGetAccountInfo();
  const [addresses, setAddresses] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const addressList = addresses
        .split('\n')
        .map(addr => addr.trim())
        .filter(Boolean);

      const transaction = buildAddAdminsTransaction(
        new Address(senderAddress),
        addressList
      );

      await sendTransaction(transaction, {
        processingMessage: 'Adding admins...',
        errorMessage: 'An error occurred while adding admins',
        successMessage: 'Admins added successfully'
      });

      setAddresses('');
    } catch (err: any) {
      console.error('Error adding admins:', err);
      setError(err.message || 'Failed to add admins');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="admin-addresses" className="block text-sm font-medium text-stone-700">
          Admin Addresses (one per line)
        </label>
        <textarea
          id="admin-addresses"
          value={addresses}
          onChange={(e) => setAddresses(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm"
          placeholder="erd1...&#10;erd1..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Adding Admins...' : 'Add Admins'}
      </button>
    </form>
  );
};