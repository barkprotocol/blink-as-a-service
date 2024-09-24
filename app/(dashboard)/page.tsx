'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Layers, Shield, Code, Coins, Clock, Users, Globe, Lock, CreditCard, Gift, Users as UsersIcon, Repeat, ArrowLeftRight, Workflow, PlusCircle, Cog, Send, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { BlinkCreator, Blink } from '@/components/blink/blink-creator';
import { BlinkList } from '@/components/blink/blink-list';

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D0BFB4] text-gray-800 transition-transform hover:scale-110">
    {children}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <IconWrapper>
      <Icon className="h-6 w-6" />
    </IconWrapper>
    <h3 className="text-xl font-bold text-gray-900 font-syne">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const UseCaseCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-start space-y-2 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <IconWrapper>
      <Icon className="h-6 w-6" />
    </IconWrapper>
    <h3 className="text-xl font-bold text-gray-900 font-syne">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ProcessStep = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <IconWrapper>
      <Icon className="h-6 w-6" />
    </IconWrapper>
    <div>
      <h3 className="text-lg font-bold text-gray-900 font-syne">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function HomePage() {
  const [blinks, setBlinks] = useState<Blink[]>([]);
  const { connected } = useWallet();

  const handleBlinkCreated = (newBlink: Blink) => {
    setBlinks((prevBlinks) => [...prevBlinks, newBlink]);
  };

  return (
    <main className="flex-1 bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-syne">
                BARK Blink As A Service
                <span className="block text-[#D0BFB4] mt-2">Streamline Your Blockchain Interactions</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 text-lg sm:text-xl md:text-2xl mt-6">
                Empower your applications with seamless blockchain integration. BARK Blink offers a powerful suite of tools for efficient and secure blockchain transactions.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pages/get-started">
                <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 rounded-full px-8 py-3 text-lg font-syne w-full sm:w-auto transition-all duration-300 hover:shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pages/demo">
                <Button variant="outline" className="rounded-full px-8 py-3 text-lg font-syne w-full sm:w-auto transition-all duration-300 hover:bg-gray-100">
                  Watch Demo
                  <PlayCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blink Creator Section */}
      {connected && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-syne">Create a Blink</h2>
            <div className="max-w-md mx-auto">
              <BlinkCreator onBlinkCreated={handleBlinkCreated} />
            </div>
          </div>
        </section>
      )}

      {/* Blink List Section */}
      {connected && blinks.length > 0 && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <BlinkList blinks={blinks} />
          </div>
        </section>
      )}

      {/* Key Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={Zap}
              title="Lightning-Fast Transactions"
              description="Experience blazing-fast blockchain transactions with our optimized infrastructure."
            />
            <FeatureCard
              icon={Layers}
              title="Multi-Chain Support"
              description="Seamlessly interact with multiple blockchain networks through a single, unified API."
            />
            <FeatureCard
              icon={Shield}
              title="Enhanced Security"
              description="Benefit from our robust security measures to protect your transactions and data."
            />
            <FeatureCard
              icon={Code}
              title="Developer-Friendly SDKs"
              description="Integrate blockchain functionality effortlessly with our comprehensive SDKs."
            />
            <FeatureCard
              icon={Coins}
              title="Multi-Currency Support"
              description="Support for a wide range of cryptocurrencies and tokens across various chains."
            />
            <FeatureCard
              icon={Clock}
              title="Real-Time Monitoring"
              description="Stay informed with real-time transaction monitoring and instant alerts."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <IconWrapper>
                <Code className="h-6 w-6" />
              </IconWrapper>
              <h3 className="mt-4 text-xl font-bold text-gray-900 font-syne">1. Integrate</h3>
              <p className="mt-2 text-gray-600">Easily integrate BARK Blink into your application using our SDKs and APIs.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <IconWrapper>
                <Workflow className="h-6 w-6" />
              </IconWrapper>
              <h3 className="mt-4 text-xl font-bold text-gray-900 font-syne">2. Configure</h3>
              <p className="mt-2 text-gray-600">Set up your desired blockchain interactions and customize parameters.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <IconWrapper>
                <Zap className="h-6 w-6" />
              </IconWrapper>
              <h3 className="mt-4 text-xl font-bold text-gray-900 font-syne">3. Execute</h3>
              <p className="mt-2 text-gray-600">Trigger blockchain actions seamlessly within your application flow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Create Blink Process Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">Create Blink Process</h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            <ProcessStep
              icon={PlusCircle}
              title="1. Initialize Blink"
              description="Start by creating a new Blink instance, specifying the desired blockchain and action type."
            />
            <ProcessStep
              icon={Cog}
              title="2. Configure Parameters"
              description="Set the necessary parameters for your Blink, such as recipient address, amount, or smart contract interactions."
            />
            <ProcessStep
              icon={Shield}
              title="3. Secure and Validate"
              description="Our system automatically secures and validates the Blink to ensure compliance and prevent errors."
            />
            <ProcessStep
              icon={Send}
              title="4. Execute Blink"
              description="Trigger the execution of your Blink, which is then processed on the specified blockchain."
            />
            <ProcessStep
              icon={Clock}
              title="5. Monitor and Confirm"
              description="Track the status of your Blink in real-time and receive confirmation upon successful execution."
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">Solana Actions and Blinks Use Cases</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <UseCaseCard
              icon={CreditCard}
              title="Micro-Payments"
              description="Enable seamless, low-cost micro-transactions for content creators, digital services, and more."
            />
            <UseCaseCard
              icon={Gift}
              title="Donations"
              description="Facilitate instant, transparent donations for charitable organizations and individuals."
            />
            <UseCaseCard
              icon={UsersIcon}
              title="Crowdfunding"
              description="Launch and manage decentralized crowdfunding campaigns with real-time fund tracking."
            />
            <UseCaseCard
              icon={Repeat}
              title="Token Swaps"
              description="Provide instant, low-fee token swaps across multiple Solana-based assets."
            />
            <UseCaseCard
              icon={ArrowLeftRight}
              title="Cross-Chain Transactions"
              description="Enable seamless transactions between Solana and other supported blockchain networks."
            />
            <UseCaseCard
              icon={Zap}
              title="Instant Settlements"
              description="Leverage Solana's speed for near-instantaneous settlement in various financial applications."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">About BARK Blink</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <IconWrapper>
                <Users className="h-6 w-6" />
              </IconWrapper>
              <h3 className="mt-4 text-xl font-bold text-gray-900 font-syne">Community-Driven</h3>
              <p className="mt-2 text-gray-600">A collaborative effort by blockchain enthusiasts and developers passionate about decentralization.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <IconWrapper>
                <Globe className="h-6 w-6" />
              </IconWrapper>
              <h3 className="mt-4 text-xl font-bold text-gray-900 font-syne">Our Vision</h3>
              <p className="mt-2 text-gray-600">To create an open, accessible platform that empowers developers to build innovative blockchain solutions.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <IconWrapper>
                <Lock className="h-6 w-6" />
              </IconWrapper>
              <h3 className="mt-4 text-xl font-bold text-gray-900 font-syne">Open Source</h3>
              <p className="mt-2 text-gray-600">Committed to transparency and collaboration, with all code and development open to the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-syne">
                Ready to Revolutionize Your Blockchain Integration?
              </h2>
              <p className="max-w-[900px] text-gray-400 text-lg sm:text-xl md:text-2xl mt-4">
                Join the growing community of developers and businesses leveraging BARK Blink to create cutting-edge blockchain applications.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/signup">
                <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 rounded-full px-8 py-3 text-lg font-syne transition-all duration-300 hover:shadow-lg">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}