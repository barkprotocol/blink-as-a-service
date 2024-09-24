'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NFTPage() {
  const nfts = [
    { id: 1, name: "Cosmic Cube", artist: "Stella Nova", price: "0.5 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 2, name: "Digital Dream", artist: "Pixel Master", price: "0.7 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 3, name: "Neon Nights", artist: "Glow Wizard", price: "0.3 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 4, name: "Abstract Aura", artist: "Brush Bot", price: "0.6 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 5, name: "Quantum Quilt", artist: "Data Weaver", price: "0.8 ETH", image: "/placeholder.svg?height=400&width=400" },
    { id: 6, name: "Fractal Fantasy", artist: "Math Mage", price: "0.4 ETH", image: "/placeholder.svg?height=400&width=400" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">NFT Gallery</h1>
      <p className="text-xl text-muted-foreground mb-8">Discover unique digital artworks from talented artists around the world.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <Card key={nft.id} className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={nft.image}
                alt={nft.name}
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
              <h2 className="text-xl font-semibold mb-1">{nft.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">by {nft.artist}</p>
              <div className="flex justify-between items-center w-full">
                <span className="font-bold">{nft.price}</span>
                <Button>Buy Now</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}