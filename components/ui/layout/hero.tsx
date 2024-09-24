'use client'

import { ArrowRight, PlayCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ActionButtonProps {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  variant?: 'default' | 'secondary'
}

const ActionButton = ({ href, icon: Icon, children, variant = 'default' }: ActionButtonProps) => (
  <Button asChild variant={variant} size="lg" className="font-syne">
    <a href={href} className="inline-flex items-center">
      {children}
      <Icon className="ml-2 h-4 w-4" />
    </a>
  </Button>
)

export default function Hero() {
  return (
    <div className="flex-1 bg-gray-50 font-sans">
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
              <ActionButton href="/pages/get-started/" icon={ArrowRight}>
                Get Started
              </ActionButton>
              <ActionButton href="/pages/demo/" icon={PlayCircle} variant="secondary">
                Watch Demo
              </ActionButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}