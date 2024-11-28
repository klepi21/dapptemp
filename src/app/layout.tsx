'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { DappProvider } from '@multiversx/sdk-dapp/wrappers'
import { mvxConfig } from '@/config/config'
import { WalletConnectProvider } from '@/context/WalletConnectContext'
import { Navbar } from '@/components/layout/Navbar'
import { WalletSidebar } from '@/components/wallet/WalletSidebar'
import { AuthGuard } from '@/components/auth/AuthGuard'

const inter = Inter({ subsets: ['latin'] })

if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || require('buffer').Buffer;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DappProvider
          environment="mainnet"
          customNetworkConfig={{
            name: 'customConfig',
            apiTimeout: 6000,
            walletConnectV2ProjectId: mvxConfig.walletConnectV2ProjectId,
          }}
        >
          <WalletConnectProvider>
            <div className="min-h-screen bg-stone-50">
              <Navbar />
              <WalletSidebar />
              <main className="pt-16">
                <AuthGuard>{children}</AuthGuard>
              </main>
            </div>
          </WalletConnectProvider>
        </DappProvider>
      </body>
    </html>
  )
}