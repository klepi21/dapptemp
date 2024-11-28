import React from 'react';
import { useGetAdmins } from '../../hooks/useGetAdmins';
import { Shield, AlertCircle } from 'lucide-react';

export const AdminsList = () => {
  const { data: admins, isLoading, error } = useGetAdmins();

  return (
    <div className="bg-white shadow-sm rounded-lg border border-stone-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-stone-200 bg-stone-50">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-stone-600" />
          <h2 className="text-lg font-semibold text-stone-900">Contract Admins</h2>
        </div>
      </div>

      <div className="divide-y divide-stone-200">
        {isLoading ? (
          <div className="px-6 py-4 text-stone-600">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-stone-600 border-t-transparent" />
              <span>Loading admins...</span>
            </div>
          </div>
        ) : error ? (
          <div className="px-6 py-4">
            <div className="flex items-start gap-2 text-red-600">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Failed to load admins</p>
                <p className="text-sm mt-1">{error.message}</p>
              </div>
            </div>
          </div>
        ) : admins?.length === 0 ? (
          <div className="px-6 py-4 text-stone-600">No admins found</div>
        ) : (
          admins?.map((admin, index) => (
            <div key={index} className="px-6 py-4">
              <p className="font-mono text-sm text-stone-600">{admin}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};