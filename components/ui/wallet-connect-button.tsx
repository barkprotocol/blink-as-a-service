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
      className="bg-gray-900 hover:bg-gray-950 text-gray-50 text-sm px-4 py-2 rounded-md font-syne"
    >
      {connected ? (
        <span>
          {wallet?.adapter.name.split(' ')[0]} Connected
        </span>
      ) : (
        <>
          <WalletIcon className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  );
}