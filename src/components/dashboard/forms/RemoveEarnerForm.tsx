import React, { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Address } from '@multiversx/sdk-core';
import { buildRemoveEarnerTransaction, sendTransaction } from '../../../utils/transactions';

export const RemoveEarnerForm = () => {
  const { address: senderAddress } = useGetAccountInfo();
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const transaction = buildRemoveEarnerTransaction(
        new Address(senderAddress),
        address
      );

      await sendTransaction(transaction, {
        processingMessage: 'Removing earner...',
        errorMessage: 'An error occurred while removing the earner',
        successMessage: 'Earner removed successfully'
      });

      setAddress('');
    } catch (err: any) {
      console.error('Error removing earner:', err);
      setError(err.message || 'Failed to remove earner');
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
        <label htmlFor="remove-address" className="block text-sm font-medium text-stone-700">
          Address to Remove
        </label>
        <input
          type="text"
          id="remove-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm"
          placeholder="erd1..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Removing Earner...' : 'Remove Earner'}
      </button>
    </form>
  );
};