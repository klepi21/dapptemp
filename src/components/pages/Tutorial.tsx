'use client'

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Tutorial = () => {
  const contractExample = `// Example smart contract interaction
const contract = new SmartContract({
  address: new Address('erd1...'),
  abi: AbiRegistry.create(contractAbi)
});

// Query smart contract
const queryContract = async () => {
  const query = contract.createQuery({
    func: new ContractFunction('getTokenInfo'),
    args: []
  });
  const queryResponse = await proxy.queryContract(query);
  return queryResponse;
};`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-8">
          Smart Contract Integration Tutorial
        </h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Getting Started</h2>
            <p className="text-stone-600 dark:text-stone-400">
              This tutorial will guide you through the process of integrating smart contracts
              in your MultiversX dApp. We'll cover the basics of contract interactions,
              including queries and transactions.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Setting up the Contract</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4">
              First, you'll need your contract's ABI and address. The ABI (Application Binary Interface)
              defines how to interact with the contract.
            </p>

            <div className="rounded-lg overflow-hidden">
              <SyntaxHighlighter
                language="typescript"
                style={tomorrow}
                customStyle={{
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  margin: 0,
                  background: 'rgb(28 25 23)',
                }}
              >
                {contractExample}
              </SyntaxHighlighter>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Best Practices</h3>
            <ul className="list-disc pl-6 text-stone-600 dark:text-stone-400">
              <li>Always validate user input before sending transactions</li>
              <li>Handle errors gracefully and provide clear feedback to users</li>
              <li>Use appropriate gas limits for your transactions</li>
              <li>Test thoroughly on devnet before deploying to mainnet</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};