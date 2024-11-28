import React, { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Address } from '@multiversx/sdk-core';
import { buildTransferTransaction, sendTransaction } from '../../../utils/transactions';

export const TransferForm = () => {
  const { address: senderAddress } = useGetAccountInfo();
  const [amount, setAmount] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const value = (parseFloat(amount) * Math.pow(10, 18)).toString();
      const transaction = buildTransferTransaction(
        new Address(senderAddress),
        value,
        tokenId || undefined
      );

      await sendTransaction(transaction, {
        processingMessage: 'Processing transfer...',
        errorMessage: 'An error occurred during transfer',
        successMessage: 'Transfer completed successfully'
      });

      setAmount('');
      setTokenId('');
    } catch (err: any) {
      console.error('Error during transfer:', err);
      setError(err.message || 'Failed to process transfer');
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
        <label htmlFor="amount" className="block text-sm font-medium text-stone-700">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm"
          step="0.0001"
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="tokenId" className="block text-sm font-medium text-stone-700">
          Token ID (optional)
        </label>
        <input
          type="text"
          id="tokenId"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm"
          placeholder="e.g., WEGLD-bd4d79"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing Transfer...' : 'Transfer'}
      </button>
    </form>
  );
};