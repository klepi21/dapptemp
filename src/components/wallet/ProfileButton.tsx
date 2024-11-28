import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { clsx } from 'clsx';

export const ProfileButton = () => {
  const { address } = useGetAccountInfo();
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <User className="h-5 w-5 mr-2 text-gray-400" />
        {shortAddress}
        <ChevronDown className="h-5 w-5 ml-2 text-gray-400" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900">Connected Address</p>
            <p className="text-sm font-mono text-gray-500 truncate">{address}</p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => logout()}
                  className={clsx(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center w-full px-4 py-2 text-sm'
                  )}
                >
                  <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-gray-500" />
                  Disconnect
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};