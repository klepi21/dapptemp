import React, { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { Address } from '@multiversx/sdk-core';

export const TestTransactionForm = () => {
  const { address } = useGetAccountInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTestTransaction = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { sessionId } = await sendTransactions({
        transactions: [{
          value: '10000000000000000', // 0.01 EGLD
          data: 'test',
          receiver: address,
          gasLimit: 50000
        }],
        transactionsDisplayInfo: {
          processingMessage: 'Processing test transaction...',
          errorMessage: 'Test transaction failed',
          successMessage: 'Test transaction successful'
        },
        redirectAfterSign: false
      });

      console.log('Transaction sent with session ID:', sessionId);
    } catch (err: any) {
      console.error('Test transaction error:', err);
      setError(err.message || 'Failed to send test transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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

      <button
        onClick={handleTestTransaction}
        disabled={isLoading}
        className="inline-flex justify-center rounded-md border border-transparent bg-stone-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Send Test Transaction'}
      </button>
    </div>
  );
};