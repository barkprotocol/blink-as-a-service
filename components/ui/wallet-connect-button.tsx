'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { WalletIcon } from 'lucide-react';

export function WalletConnectButton() {
  const { wallet, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (!wallet) {
      setVisible(true);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-primary hover:bg-primary-foreground text-primary-foreground hover:text-white text-sm px-4 py-2 rounded-md transition duration-200 font-syne flex items-center justify-center space-x-2`}
    >
      {connected ? (
        <span>
          {wallet?.adapter.name.split(' ')[0]} Connected
        </span>
      ) : (
        <>
          <WalletIcon className="h-4 w-4" />
          <span>Connect Wallet</span>
        </>
      )}
    </Button>
  );
}
