'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Menu } from 'lucide-react';
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
        <span className={`font-medium transition-opacity duration-300 text-[#D0BFB4] ${isVisible ? 'opacity-100' : 'opacity-50'}`}>
          BLINK
        </span>
      </span>
    </div>
  );
}

export function Navbar() {
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
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <BlinkingLogo />
        </Link>
        <nav className="hidden md:flex items-center justify-center flex-grow">
          <div className="flex space-x-6">
            <Link href="/pages/services/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne">
              Services
            </Link>
            <Link href="/pages/nft/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne">
              NFT
            </Link>
            <Link href="/pages/donations/" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne">
              Donations
            </Link>
          </div>
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
              <Button asChild variant="ghost" className="hidden md:inline-flex font-syne">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 text-sm px-4 py-2 rounded-md font-syne">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <WalletConnectButton />
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden px-4 py-2 bg-gray-50">
          <Link href="/pages/services/" className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne">
            Services
          </Link>
          <Link href="/pages/nft/" className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne">
            NFT
          </Link>
          <Link href="/pages/donations/" className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors font-syne">
            Donations
          </Link>
        </nav>
      )}
    </header>
  );
}