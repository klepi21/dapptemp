import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { useWalletConnect } from '../../context/WalletConnectContext';

export const WalletSidebar = () => {
  const { isOpen, closeModal } = useWalletConnect();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-6 pt-6 pb-4">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-2xl font-semibold text-stone-900">
                          Connect Wallet
                        </Dialog.Title>
                        <button
                          onClick={closeModal}
                          className="rounded-lg p-2 text-stone-400 hover:text-stone-500 hover:bg-stone-100 transition-colors"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <WalletConnect onConnect={closeModal} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};