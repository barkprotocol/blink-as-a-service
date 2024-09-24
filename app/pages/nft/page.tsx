'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, PenTool, Gift, ImageIcon, Repeat, Coins } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

const SOLANA_NETWORK = 'devnet'
const SOLANA_RPC_URL = 'https://api.devnet.solana.com'

// Solana blockchain functions
const MintNFT = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return 'solana-transaction-id'
}

export default function NFTDashboardPage() {
  const [activeTab, setActiveTab] = useState('mint')
  const [isLoading, setIsLoading] = useState(false)
  const wallet = useWallet()
  const { toast } = useToast()
  const router = useRouter()

  const handleAction = async (action: string) => {
    if (!wallet.connected || !wallet.publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first!",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const connection = new Connection(SOLANA_RPC_URL, 'confirmed')
      switch (action) {
        case 'Mint':
          const txId = await MintNFT()
          toast({
            title: "NFT Minted",
            description: `Successfully minted BARK NFT! Transaction ID: ${txId}`,
          })
          break
        case 'Claim':
          await new Promise(resolve => setTimeout(resolve, 2000))
          toast({
            title: "NFT Claimed",
            description: "NFT claimed successfully!",
          })
          break
        case 'Swap':
          await new Promise(resolve => setTimeout(resolve, 2000))
          toast({
            title: "NFT Swapped",
            description: "NFT swapped successfully!",
          })
          break
        case 'Stake':
          await new Promise(resolve => setTimeout(resolve, 2000))
          toast({
            title: "NFT Staked",
            description: "NFT staked successfully!",
          })
          break
        default:
          console.error('Unknown action:', action)
      }
    } catch (error) {
      console.error(`Error during ${action}:`, error)
      toast({
        title: `${action} Failed`,
        description: `Failed to ${action.toLowerCase()} NFT. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const tabContent = {
    mint: {
      title: 'Create NFT',
      description: 'Create a new BARK NFT',
      icon: <PenTool className="h-6 w-6 text-[#D0BFB4]" />,
      content: (
        <form onSubmit={(e) => { e.preventDefault(); handleAction('Mint'); }}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nftName">NFT Name</Label>
              <Input id="nftName" placeholder="Enter NFT name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nftDescription">NFT Description</Label>
              <Input id="nftDescription" placeholder="Enter NFT description" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nftImage">NFT Image URL</Label>
              <Input id="nftImage" placeholder="Enter NFT image URL" required />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C0AFA4]">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PenTool className="mr-2 h-4 w-4" />}
              Create NFT
            </Button>
          </div>
        </form>
      ),
    },
    claim: {
      title: 'Claim NFT',
      description: 'Claim your BARK NFT',
      icon: <Gift className="h-6 w-6 text-[#D0BFB4]" />,
      content: (
        <form onSubmit={(e) => { e.preventDefault(); handleAction('Claim'); }}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claimCode">Claim Code</Label>
              <Input id="claimCode" placeholder="Enter your claim code" required />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C0AFA4]">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Gift className="mr-2 h-4 w-4" />}
              Claim NFT
            </Button>
          </div>
        </form>
      ),
    },
    gallery: {
      title: 'Gallery',
      description: 'View and manage your BARK NFT gallery',
      icon: <ImageIcon className="h-6 w-6 text-[#D0BFB4]" />,
      content: (
        <div className="space-y-4">
          <p>You have 3 BARK NFTs in your gallery.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((nft) => (
              <Card key={nft} className="overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=200&text=NFT ${nft}`}
                  alt={`BARK NFT ${nft}`}
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold">BARK #{nft}</h3>
                  <p className="text-sm text-gray-500">Rarity: Common</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link href="pages/gallery" passHref>
            <Button className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C0AFA4]">
              <ImageIcon className="mr-2 h-4 w-4" />
              View Full Gallery
            </Button>
          </Link>
        </div>
      ),
    },
    swap: {
      title: 'Swap NFT',
      description: 'Swap your BARK NFTs',
      icon: <Repeat className="h-6 w-6 text-[#D0BFB4]" />,
      content: (
        <form onSubmit={(e) => { e.preventDefault(); handleAction('Swap'); }}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nftToSwap">NFT to Swap</Label>
              <Select>
                <SelectTrigger id="nftToSwap">
                  <SelectValue placeholder="Select NFT to swap" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nft1">BARK #1</SelectItem>
                  <SelectItem value="nft2">BARK #2</SelectItem>
                  <SelectItem value="nft3">BARK #3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nftToReceive">NFT to Receive</Label>
              <Select>
                <SelectTrigger id="nftToReceive">
                  <SelectValue placeholder="Select NFT to receive" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nft4">BARK #4</SelectItem>
                  <SelectItem value="nft5">BARK #5</SelectItem>
                  <SelectItem value="nft6">BARK #6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C0AFA4]">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Repeat className="mr-2 h-4 w-4" />}
              Swap NFT
            </Button>
          </div>
        </form>
      ),
    },
    stake: {
      title: 'Stake NFT',
      description: 'Stake your BARK NFTs to earn rewards',
      icon: <Coins className="h-6 w-6 text-[#D0BFB4]" />,
      content: (
        <form onSubmit={(e) => { e.preventDefault(); handleAction('Stake'); }}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nftToStake">NFT to Stake</Label>
              <Select>
                <SelectTrigger id="nftToStake">
                  <SelectValue placeholder="Select NFT to stake" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nft1">BARK #1</SelectItem>
                  <SelectItem value="nft2">BARK #2</SelectItem>
                  <SelectItem value="nft3">BARK #3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stakeDuration">Stake Duration</Label>
              <Select>
                <SelectTrigger id="stakeDuration">
                  <SelectValue placeholder="Select stake duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-[#D0BFB4] text-gray-800 hover:bg-[#C0AFA4]">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Coins className="mr-2 h-4 w-4" />}
              Stake NFT
            </Button>
          </div>
        </form>
      ),
    },
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">NFT Dashboard</h1>
      <p className="text-xl text-gray-700 mb-8">Manage your BARK NFTs</p>

      <Link href="/" passHref>
        <Button className="mb-4 bg-gray-900 text-white hover:bg-gray-700">
          Back to Main Page
        </Button>
      </Link>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-white rounded-lg p-1">
          {Object.entries(tabContent).map(([key, { title, icon }]) => (
            <TabsTrigger 
              key={key} 
              value={key} 
              className="flex items-center space-x-2 data-[state=active]:bg-[#D0BFB4] data-[state=active]:text-gray-800"
            >
              {icon}
              <span>{title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(tabContent).map(([key, { title, description, content }]) => (
          <TabsContent key={key} value={key}>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {content}
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}