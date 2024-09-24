'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NFTPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const nfts = [
    { id: 1, name: "Desert Mirage", artist: "Oasis Dreamer", price: "0.5 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 2, name: "Sandstorm Symphony", artist: "Dune Composer", price: "0.7 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 3, name: "Cactus Bloom", artist: "Desert Botanist", price: "0.3 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 4, name: "Golden Hour Dunes", artist: "Sun Chaser", price: "0.6 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 5, name: "Oasis Reflection", artist: "Mirage Maker", price: "0.8 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 6, name: "Desert Night Sky", artist: "Star Gazer", price: "0.4 ETH", image: "/placeholder.svg?height=400&width=400" },
  ]

  const filteredAndSortedNFTs = nfts
    .filter(nft => 
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return parseFloat(a.price) - parseFloat(b.price)
      }
      return a[sortBy].localeCompare(b[sortBy])
    })

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-sand-100 to-sand-200 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-sand-800">Desert Oasis NFT Gallery</h1>
      <p className="text-xl text-sand-600 mb-8">Discover unique digital artworks inspired by the beauty of the desert.</p>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-1/2">
          <Label htmlFor="search" className="sr-only">Search NFTs</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name or artist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-sand-50 border-sand-300 focus:border-sand-500 focus:ring-sand-500"
          />
        </div>
        <div className="w-full sm:w-1/4">
          <Label htmlFor="sort" className="sr-only">Sort by</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-sand-50 border-sand-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="artist">Artist</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedNFTs.map((nft) => (
          <Card key={nft.id} className="overflow-hidden bg-sand-50 border-sand-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src={nft.image}
                  alt={nft.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 bg-sand-100">
              <h2 className="text-xl font-semibold mb-1 text-sand-800">{nft.name}</h2>
              <p className="text-sm text-sand-600 mb-2">by {nft.artist}</p>
              <div className="flex justify-between items-center w-full">
                <span className="font-bold text-sand-700">{nft.price}</span>
                <Button className="bg-sand-600 hover:bg-sand-700 text-white">
                  Buy Now
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredAndSortedNFTs.length === 0 && (
        <p className="text-center text-sand-600 mt-8">No NFTs found. Try adjusting your search.</p>
      )}
    </div>
  )
}