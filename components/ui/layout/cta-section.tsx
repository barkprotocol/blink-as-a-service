import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Clock, Shield } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=600')] bg-center bg-no-repeat opacity-5"></div>
        <div className="relative flex flex-col items-center justify-center space-y-10 text-center">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-syne bg-clip-text text-transparent bg-gradient-to-r from-[#D0BFB4] to-white">
              Supercharge Your Solana Development with BARK Blinks
            </h2>
            <p className="text-xl text-gray-300 md:text-2xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed font-syne">
              Unlock the full potential of Solana's lightning-fast blockchain with our innovative BARK Blinks technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            {[
              { icon: Zap, title: "Instant Transactions", description: "Execute complex operations in milliseconds with our optimized Blinks." },
              { icon: Clock, title: "Rapid Development", description: "Slash development time with our intuitive SDK and pre-built Blink templates." },
              { icon: Shield, title: "Enhanced Security", description: "Build with confidence using our audited and battle-tested Blink infrastructure." },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 p-6 bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <feature.icon className="w-12 h-12 text-[#D0BFB4]" />
                <h3 className="text-xl font-semibold font-syne">{feature.title}</h3>
                <p className="text-gray-400 text-sm font-syne">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/signup" passHref>
              <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 rounded-full px-8 py-3 text-lg font-syne transition-all duration-300 hover:shadow-lg hover:scale-105">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/docs" passHref>
              <Button variant="outline" className="text-[#D0BFB4] hover:bg-[#D0BFB4] hover:text-gray-800 rounded-full px-8 py-3 text-lg font-syne border-[#D0BFB4] transition-all duration-300 hover:shadow-lg">
                Explore Docs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}