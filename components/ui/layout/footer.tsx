"use client";

import Link from 'next/link'
import { Twitter, Send, MessageCircle, Instagram, BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm font-semibold text-gray-700 font-syne">Follow us</p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com/bark_protocol" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </Link>
              <Link href="https://t.me/bark_protocol" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Send className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </Link>
              <Link href="https://discord.gg/barkprotocol" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <MessageCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </Link>
              <Link href="https://www.instagram.com/bark.protocol" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </Link>
              <Link href="https://medium.com/@barkprotocol" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                <BookOpen className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </Link>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link href="/terms-of-use" className="text-sm text-gray-500 hover:text-gray-700 font-syne">
              Terms of Use
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-700 font-syne">
              Privacy Policy
            </Link>
          </div>
          <p className="text-center text-sm text-gray-500 font-syne">
            © {new Date().getFullYear()} BARK Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}