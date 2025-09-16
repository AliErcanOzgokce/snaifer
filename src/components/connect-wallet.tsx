'use client'

import { modal } from '../context'
import { useState, useEffect } from 'react'
import { Wallet2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAccount } from 'wagmi'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const [displayAddress, setDisplayAddress] = useState('')
  const [mounted, setMounted] = useState(false)
  
  // Handle client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (address) {
      setDisplayAddress(`${address.slice(0, 6)}...${address.slice(-4)}`)
    }
  }, [address])

  const handleClick = () => {
    if (isConnected && address) {
      modal.open()
    } else {
      modal.open({ view: 'Connect' })
    }
  }

  if (!mounted) {
    return (
      <Button 
        className="bg-glass backdrop-blur-sm border border-border/20 rounded-xl hover:bg-accent/50 hover:scale-105 transition-all duration-300 text-sm md:text-base px-3 md:px-4 text-foreground"
      >
        <Wallet2 className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
        <span className="hidden sm:inline">Connect Wallet</span>
        <span className="sm:hidden">Connect</span>
      </Button>
    )
  }

  return (
    <Button 
      onClick={handleClick}
      className="bg-glass backdrop-blur-sm border border-border/20 rounded-xl hover:bg-accent/50 hover:scale-105 transition-all duration-300 text-sm md:text-base px-3 md:px-4 text-foreground"
    >
      <Wallet2 className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
      {isConnected ? displayAddress : (
        <>
          <span className="hidden sm:inline">Connect Wallet</span>
          <span className="sm:hidden">Connect</span>
        </>
      )}
    </Button>
  )
} 