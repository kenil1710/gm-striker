import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { ritualChain } from './chain';

export const config = getDefaultConfig({
  appName: 'GM Striker',
  projectId: 'gm-striker-ritual', // WalletConnect project ID placeholder
  chains: [ritualChain],
  ssr: false,
});
