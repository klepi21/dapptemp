import { 
  Address,
  SmartContract,
  AbiRegistry,
  ContractFunction,
  ResultsParser,
  TypedValue
} from '@multiversx/sdk-core';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';
import { contractConfig, mvxConfig } from '../config/config';

let networkProvider: ProxyNetworkProvider | null = null;

// Create ABI registry from the contract ABI
const abiRegistry = AbiRegistry.create(contractConfig.abi);

export const getContract = () => {
  return new SmartContract({
    address: new Address(contractConfig.address),
    abi: abiRegistry
  });
};

export const getNetworkProvider = () => {
  if (!networkProvider) {
    networkProvider = new ProxyNetworkProvider(mvxConfig.apiUrl, {
      timeout: 10000,
    });
  }
  return networkProvider;
};

export const queryContract = async (
  functionName: string,
  args: TypedValue[] = [],
  returnTypes: any[]
) => {
  try {
    const contract = getContract();
    const proxy = getNetworkProvider();

    const query = contract.createQuery({
      func: new ContractFunction(functionName),
      args
    });

    const queryResponse = await proxy.queryContract(query);
    
    if (!queryResponse) {
      throw new Error('No response received from the contract');
    }

    const resultsParser = new ResultsParser();
    const { values } = resultsParser.parseQueryResponse(queryResponse, {
      returnTypes
    });

    return values;
  } catch (error: any) {
    throw new Error(
      `Failed to query contract endpoint '${functionName}': ${error.message || 'Unknown error'}`
    );
  }
};