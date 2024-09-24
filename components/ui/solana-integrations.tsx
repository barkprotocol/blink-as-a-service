'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { createQR, encodeURL, TransactionRequestURLFields, findReference, validateTransfer } from '@solana/pay'
import { Metaplex, walletAdapterIdentity, bundlrStorage } from '@metaplex-foundation/js'
import { createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { stripe } from '@/lib/payments/stripe'
import { db } from '@/lib/db/drizzle'
import { users, teams, teamMembers } from '@/lib/db/schema'
import { hashPassword } from '@/lib/auth/session'

// Initialize Solana connection (replace with your RPC URL)
const connection = new Connection('https://api.mainnet-beta.solana.com')

// USDC token mint address on Solana mainnet
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')

// Blink types
type BlinkType = 'transfer' | 'swap' | 'nft_mint'

interface Blink {
  id: string
  type: BlinkType
  data: Record<string, any>
  status: 'pending' | 'completed' | 'failed'
}

export default function SolanaIntegration() {
  const wallet = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [nftName, setNftName] = useState('')
  const [nftDescription, setNftDescription] = useState('')
  const [nftImageUrl, setNftImageUrl] = useState('')
  const [blinkType, setBlinkType] = useState<BlinkType>('transfer')
  const [blinkData, setBlinkData] = useState('')
  const [blinks, setBlinks] = useState<Blink[]>([])

  useEffect(() => {
    if (wallet.publicKey) {
      updateBalance()
      updateUSDCBalance()
    }
  }, [wallet.publicKey])

  const updateBalance = async () => {
    if (wallet.publicKey) {
      try {
        const balance = await connection.getBalance(wallet.publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error('Failed to fetch SOL balance:', error)
        toast({ title: 'Error', description: 'Failed to fetch SOL balance.' })
      }
    }
  }

  const updateUSDCBalance = async () => {
    if (wallet.publicKey) {
      try {
        const tokenAccount = await getAssociatedTokenAddress(USDC_MINT, wallet.publicKey)
        const balance = await connection.getTokenAccountBalance(tokenAccount)
        setUsdcBalance(parseFloat(balance.value.uiAmount?.toFixed(2) || '0'))
      } catch (error) {
        console.error('Failed to fetch USDC balance:', error)
        toast({ title: 'Error', description: 'Failed to fetch USDC balance.' })
      }
    }
  }

  const handleSolanaPay = async () => {
    if (!wallet.publicKey) {
      toast({ title: 'Error', description: 'Please connect your wallet first.' })
      return
    }

    try {
      const recipientPublicKey = new PublicKey(recipient)
      const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL

      const urlFields: TransactionRequestURLFields = {
        recipient: recipientPublicKey,
        amount: amountInLamports,
        label: 'BARK BLINK Payment',
        message: 'Thanks for using BARK BLINK!',
        memo: `Payment of ${amount} SOL`,
      }

      const url = encodeURL(urlFields)
      const qr = createQR(url)
      setQrCode(await qr.toDataURL())

      // Monitor the transaction
      const { signature } = await findReference(connection, url.reference, { finality: 'confirmed' })
      
      // Validate the transaction
      await validateTransfer(connection, signature, { recipient: recipientPublicKey, amount: amountInLamports })

      toast({ title: 'Success', description: 'Payment completed successfully.' })
      updateBalance()
    } catch (error) {
      console.error('Solana Pay error:', error)
      toast({ title: 'Error', description: 'Failed to complete Solana Pay transaction.' })
    }
  }

  const handleNftMint = async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      toast({ title: 'Error', description: 'Please connect your wallet first.' })
      return
    }

    try {
      const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(bundlrStorage())

      const { nft } = await metaplex.nfts().create({
        name: nftName,
        description: nftDescription,
        uri: nftImageUrl,
        sellerFeeBasisPoints: 500, // 5% royalty
      })

      toast({ title: 'Success', description: `NFT minted with address: ${nft.address.toString()}` })
      
      // Create a Blink for the NFT mint
      handleBlinkCreation('nft_mint', {
        name: nftName,
        description: nftDescription,
        imageUrl: nftImageUrl,
        mintAddress: nft.address.toString(),
      })
    } catch (error) {
      console.error('NFT minting error:', error)
      toast({ title: 'Error', description: 'Failed to mint NFT.' })
    }
  }

  const handleBlinkCreation = async (type: BlinkType, data: Record<string, any>) => {
    if (!wallet.publicKey) {
      toast({ title: 'Error', description: 'Please connect your wallet first.' })
      return
    }

    try {
      const newBlink: Blink = {
        id: `blink_${Date.now()}`,
        type,
        data,
        status: 'pending',
      }

      // In a real scenario, you'd send this blink to your backend
      console.log('Created Blink:', newBlink)

      // Update local state
      setBlinks(prevBlinks => [...prevBlinks, newBlink])

      toast({ title: 'Success', description: `Blink created with ID: ${newBlink.id}` })

      // Simulate blink completion after 2 seconds
      setTimeout(() => {
        setBlinks(prevBlinks => 
          prevBlinks.map(blink => 
            blink.id === newBlink.id ? { ...blink, status: 'completed' } : blink
          )
        )
        toast({ title: 'Blink Completed', description: `Blink ${newBlink.id} has been completed.` })
      }, 2000)
    } catch (error) {
      console.error('Blink creation error:', error)
      toast({ title: 'Error', description: 'Failed to create Blink.' })
    }
  }

  const executeBlink = async (blinkId: string) => {
    const blink = blinks.find(b => b.id === blinkId)
    if (!blink) {
      toast({ title: 'Error', description: 'Blink not found.' })
      return
    }

    if (blink.status !== 'pending') {
      toast({ title: 'Error', description: 'This Blink has already been processed.' })
      return
    }

    try {
      // Simulate blink