import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
import App from './App';
import { config } from './config/wagmi';

const queryClient = new QueryClient();

const ritualTheme = darkTheme({
  accentColor: '#2d9b5a',
  accentColorForeground: '#f0ede6',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

// Override specific colors for Ritual brand
ritualTheme.colors.modalBackground = '#1a3d2b';
ritualTheme.colors.modalBorder = 'rgba(45, 155, 90, 0.25)';
ritualTheme.colors.profileForeground = '#142e21';
ritualTheme.colors.closeButton = '#f0ede6';
ritualTheme.colors.closeButtonBackground = 'rgba(45, 155, 90, 0.15)';
ritualTheme.colors.generalBorder = 'rgba(45, 155, 90, 0.2)';
ritualTheme.colors.menuItemBackground = 'rgba(45, 155, 90, 0.1)';
ritualTheme.fonts.body = "'Playfair Display', Georgia, serif";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={ritualTheme} modalSize="compact">
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
