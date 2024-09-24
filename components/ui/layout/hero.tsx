import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  return (
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
          <ul className="mt-8 space-y-2 text-left">
            <li className="flex items-center">
              <svg className="h-6 w-6 text-[#D0BFB4] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 font-syne">Seamless integration with Solana blockchain</span>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 text-[#D0BFB4] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 font-syne">Instant transactions with minimal fees</span>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 text-[#D0BFB4] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 font-syne">Advanced security measures to protect your assets</span>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 text-[#D0BFB4] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700 font-syne">User-friendly interface for easy blockchain interactions</span>
            </li>
          </ul>
          <p className="mx-auto max-w-[700px] text-gray-600 text-lg sm:text-xl mt-8 font-syne">
            Join the blockchain revolution with BARK BLINK and experience the future of digital transactions today.
          </p>
        </div>
      </div>
    </section>
  )
}