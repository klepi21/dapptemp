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
};

// Send transaction to smart contract
const tx = contract.methods
  .setEarner([
    new AddressValue(new Address(address)),
    BytesValue.fromUTF8(name),
    new U64Value(percentage)
  ])
  .withSender(sender)
  .withGasLimit(60000000)
  .withChainID('1')
  .buildTransaction();

await sendTransactions({
  transactions: [tx],
  transactionsDisplayInfo: {
    processingMessage: 'Processing...',
    errorMessage: 'An error occurred',
    successMessage: 'Success!'
  }
});`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-8">
        Smart Contract Integration Tutorial
      </h1>
      
      <div className="prose prose-stone max-w-none">
        <h2>Getting Started</h2>
        <p>
          This tutorial will guide you through the process of integrating smart contracts
          in your MultiversX dApp. We'll cover the basics of contract interactions,
          including queries and transactions.
        </p>

        <h3>Setting up the Contract</h3>
        <p>
          First, you'll need your contract's ABI and address. The ABI (Application Binary Interface)
          defines how to interact with the contract.
        </p>

        <div className="my-6 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="typescript"
            style={tomorrow}
            customStyle={{
              borderRadius: '0.5rem',
              padding: '1.5rem',
              margin: 0,
            }}
          >
            {contractExample}
          </SyntaxHighlighter>
        </div>

        <h3>Best Practices</h3>
        <ul>
          <li>Always validate user input before sending transactions</li>
          <li>Handle errors gracefully and provide clear feedback to users</li>
          <li>Use appropriate gas limits for your transactions</li>
          <li>Test thoroughly on devnet before deploying to mainnet</li>
        </ul>
      </div>
    </div>
  );
};