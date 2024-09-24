import { NextApiRequest, NextApiResponse } from 'next';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { createTransaction, getPaymentLink } from '@solana/pay';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = new Connection(clusterApiUrl('mainnet-beta'));
  const { amount, recipient } = req.body;

  try {
    const paymentLink = await getPaymentLink(connection, {
      recipient,
      amount,
      currency: 'SOL',
    });

    res.status(200).json({ paymentLink });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed.' });
  }
}
