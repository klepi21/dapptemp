import React from 'react';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { mvxConfig } from './config/config';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Tutorial } from './pages/Tutorial';
import { Dashboard } from './pages/Dashboard';
import { WalletSidebar } from './components/wallet/WalletSidebar';
import { WalletConnectProvider } from './context/WalletConnectContext';

function App() {
  return (
    <DappProvider
      environment="mainnet"
      customNetworkConfig={{
        name: 'customConfig',
        apiTimeout: 6000,
        walletConnectV2ProjectId: mvxConfig.walletConnectV2ProjectId,
      }}
    >
      <WalletConnectProvider>
        <Router>
          <div className="min-h-screen bg-stone-50">
            <Navbar />
            <WalletSidebar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </WalletConnectProvider>
    </DappProvider>
  );
}

export default App;