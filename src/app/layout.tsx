'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { DappProvider } from '@multiversx/sdk-dapp/wrappers'
import { mvxConfig } from '@/config/config'
import { WalletConnectProvider } from '@/context/WalletConnectContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { Navbar } from '@/components/layout/Navbar'
import { WalletSidebar } from '@/components/wallet/WalletSidebar'
import { MobileFooter } from '@/components/layout/MobileFooter'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { Background } from '@/components/layout/Background'

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-stone-900`}>
        <ThemeProvider>
          <DappProvider
            environment="mainnet"
            customNetworkConfig={{
              name: 'customConfig',
              apiTimeout: 6000,
              walletConnectV2ProjectId: mvxConfig.walletConnectV2ProjectId,
            }}
          >
            <WalletConnectProvider>
              <Background />
              <div className="min-h-screen bg-transparent pb-16 lg:pb-0">
                <Navbar />
                <WalletSidebar />
                <main className="pt-16">
                  <AuthGuard>{children}</AuthGuard>
                </main>
                <MobileFooter />
              </div>
            </WalletConnectProvider>
          </DappProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}