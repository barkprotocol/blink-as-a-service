'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, PlayCircle, PlusCircle, Cog, Shield, Send, Clock, CreditCard, Gift, Users, ShoppingCart, Speaker, Globe } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const DynamicBlinkCreator = dynamic(() => import('@/components/blink/blink-creator').then((mod) => mod.BlinkCreator), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false,
});

const DynamicBlinkList = dynamic(() => import('@/components/blink/blink-list').then((mod) => mod.BlinkList), {
  loading: () => <Skeleton className="h-[200px] w-full" />,
  ssr: false,
});

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D0BFB4] text-gray-800 transition-transform hover:scale-110">
    {children}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string; }) => (
  <div className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <IconWrapper>
      <Icon className="h-6 w-6" aria-hidden="true" />
    </IconWrapper>
    <h3 className="text-xl font-bold text-gray-900 font-syne">{title}</h3>
    <p className="text-gray-600 font-syne">{description}</p>
  </div>
);

const ProcessStep = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string; }) => (
  <div className="flex flex-col items-center text-center">
    <IconWrapper>
      <Icon className="h-6 w-6" aria-hidden="true" />
    </IconWrapper>
    <h3 className="mt-4 text-xl font-bold text-gray-900 font-syne">{title}</h3>
    <p className="mt-2 text-gray-600 font-syne">{description}</p>
  </div>
);

const ActionButton = ({ href, children, icon: Icon, variant = 'primary' }: { href: string; children: React.ReactNode; icon: React.ElementType; variant?: 'primary' | 'secondary' }) => (
  <Link href={href}>
    <Button 
      className={`rounded-md px-8 py-3 text-lg font-syne w-full sm:w-auto transition-all duration-300 border-2 ${
        variant === 'primary' 
          ? 'bg-gray-900 text-white hover:bg-gray-800 border-gray-900' 
          : 'bg-[#D0BFB4] text-gray-900 hover:bg-[#C0AFA4] border-[#D0BFB4]'
      }`}
    >
      {children}
      <Icon className="ml-2 h-5 w-5" aria-hidden="true" />
    </Button>
  </Link>
);

export default function HomePage() {
  const [blinks, setBlinks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { connected } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlinks = async () => {
      if (!connected) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch('/api/blinks');
        const data = await response.json();
        setBlinks(data);
      } catch (error) {
        console.error('Error fetching blinks:', error);
        toast({
          title: "Error",
          description: "Failed to fetch blinks. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlinks();
  }, [connected, toast]);

  const handleBlinkCreated = (newBlink: any) => {
    setBlinks((prevBlinks) => [...prevBlinks, newBlink]);
    toast({
      title: "Success",
      description: "New Blink created successfully!",
    });
  };

  return (
    <div className="flex-1 bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Badge variant="secondary" className="mb-4">
              BARK Protocol
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-syne">
              Blink As A Service
              <span className="block text-[#D0BFB4] mt-2">Revolutionizing Blockchain Interactions</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 text-lg sm:text-xl md:text-2xl mt-6 font-syne">
             BARK BLINK is a cutting-edge blockchain platform that transforms the way you handle digital transactions. We empower businesses and individuals with lightning-fast, secure, and cost-effective blockchain solutions.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <ActionButton href="/pages/get-started" icon={ArrowRight}>
                Get Started
              </ActionButton>
              <ActionButton href="/pages/demo/" icon={PlayCircle} variant="secondary">
                Watch Demo
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 font-syne">
            What is Solana Blink?
          </h2>
          <p className="text-lg text-gray-700 text-center mb-4 font-syne">
            Solana Blink revolutionizes blockchain interactions by allowing users to engage seamlessly through simple URLs. Whether on social media or Discord, it opens up new opportunities for developers and enhances user experience across the Solana ecosystem.
          </p>
        </div>
      </section>

      {/* Create Blink Process Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">
            Create Blink Process
          </h2>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            <ProcessStep
              icon={PlusCircle}
              title="1. Initialize"
              description="Start by creating a new Blink instance, specifying the desired blockchain and action type."
            />
            <ProcessStep
              icon={Cog}
              title="2. Configure"
              description="Set the necessary parameters for your Blink, such as recipient address, amount, or smart contract interactions."
            />
            <ProcessStep
              icon={Shield}
              title="3. Secure"
              description="Our system automatically secures and validates the Blink to ensure compliance and prevent errors."
            />
            <ProcessStep
              icon={Send}
              title="4. Execute"
              description="Trigger the execution of your Blink, which is then processed on the specified blockchain."
            />
            <ProcessStep
              icon={Clock}
              title="5. Monitor"
              description="Track the status of your Blink in real-time and receive confirmation upon successful execution."
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">
            Solana Actions and Blinks Use Cases
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={CreditCard}
              title="Micro-Payments"
              description="Enable seamless, low-cost micro-transactions for content creators, digital services, and more."
            />
            <FeatureCard
              icon={Gift}
              title="Donations"
              description="Facilitate instant, transparent donations for charitable organizations and individuals."
            />
            <FeatureCard
              icon={Users}
              title="Crowdfunding"
              description="Launch campaigns that enable users to support new projects and innovations."
            />
            <FeatureCard
              icon={ShoppingCart}
              title="E-Commerce"
              description="Integrate blockchain payments into e-commerce platforms for improved transparency and security."
            />
            <FeatureCard
              icon={Speaker}
              title="Marketing Campaigns"
              description="Leverage blinks for targeted marketing campaigns and audience engagement."
            />
            <FeatureCard
              icon={Globe}
              title="Global Access"
              description="Expand access to blockchain-based services worldwide, regardless of geography."
            />
          </div>
        </div>
      </section>

      {/* Blink Creator Section */}
      {connected && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">
              Create Your Blink
            </h2>
            {isLoading ? (
              <div className="flex justify-center">
                <Skeleton className="h-[200px] w-full max-w-md" />
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <DynamicBlinkCreator onBlinkCreated={handleBlinkCreated} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Blink List Section */}
      {connected && (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">
              Your Blinks
            </h2>
            {isLoading ? (
              <div className="flex justify-center">
                <Skeleton className="h-[200px] w-full" />
              </div>
            ) : blinks.length > 0 ? (
              <DynamicBlinkList blinks={blinks} />
            ) : (
              <p className="text-center text-gray-600 font-syne">No blinks created yet. Start by creating a new Blink above!</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}