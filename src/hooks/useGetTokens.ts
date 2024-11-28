import { useEffect, useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { mvxConfig } from '../config/config';

export interface TokenData {
  identifier: string;
  name: string;
  ticker: string;
  balance: string;
  decimals: number;
  price: number;
  valueUsd: number;
  icon?: string;
}

export const useGetTokens = () => {
  const { address } = useGetAccountInfo();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!address) return;

      try {
        // Fetch tokens
        const response = await fetch(
          `${mvxConfig.apiUrl}/accounts/${address}/tokens?size=100`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch tokens');
        }

        const data = await response.json();

        // Transform the data
        const transformedTokens = data.map((token: any) => ({
          identifier: token.identifier,
          name: token.name,
          ticker: token.ticker,
          balance: token.balance,
          decimals: token.decimals,
          price: token.price || 0,
          valueUsd: (Number(token.balance) / Math.pow(10, token.decimals)) * (token.price || 0),
          icon: token.assets?.svgUrl || token.assets?.pngUrl
        }));

        setTokens(transformedTokens);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching tokens:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch tokens'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [address]);

  return { tokens, isLoading, error };
};