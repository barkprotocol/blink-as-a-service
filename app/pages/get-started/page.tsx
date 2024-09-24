'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Wallet, Code, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { toast } from '@/hooks/use-toast';

// Mock function to simulate creating a blink
const createBlink = async (type: string, amount: number, recipient: string) => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: Math.random().toString(36).substr(2, 9),
    url: `https://barkblink.com/blink/${Math.random().toString(36).substr(2, 9)}`,
  };
};

export default function GetStartedPage() {
  const [activeStep, setActiveStep] = useState(0);
  const { connected, publicKey, signTransaction } = useWallet();
  const [isCreatingBlink, setIsCreatingBlink] = useState(false);

  const handleConnectWallet = () => {
    if (!connected) {
      toast({
        title: "Wallet Connection Required",
        description: "Please connect your Solana wallet to proceed.",
        variant: "destructive",
      });
    }
  };

  const handleCreateBlink = async () => {
    if (!connected || !publicKey || !signTransaction) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your Solana wallet to create a Blink.",
        variant: "destructive",
      });
      return;
    }

    setIsCreatingBlink(true);
    try {
      const newBlink = await createBlink('payment', 0.1, publicKey.toBase58());
      toast({
        title: "Blink Created Successfully",
        description: `Your new Blink URL: ${newBlink.url}`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error Creating Blink",
        description: "An error occurred while creating your Blink. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreatingBlink(false);
    }
  };

  const steps = [
    {
      title: "Create an Account",
      description: "Sign up for a BARK BLINK account to access our platform.",
      icon: <Wallet className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 font-syne">Follow these steps to create your BARK BLINK account:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 font-syne">
            <li>Visit the BARK BLINK signup page</li>
            <li>Enter your email address and choose a strong password</li>
            <li>Verify your email address</li>
            <li>Complete your profile information</li>
          </ol>
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Account creation example"
            width={400}
            height={200}
            className="rounded-lg shadow-md"
          />
          <Button asChild className="mt-4 bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne">
            <Link href="/sign-up">Create Account</Link>
          </Button>
        </div>
      ),
    },
    {
      title: "Connect Your Wallet",
      description: "Link your Solana wallet to start using BARK BLINK.",
      icon: <Wallet className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 font-syne">To connect your Solana wallet:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 font-syne">
            <li>Ensure you have a Solana wallet (e.g., Phantom, Solflare) installed</li>
            <li>Click the "Connect Wallet" button below</li>
            <li>Select your wallet provider from the list</li>
            <li>Approve the connection request in your wallet</li>
          </ol>
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Wallet connection example"
            width={400}
            height={200}
            className="rounded-lg shadow-md"
          />
          <WalletMultiButton className="!bg-[#D0BFB4] !hover:bg-[#C0AFA4] !text-gray-800 !font-syne" />
          {connected && (
            <p className="text-green-600 font-syne">
              Wallet connected: {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Create Your First Blink",
      description: "Set up your first blockchain interaction with BARK BLINK.",
      icon: <Zap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 font-syne">Creating a Solana Blink is easy:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 font-syne">
            <li>Ensure your Solana wallet is connected</li>
            <li>Choose the type of Blink (e.g., payment, NFT minting, token transfer)</li>
            <li>Set the parameters for your Blink (recipient, amount, token, etc.)</li>
            <li>Review and confirm your Blink details</li>
            <li>Sign the transaction with your Solana wallet</li>
            <li>Your unique Blink URL will be generated</li>
          </ol>
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Creating a Blink example"
            width={400}
            height={200}
            className="rounded-lg shadow-md"
          />
          <Button 
            className="mt-4 bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne"
            onClick={handleCreateBlink}
            disabled={!connected || isCreatingBlink}
          >
            {isCreatingBlink ? 'Creating Blink...' : 'Try Creating a Blink'}
          </Button>
          {!connected && (
            <p className="text-red-500 font-syne">
              <AlertCircle className="inline-block mr-2" />
              Please connect your wallet to create a Blink
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Integrate BARK BLINK",
      description: "Add BARK BLINK functionality to your Solana projects.",
      icon: <Code className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 font-syne">Integrate BARK BLINK into your Solana application:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 font-syne">
            <li>Obtain your API key from the BARK BLINK dashboard</li>
            <li>Install the BARK BLINK SDK and Solana Web3.js in your project</li>
            <li>Initialize the SDK with your API key and Solana connection</li>
            <li>Use the SDK methods to create and manage Solana Blinks</li>
          </ol>
          <Card>
            <CardHeader>
              <CardTitle className="font-syne">Example Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className="text-sm font-mono">{`
import { BarkBlink } from '@bark-blink/sdk';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const barkBlink = new BarkBlink('YOUR_API_KEY', connection);

// Create a new Solana Blink
const newBlink = await barkBlink.createBlink({
  type: 'payment',
  amount: 0.1,
  recipient: new PublicKey('RECIPIENT_ADDRESS'),
  token: 'SOL' // or 'USDC', etc.
});

console.log(newBlink.url);

// Execute a Blink action
const result = await barkBlink.executeBlink(newBlink.id, senderWallet);
console.log('Transaction signature:', result.signature);
                `}</code>
              </pre>
            </CardContent>
          </Card>
          <Button asChild className="mt-4 bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne">
            <Link href="/docs">View Full Documentation</Link>
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (connected) {
      toast({
        title: "Wallet Connected",
        description: "Your Solana wallet is now connected to BARK BLINK.",
        variant: "default",
      });
    }
  }, [connected]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 font-syne">
        Get Started with BARK BLINK
      </h1>
      <p className="text-xl text-gray-600 text-center mb-12 font-syne">
        Follow these simple steps to start using BARK BLINK and revolutionize your Solana blockchain interactions.
      </p>

      <Tabs defaultValue="step-0" className="mb-12">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 gap-2">
          {steps.map((step, index) => (
            <TabsTrigger
              key={index}
              value={`step-${index}`}
              onClick={() => setActiveStep(index)}
              className="data-[state=active]:bg-[#D0BFB4] data-[state=active]:text-gray-900 font-syne"
            >
              {step.icon}
              <span className="ml-2 hidden sm:inline">{step.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {steps.map((step, index) => (
          <TabsContent key={index} value={`step-${index}`}>
            <Card>
              <CardHeader>
                <CardTitle className="font-syne">{step.title}</CardTitle>
                <CardDescription className="font-syne">{step.description}</CardDescription>
              </CardHeader>
              <CardContent>{step.content}</CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          variant="outline"
          className="font-syne"
        >
          Previous
        </Button>
        <Button
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
          className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Card className="mt-16">
        <CardHeader>
          <CardTitle className="font-syne text-center">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className={`w-5 h-5 ${index <= activeStep ? 'text-green-500' : 'text-gray-300'}`} />
                <span className={`font-syne ${index <= activeStep ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 font-syne">Need Help?</h2>
        <p className="text-gray-600 mb-8 font-syne">
          Our support team is always ready to assist you in getting started with BARK BLINK.
        </p>
        <Button asChild variant="outline" className="font-syne">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}