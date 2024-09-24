'use server';

import { redirect } from 'next/navigation';
import {
  createCheckoutSession,
  createCustomerPortalSession,
} from './stripe';
import { handleSolanaPayment } from './solana';
import { withTeam } from '@/lib/auth/middleware';
import { getUser, updateUserBalance } from '@/lib/db/queries';

export const checkoutAction = withTeam(async (formData, team) => {
  const priceId = formData.get('priceId') as string;
  const paymentMethod = formData.get('paymentMethod') as string;
  const currency = formData.get('currency') as 'SOL' | 'BARK' | 'USDC';
  
  // Validate inputs
  if (!priceId || !paymentMethod || !currency) {
    return redirect('/error?message=Invalid%20input'); // Redirect to error page
  }

  const user = await getUser();

  if (!user) {
    return redirect(`/sign-up?redirect=checkout&priceId=${priceId}`);
  }

  // Handle payment via Stripe
  if (paymentMethod === 'stripe') {
    try {
      await createCheckoutSession({ team, priceId });
    } catch (error) {
      console.error('Stripe checkout session error:', error);
      return redirect('/error?message=Stripe%20checkout%20failed');
    }
  } 
  // Handle payment via Solana
  else if (paymentMethod === 'solana') {
    const amount = await calculateAmount(priceId); // Function to calculate amount based on priceId

    try {
      const result = await handleSolanaPayment(amount, currency);
      if (result.success) {
        // Update user balance based on the currency
        await updateUserBalance(user.id, amount, currency);
        redirect('/success'); // Redirect on successful payment
      } else {
        return redirect('/error?message=Solana%20payment%20failed');
      }
    } catch (error) {
      console.error('Solana payment error:', error);
      return redirect('/error?message=Solana%20payment%20processing%20failed');
    }
  } else {
    return redirect('/error?message=Invalid%20payment%20method'); // Handle invalid payment method
  }
});

export const customerPortalAction = withTeam(async (_, team) => {
  const portalSession = await createCustomerPortalSession(team);
  redirect(portalSession.url);
});

// Function to calculate the amount based on priceId
async function calculateAmount(priceId: string): Promise<number> {
  // Add logic to fetch the price based on priceId from your database or service
  // For demonstration, let's assume the amount is fetched successfully
  const price = await fetchPriceFromDatabase(priceId); // Your logic here
  return price.unitAmount; // Assuming this returns the amount in the smallest currency unit (e.g., cents for USD)
}
