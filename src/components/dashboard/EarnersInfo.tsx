import React from 'react';
import { useGetEarnersInfo } from '../../hooks/useGetEarnersInfo';
import { Users } from 'lucide-react';

export const EarnersInfo = () => {
  const { data: earners, isLoading, error } = useGetEarnersInfo();

  return (
    <div className="bg-white shadow-sm rounded-lg border border-stone-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-stone-200 bg-stone-50">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-stone-600" />
          <h2 className="text-lg font-semibold text-stone-900">Earners Information</h2>
        </div>
      </div>

      <div className="divide-y divide-stone-200">
        {isLoading ? (
          <div className="px-6 py-4 text-stone-600">Loading earners information...</div>
        ) : error ? (
          <div className="px-6 py-4 text-red-600">Failed to load earners information</div>
        ) : earners?.length === 0 ? (
          <div className="px-6 py-4 text-stone-600">No earners found</div>
        ) : (
          earners?.map((earner, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-sm text-stone-600">{earner.address}</p>
                  <p className="mt-1 text-sm font-medium text-stone-900">{earner.name}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
                    {earner.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};