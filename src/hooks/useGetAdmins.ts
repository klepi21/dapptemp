import { useEffect, useState } from 'react';
import { queryContract } from '../utils/contract';

export const useGetAdmins = () => {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAdmins = async () => {
      try {
        const values = await queryContract(
          'getAdmins',
          [],
          [{ type: 'variadic', items: 'Address' }]
        );

        if (!mounted) return;

        if (!Array.isArray(values?.[0])) {
          throw new Error('Invalid response format from contract');
        }

        const admins = values[0].map((address: any) => {
          if (!address?.toString) {
            throw new Error('Invalid address format in response');
          }
          return address.toString();
        });

        setData(admins);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching admins:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAdmins();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, isLoading, error };
};