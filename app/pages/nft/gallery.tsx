'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

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

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRarity, setFilterRarity] = useState<string>('All')
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name')
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const { toast } = useToast()

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

  const handlePurchase = (nft: NFT) => {
    toast({
      title: "Purchase Initiated",
      description: `You're about to purchase ${nft.name} for ${nft.price} SOL.`,
      duration: 5000,
    })
    // Here you would typically integrate with a wallet and blockchain
  }

  useEffect(() => {
    // This effect could be used to fetch NFTs from an API
    // For now, we'll just log that the component has mounted
    console.log('Gallery component mounted')
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">BARK NFT Gallery</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <Input
          placeholder="Search NFTs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedNFTs.map((nft) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  width={300}
                  height={300}
                  className="w-full h-auto"
                />
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{nft.name}</h2>
                  <Badge className={`mb-2 ${
                    nft.rarity === 'Common' ? 'bg-gray-500' :
                    nft.rarity === 'Rare' ? 'bg-[#D0BFB4]' : // Changed from blue to sand color
                    nft.rarity === 'Epic' ? 'bg-black' : // Changed from purple to black
                    'bg-yellow-500'
                  }`}>
                    {nft.rarity}
                  </Badge>
                  <p className="text-lg font-bold text-[#D0BFB4]">{nft.price} SOL</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedNFT(nft)}>View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{selectedNFT?.name}</DialogTitle>
                        <DialogDescription>{selectedNFT?.description}</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Image
                          src={selectedNFT?.image || ''}
                          alt={selectedNFT?.name || ''}
                          width={300}
                          height={300}
                          className="w-full h-auto"
                        />
                        {selectedNFT?.attributes.map((attr, index) => (
                          <div key={index} className="grid grid-cols-2">
                            <span className="font-bold">{attr.trait_type}:</span>
                            <span>{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button className="bg-[#D0BFB4] text-gray-800 hover:bg-[#C0AFA4]" onClick={() => handlePurchase(nft)}>
                    Purchase
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}