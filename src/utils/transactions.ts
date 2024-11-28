import { 
  Address,
  Transaction,
  TransactionWatcher,
  SmartContract,
  AbiRegistry,
  AddressValue,
  BytesValue,
  U64Value,
  TokenTransfer,
} from '@multiversx/sdk-core';
import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { getNetworkProvider } from './contract';
import { contractConfig } from '../config/config';

// Create ABI registry from the contract ABI
const abiRegistry = AbiRegistry.create(contractConfig.abi);

// Initialize smart contract with proper ABI
const contract = new SmartContract({
  address: new Address(contractConfig.address),
  abi: abiRegistry
});

export const buildSetEarnerTransaction = (
  sender: Address,
  earnerAddress: string,
  name: string,
  percentage: number
): Transaction => {
  return contract.methods
    .setEarner([
      new AddressValue(new Address(earnerAddress)),
      BytesValue.fromUTF8(name),
      new U64Value(percentage)
    ])
    .withSender(sender)
    .withValue(0)
    .withGasLimit(60000000)
    .withChainID('1')
    .buildTransaction();
};

export const buildRemoveEarnerTransaction = (
  sender: Address,
  earnerAddress: string
): Transaction => {
  return contract.methods
    .removeEarner([new AddressValue(new Address(earnerAddress))])
    .withSender(sender)
    .withValue(0)
    .withGasLimit(60000000)
    .withChainID('1')
    .buildTransaction();
};

export const buildAddAdminsTransaction = (
  sender: Address,
  adminAddresses: string[]
): Transaction => {
  const addresses = adminAddresses.map(addr => new AddressValue(new Address(addr)));
  
  return contract.methods
    .addAdmins(addresses)
    .withSender(sender)
    .withValue(0)
    .withGasLimit(60000000)
    .withChainID('1')
    .buildTransaction();
};

export const buildRemoveAdminsTransaction = (
  sender: Address,
  adminAddresses: string[]
): Transaction => {
  const addresses = adminAddresses.map(addr => new AddressValue(new Address(addr)));
  
  return contract.methods
    .removeAdmins(addresses)
    .withSender(sender)
    .withValue(0)
    .withGasLimit(60000000)
    .withChainID('1')
    .buildTransaction();
};

export const buildTransferTransaction = (
  sender: Address,
  amount: string,
  tokenIdentifier?: string
): Transaction => {
  const transferMethod = contract.methods.transfer([]);

  if (tokenIdentifier) {
    const transfer = TokenTransfer.fungibleFromAmount(tokenIdentifier, amount, 18);
    return transferMethod
      .withSender(sender)
      .withValue(0)
      .withGasLimit(60000000)
      .withChainID('1')
      .withSingleESDTTransfer(transfer)
      .buildTransaction();
  }

  return transferMethod
    .withSender(sender)
    .withValue(amount)
    .withGasLimit(60000000)
    .withChainID('1')
    .buildTransaction();
};

export const buildShareTransaction = (
  sender: Address,
  tokenIdentifiers: string[]
): Transaction => {
  return contract.methods
    .share(tokenIdentifiers)
    .withSender(sender)
    .withValue(0)
    .withGasLimit(60000000)
    .withChainID('1')
    .buildTransaction();
};

interface TransactionDisplayInfo {
  processingMessage: string;
  errorMessage: string;
  successMessage: string;
}

export const sendTransaction = async (
  transaction: Transaction,
  displayInfo: TransactionDisplayInfo
): Promise<void> => {
  try {
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: displayInfo,
      redirectAfterSign: false
    });

    if (sessionId) {
      const provider = getNetworkProvider();
      const watcher = new TransactionWatcher(provider);
      await watcher.awaitCompleted(sessionId);
    }
  } catch (error: any) {
    console.error('Transaction error:', error);
    throw new Error(error.message || 'Transaction failed');
  }
};