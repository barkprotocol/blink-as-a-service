// Add this function for input validation
function validateInput(input: string, type: 'stripe_key' | 'postgres_url'): boolean {
  switch (type) {
    case 'stripe_key':
      return /^sk_test_[a-zA-Z0-9]{24,}$/.test(input);
    case 'postgres_url':
      return /^postgres:\/\/.*$/.test(input);
    default:
      return false;
  }
}

// Modify the getStripeSecretKey function
async function getStripeSecretKey(): Promise<string> {
  console.log('Step 3: Getting Stripe Secret Key');
  console.log(
    'You can find your Stripe Secret Key at: https://dashboard.stripe.com/test/apikeys'
  );
  let stripeKey = '';
  do {
    stripeKey = await question('Enter your Stripe Secret Key: ');
    if (!validateInput(stripeKey, 'stripe_key')) {
      console.log('Invalid Stripe Secret Key format. Please try again.');
    }
  } while (!validateInput(stripeKey, 'stripe_key'));
  return stripeKey;
}

// Add this function for cleanup
async function cleanup() {
  console.log('Cleaning up...');
  try {
    await execAsync('docker compose down');
    console.log('Docker container stopped and removed.');
  } catch (error) {
    console.error('Failed to stop Docker container:', error);
  }
}

// Modify the main function
async function main() {
  try {
    await checkStripeCLI();

    const POSTGRES_URL = await getPostgresURL();
    const STRIPE_SECRET_KEY = await getStripeSecretKey();
    const STRIPE_WEBHOOK_SECRET = await createStripeWebhook();
    const BASE_URL = 'http://localhost:3000';
    const AUTH_SECRET = generateAuthSecret();

    await writeEnvFile({
      BARK_BLINK_POSTGRES_URL: POSTGRES_URL,
      BARK_BLINK_STRIPE_SECRET_KEY: STRIPE_SECRET_KEY,
      BARK_BLINK_STRIPE_WEBHOOK_SECRET: STRIPE_WEBHOOK_SECRET,
      BARK_BLINK_BASE_URL: BASE_URL,
      BARK_BLINK_AUTH_SECRET: AUTH_SECRET,
    });

    console.log('🎉 Setup completed successfully!');
    console.log('⚠️  Warning: Your .env file contains sensitive information. Make sure to keep it secure and never commit it to version control.');
  } catch (error) {
    console.error('An error occurred during setup:', error);
    await cleanup();
  }
}