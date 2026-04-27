import React, { useState, useEffect, useCallback } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import Header from './components/Header';
import Hero from './components/Hero';
import GMButton from './components/GMButton';
import StatsCards from './components/StatsCards';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { ritualChain } from './config/chain';

function App() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [toast, setToast] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Auto-switch to Ritual Chain on connect
  useEffect(() => {
    if (isConnected && chainId !== ritualChain.id) {
      setToast('Switching to Ritual Chain…');
      try {
        switchChain({ chainId: ritualChain.id });
      } catch (err) {
        console.error('Chain switch failed:', err);
      }
    }
  }, [isConnected, chainId]);

  // Clear toast when chain is correct
  useEffect(() => {
    if (chainId === ritualChain.id && toast) {
      const timer = setTimeout(() => setToast(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [chainId, toast]);

  const handleGMSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <div className="app-container">
      {toast && (
        <Toast message={toast} duration={3500} onClose={() => setToast(null)} />
      )}
      <Header />
      <main className="main-content">
        <Hero />
        <GMButton isConnected={isConnected} onSuccess={handleGMSuccess} />
        <StatsCards refreshTrigger={refreshTrigger} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
