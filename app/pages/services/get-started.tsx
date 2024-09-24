'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Wallet, Code, Zap, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function GetStartedPage() {
  const [activeStep, setActiveStep] = useState(0);

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
            <li>Ensure you have a Solana wallet (e.g., Phantom, Solflare)</li>
            <li>Click the "Connect Wallet" button in the BARK BLINK dashboard</li>
            <li>Select your wallet provider</li>
            <li>Approve the connection request in your wallet</li>
          </ol>
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Wallet connection example"
            width={400}
            height={200}
            className="rounded-lg shadow-md"
          />
          <Button className="mt-4 bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne">
            Connect Wallet
          </Button>
        </div>
      ),
    },
    {
      title: "Create Your First Blink",
      description: "Set up your first blockchain interaction with BARK BLINK.",
      icon: <Zap className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 font-syne">Creating a Blink is easy:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 font-syne">
            <li>Navigate to the "Create Blink" section in your dashboard</li>
            <li>Choose the type of interaction (e.g., payment, NFT minting)</li>
            <li>Set the parameters for your Blink (recipient, amount, etc.)</li>
            <li>Review and confirm your Blink details</li>
            <li>Click "Create Blink" to generate your unique Blink URL</li>
          </ol>
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt="Creating a Blink example"
            width={400}
            height={200}
            className="rounded-lg shadow-md"
          />
          <Button className="mt-4 bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 font-syne">
            Try Creating a Blink
          </Button>
        </div>
      ),
    },
    {
      title: "Integrate BARK BLINK",
      description: "Add BARK BLINK functionality to your projects.",
      icon: <Code className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 font-syne">Integrate BARK BLINK into your application:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 font-syne">
            <li>Obtain your API key from the BARK BLINK dashboard</li>
            <li>Install the BARK BLINK SDK in your project</li>
            <li>Initialize the SDK with your API key</li>
            <li>Use the SDK methods to create and manage Blinks</li>
          </ol>
          <Card>
            <CardHeader>
              <CardTitle className="font-syne">Example Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className="text-sm font-mono">{`
import { BarkBlink } from '@bark-blink/sdk';

const barkBlink = new BarkBlink('YOUR_API_KEY');

// Create a new Blink
const newBlink = await barkBlink.createBlink({
  type: 'payment',
  amount: 1,
  recipient: 'recipient_address'
});

console.log(newBlink.url);
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

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 font-syne">
        Get Started with BARK BLINK
      </h1>
      <p className="text-xl text-gray-600 text-center mb-12 font-syne">
        Follow these simple steps to start using BARK BLINK and revolutionize your blockchain interactions.
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