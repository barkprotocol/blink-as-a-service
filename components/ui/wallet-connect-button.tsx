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
      className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 text-sm px-4 py-2 rounded-full font-syne"
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