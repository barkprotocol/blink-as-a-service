'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

interface NFT {
  id: number
  name: string
  image: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  price: number
  description: string
  attributes: { trait_type: string; value: string }[]
}

const nfts: NFT[] = [
  { 
    id: 1, 
    name: "BARK #001", 
    image: "/placeholder.svg?height=300&width=300&text=BARK%20%23001", 
    rarity: "Common", 
    price: 0.1,
    description: "A loyal companion with a heart of gold.",
    attributes: [
      { trait_type: "Breed", value: "Golden Retriever" },
      { trait_type: "Color", value: "Golden" },
      { trait_type: "Age", value: "3 years" }
    ]
  },
  { 
    id: 2, 
    name: "BARK #002", 
    image: "/placeholder.svg?height=300&width=300&text=BARK%20%23002", 
    rarity: "Rare", 
    price: 0.2,
    description: "A majestic husky with eyes that pierce the soul.",
    attributes: [
      { trait_type: "Breed", value: "Siberian Husky" },
      { trait_type: "Color", value: "Black and White" },
      { trait_type: "Age", value: "2 years" }
    ]
  },
  { 
    id: 3, 
    name: "BARK #003", 
    image: "/placeholder.svg?height=300&width=300&text=BARK%20%23003", 
    rarity: "Epic", 
    price: 0.5,
    description: "A regal German Shepherd, guardian of the blockchain.",
    attributes: [
      { trait_type: "Breed", value: "German Shepherd" },
      { trait_type: "Color", value: "Black and Tan" },
      { trait_type: "Age", value: "4 years" }
    ]
  },
  { 
    id: 4, 
    name: "BARK #004", 
    image: "/placeholder.svg?height=300&width=300&text=BARK%20%23004", 
    rarity: "Legendary", 
    price: 1.0,
    description: "A mythical Shiba Inu, said to bring fortune to its owner.",
    attributes: [
      { trait_type: "Breed", value: "Shiba Inu" },
      { trait_type: "Color", value: "Red" },
      { trait_type: "Age", value: "1 year" }
    ]
  },
  { 
    id: 5, 
    name: "BARK #005", 
    image: "/placeholder.svg?height=300&width=300&text=BARK%20%23005", 
    rarity: "Common", 
    price: 0.1,
    description: "A playful Labrador, always ready for a game of fetch.",
    attributes: [
      { trait_type: "Breed", value: "Labrador Retriever" },
      { trait_type: "Color", value: "Chocolate" },
      { trait_type: "Age", value: "2 years" }
    ]
  },
  { 
    id: 6, 
    name: "BARK #006", 
    image: "/placeholder.svg?height=300&width=300&text=BARK%20%23006", 
    rarity: "Rare", 
    price: 0.3,
    description: "A clever Border Collie, master of agility and intelligence.",
    attributes: [
      { trait_type: "Breed", value: "Border Collie" },
      { trait_type: "Color", value: "Black and White" },
      { trait_type: "Age", value: "3 years" }
    ]
  },
]

const SOLANA_NETWORK = 'devnet'
const SOLANA_RPC_URL = 'https://api.devnet.solana.com'

export default function NFTGalleryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRarity, setFilterRarity] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [isBlinking, setIsBlinking] = useState(false)
  const { toast } = useToast()
  const wallet = useWallet()

  const filteredAndSortedNFTs = nfts
    .filter(nft => 
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRarity === 'All' || nft.rarity === filterRarity)
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else {
        return a.price - b.price
      }
    })

  const handlePurchase = async (nft: NFT) => {
    if (!wallet.connected || !wallet.publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase NFTs.",
        variant: "destructive",
      })
      return
    }

    try {
      const connection = new Connection(SOLANA_RPC_URL, 'confirmed')
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey('11111111111111111111111111111111'), // Replace with actual recipient address
          lamports: nft.price * LAMPORTS_PER_SOL,
        })
      )

      const { blockhash } = await connection.getRecentBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = wallet.publicKey

      const signedTransaction = await wallet.signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTransaction.serialize())

      toast({
        title: "Purchase Successful",
        description: `You've purchased ${nft.name} for ${nft.price} SOL. Transaction ID: ${txid}`,
        duration: 5000,
      })

      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 3000)
    } catch (error) {
      console.error('Error during purchase:', error)
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    console.log('NFT Gallery component mounted')
  }, [])

  return (
    <div className={`container mx-auto px-4 py-8 ${isBlinking ? 'animate-pulse' : ''}`}>
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">BARK NFT Gallery</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <Input
          placeholder="Search NFTs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
          aria-label="Search NFTs"
        />
        <Select value={filterRarity} onValueChange={setFilterRarity}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Filter by rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Rarities</SelectItem>
            <SelectItem value="Common">Common</SelectItem>
            <SelectItem value="Rare">Rare</SelectItem>
            <SelectItem value="Epic">Epic</SelectItem>
            <SelectItem value="Legendary">Legendary</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'name' | 'price')}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAndSortedNFTs.map((nft) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex flex-col h-full">
                <div className="relative aspect-square">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                  />
                </div>
                <CardContent className="flex-grow p-4">
                  <h2 className="text-xl font-semibold mb-2">{nft.name}</h2>
                  <Badge className={`mb-2 ${
                    nft.rarity === 'Common' ? 'bg-gray-500' :
                    nft.rarity === 'Rare' ? 'bg-[#D0BFB4]' :
                    nft.rarity === 'Epic' ? 'bg-black' :
                    'bg-yellow-500'
                  }`}>
                    {nft.rarity}
                  </Badge>
                  <p className="text-lg font-bold text-[#D0BFB4]">{nft.price} SOL</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex justify-between w-full space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1" onClick={() => setSelectedNFT(nft)}>Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{selectedNFT?.name}</DialogTitle>
                          <DialogDescription>{selectedNFT?.description}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="relative aspect-square">
                            <Image
                              src={selectedNFT?.image || ''}
                              alt={selectedNFT?.name || ''}
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-lg"
                            />
                          </div>
                          {selectedNFT?.attributes.map((attr, index) => (
                            <div key={index} className="grid grid-cols-2">
                              <span className="font-bold">{attr.trait_type}:</span>
                              <span>{attr.value}</span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      className="flex-1 bg-[#D0BFB4] text-gray-800 hover:bg-[#C0AFA4]" 
                      onClick={() => handlePurchase(nft)}
                      disabled={!wallet.connected}
                    >
                      {wallet.connected ? 'Buy' : 'Connect'}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <Link href="/nft" passHref>
        <Button className="mt-8 w-full bg-gray-900 text-white hover:bg-gray-700">
          Back to NFT Dashboard
        </Button>
      </Link>
    </div>
  )
}