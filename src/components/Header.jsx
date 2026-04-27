import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/ritual-logo.png" alt="Ritual" className="header-logo-img" />
      </div>
      <ConnectButton
        chainStatus="icon"
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
    </header>
  );
};

export default Header;
