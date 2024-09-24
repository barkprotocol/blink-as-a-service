'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';

export interface Blink {
  id: string;
  amount: number;
  recipient: string;
  memo?: string;
  status: 'pending' | 'completed' | 'failed';
}

interface BlinkCreatorProps {
  onBlinkCreated: (blink: Blink) => void;
}

export const BlinkCreator: React.FC<BlinkCreatorProps> = ({ onBlinkCreated }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [memo, setMemo] = useState('');
  const { publicKey, sendTransaction } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!publicKey) {
      alert('Please connect your wallet');
      return;
    }

    try {
      const recipientPubkey = new web3.PublicKey(recipient);
      const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: web3.LAMPORTS_PER_SOL * parseFloat(amount),
        })
      );

      if (memo) {
        transaction.add(
          new web3.TransactionInstruction({
            keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
            data: Buffer.from(memo, 'utf-8'),
            programId: new web3.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
          })
        );
      }

      const signature = await sendTransaction(transaction, web3.clusterApiUrl('devnet'));
      
      const newBlink: Blink = {
        id: signature,
        amount: parseFloat(amount),
        recipient,
        memo,
        status: 'pending',
      };

      onBlinkCreated(newBlink);

      setAmount('');
      setRecipient('');
      setMemo('');
    } catch (error) {
      console.error('Error creating blink:', error);
      alert('Failed to create blink. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount (SOL)
        </label>
        <Input
          id="amount"
          type="number"
          step="0.000000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
          Recipient Address
        </label>
        <Input
          id="recipient"
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="memo" className="block text-sm font-medium text-gray-700">
          Memo (optional)
        </label>
        <Input
          id="memo"
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full">
        Create Blink
      </Button>
    </form>
  );
};