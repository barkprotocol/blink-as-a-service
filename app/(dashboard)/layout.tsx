'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircleIcon, Home, LogOut, Menu, LayoutDashboard, Twitter, Send, MessageCircle, Instagram, BookOpen, Plus, Minus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { WalletConnectButton } from '@/components/ui/wallet-connect-button';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';

function BlinkingLogo() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <Image
        src="https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png"
        alt="BARK BLINK Logo"
        width={32}
        height={32}
        className="mr-2"
      />
      <span className="text-xl text-gray-900 font-syne">
        <span className="font-semibold">BARK</span>{' '}
        <span className={`font-medium transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-30'}`}>
          BLINK
        </span>
      </span>
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    try {
      setUser(null);
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally, add error handling UI here
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <BlinkingLogo />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/features"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne"
          >
            Docs
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage src={user.image || undefined} alt={user.name || ''} />
                  <AvatarFallback>
                    {user.name
                      ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase()
                      : user.email.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span className="font-syne">Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-syne">Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hidden md:inline-flex font-syne"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 text-sm px-4 py-2 rounded-full font-syne"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <WalletConnectButton />
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden px-4 py-2 bg-gray-50">
          <Link
            href="/features"
            className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne"
          >
            Docs
          </Link>
        </nav>
      )}
    </header>
  );
}

function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is BARK BLINK?",
      answer: "BARK BLINK is a blockchain-based service that allows for quick and secure transactions using the Solana network. It's designed to streamline blockchain interactions for various use cases such as donations, NFTs, crowdfunding, and payments."
    },
    {
      question: "How do I get started with BARK BLINK?",
      answer: "To get started, sign up for an account, connect your Solana wallet, and explore our features. You can then create your first BLINK for transactions or integrate our API into your application."
    },
    {
      question: "Is BARK BLINK secure?",
      answer: "Yes, BARK BLINK prioritizes security. We use industry-standard encryption and follow best practices for blockchain transactions. However, always exercise caution and follow good security practices when using any blockchain service."
    },
    {
      question: "What are the fees for using BARK BLINK?",
      answer: "BARK BLINK charges minimal fees for transactions. The exact fee structure can be found on our pricing page. Note that Solana network fees also apply to transactions."
    },
    {
      question: "Can I use BARK BLINK for my business?",
      answer: "Yes, BARK BLINK is designed for both individual and business use. We offer API integration and customizable solutions for businesses of all sizes."
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 font-syne">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900 font-syne">{faq.question}</span>
                {openQuestion === index ? (
                  <Minus className="h-5 w-5 text-gray-500" />
                ) : (
                  <Plus className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openQuestion === index && (
                <p className="mt-2 text-gray-600 font-syne">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const endpoint = clusterApiUrl('devnet');
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <FAQ />
            <footer className="bg-white border-t border-gray-200 py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="flex flex-col items-center space-y-2">
                    <p className="text-sm font-medium text-gray-700 font-syne">Follow us</p>
                    <div className="flex space-x-4">
                      <Link href="https://twitter.com/bark_protocol" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      </Link>
                      <Link href="https://t.me/bark_protocol" target="_blank" rel="noopener noreferrer">
                        <Send className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      </Link>
                      <Link href="https://discord.gg/barkprotocol" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      </Link>
                      <Link href="https://www.instagram.com/bark.protocol" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      </Link>
                      <Link href="https://medium.com/@barkprotocol" target="_blank" rel="noopener noreferrer">
                        <BookOpen className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      </Link>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Link href="/terms-of-use" className="text-sm text-gray-600 hover:text-gray-900 font-syne">
                      Terms of Use
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900 font-syne">
                      Privacy Policy
                    </Link>
                  </div>
                  <p className="text-center text-sm text-gray-500 font-syne">
                    © {new Date().getFullYear()} BARK Protocol. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}