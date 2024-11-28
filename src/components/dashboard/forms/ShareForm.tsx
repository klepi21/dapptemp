import React, { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Address } from '@multiversx/sdk-core';
import { buildShareTransaction, sendTransaction } from '../../../utils/transactions';

export const ShareForm = () => {
  const { address: senderAddress } = useGetAccountInfo();
  const [tokens, setTokens] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const tokenList = tokens
        .split('\n')
        .map(token => token.trim())
        .filter(Boolean);

      const transaction = buildShareTransaction(
        new Address(senderAddress),
        tokenList
      );

      await sendTransaction(transaction, {
        processingMessage: 'Processing share...',
        errorMessage: 'An error occurred during share',
        successMessage: 'Share completed successfully'
      });

      setTokens('');
    } catch (err: any) {
      console.error('Error during share:', err);
      setError(err.message || 'Failed to process share');
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
        <label htmlFor="token-identifiers" className="block text-sm font-medium text-stone-700">
          Token Identifiers (one per line)
        </label>
        <textarea
          id="token-identifiers"
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500 sm:text-sm"
          placeholder="WEGLD-bd4d79&#10;MEX-455c57"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing Share...' : 'Share'}
      </button>
    </form>
  );
};