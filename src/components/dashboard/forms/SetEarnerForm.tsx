import React, { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Address } from '@multiversx/sdk-core';
import { buildSetEarnerTransaction, sendTransaction } from '../../../utils/transactions';

export const SetEarnerForm = () => {
  const { address: senderAddress } = useGetAccountInfo();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [percentage, setPercentage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const transaction = buildSetEarnerTransaction(
        new Address(senderAddress),
        address,
        name,
        parseInt(percentage)
      );

      await sendTransaction(transaction, {
        processingMessage: 'Setting earner...',
        errorMessage: 'An error occurred while setting the earner',
        successMessage: 'Earner set successfully'
      });

      setAddress('');
      setName('');
      setPercentage('');
    } catch (err: any) {
      console.error('Error setting earner:', err);
      setError(err.message || 'Failed to set earner');
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
        <label htmlFor="address" className="block text-sm font-medium text-stone-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm"
          placeholder="erd1..."
          required
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="percentage" className="block text-sm font-medium text-stone-700">
          Percentage
        </label>
        <input
          type="number"
          id="percentage"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm"
          min="0"
          max="100"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Setting Earner...' : 'Set Earner'}
      </button>
    </form>
  );
};