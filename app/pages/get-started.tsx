import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Cog, Zap, Shield } from 'lucide-react'
import Link from 'next/link'
import { syne, poppins } from '../app/fonts'

const StepCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-start space-y-2 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D0BFB4] text-gray-800 transition-transform hover:scale-110">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 font-syne">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default function GetStarted() {
  return (
    <main className={`flex-1 bg-gray-50 ${poppins.variable} ${syne.variable} font-sans`}>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl font-syne">
              Get Started with BARK Blink
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 text-lg sm:text-xl md:text-2xl mt-6">
              Follow these simple steps to integrate BARK Blink into your project and start leveraging the power of blockchain technology.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">Getting Started Steps</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <StepCard
              icon={Code}
              title="1. Install SDK"
              description="Install the BARK Blink SDK using npm or yarn in your project."
            />
            <StepCard
              icon={Cog}
              title="2. Configure"
              description="Set up your BARK Blink configuration with your API keys and preferences."
            />
            <StepCard
              icon={Zap}
              title="3. Integrate"
              description="Use BARK Blink functions in your code to interact with the blockchain."
            />
            <StepCard
              icon={Shield}
              title="4. Test & Deploy"
              description="Test your integration thoroughly and deploy your application."
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 font-syne">Quick Start Guide</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 font-syne mb-4">1. Installation</h3>
              <p className="text-gray-600 mb-4">Install the BARK Blink SDK using npm:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className="text-sm">npm install bark-blink-sdk</code>
              </pre>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 font-syne mb-4">2. Configuration</h3>
              <p className="text-gray-600 mb-4">Initialize the BARK Blink client in your application:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className="text-sm">{`import { BarkBlinkClient } from 'bark-blink-sdk';

const client = new BarkBlinkClient({
  apiKey: 'YOUR_API_KEY',
  network: 'mainnet', // or 'testnet'
});`}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 font-syne mb-4">3. Create a Blink</h3>
              <p className="text-gray-600 mb-4">Use the client to create a new Blink:</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code className="text-sm">{`const newBlink = await client.createBlink({
  recipient: 'RECIPIENT_ADDRESS',
  amount: 1.5, // in SOL
  memo: 'Payment for services',
});

console.log('Blink created:', newBlink.id);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-syne">
              Ready to Start Building?
            </h2>
            <p className="max-w-[700px] text-gray-600 text-lg sm:text-xl md:text-2xl mt-4">
              Dive deeper into our documentation to explore all the features and capabilities of BARK Blink.
            </p>
            <div className="mt-8">
              <Link href="/docs">
                <Button className="bg-[#D0BFB4] hover:bg-[#C0AFA4] text-gray-800 rounded-full px-8 py-3 text-lg font-syne transition-all duration-300 hover:shadow-lg">
                  View Documentation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}