import { useEffect, useState } from 'react';
import { queryContract } from '../utils/contract';

interface Earner {
  address: string;
  name: string;
  percentage: number;
}

export const useGetEarnersInfo = () => {
  const [data, setData] = useState<Earner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchEarnersInfo = async () => {
      try {
        const values = await queryContract(
          'getEarnersInfo',
          [],
          [{ type: 'variadic', items: { type: 'multi', items: ['Address', 'bytes', 'u64'] } }]
        );

        if (!mounted) return;

        if (!Array.isArray(values?.[0])) {
          throw new Error('Invalid response format from contract');
        }

        const earners = values[0].map((value: any) => ({
          address: value[0].toString(),
          name: new TextDecoder().decode(value[1]),
          percentage: Number(value[2])
        }));

        setData(earners);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching earners:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchEarnersInfo();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
};