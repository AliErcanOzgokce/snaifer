"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// keep Popover for small inline menus; modal uses Dialog
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Check, ChevronDown, Loader2, Search } from "lucide-react";

export default function Home() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  // Reset loading state when component unmounts
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  // Page loading effect with smooth transition
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsPageLoaded(true);
    }, 1500);
    
    const timer2 = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // ESC key to close network selector
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isNetworkOpen) {
        setIsNetworkOpen(false);
      }
    };

    if (isNetworkOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isNetworkOpen]);

  const [selectedNetwork, setSelectedNetwork] = useState({
    name: "Solana",
    symbol: "SOL",
    color: "bg-green-500",
  });

  const networks = [
    { name: "Solana", symbol: "SOL", color: "bg-green-500", price: "98.45", change: 2.34 },
    { name: "Ethereum", symbol: "ETH", color: "bg-blue-500", price: "3,245.67", change: -1.23 },
    { name: "Binance Smart Chain", symbol: "BSC", color: "bg-yellow-500", price: "312.89", change: 0.87 },
    { name: "Polygon", symbol: "MATIC", color: "bg-purple-500", price: "0.89", change: 3.45 },
    { name: "Avalanche", symbol: "AVAX", color: "bg-red-500", price: "28.76", change: -0.56 },
    { name: "Arbitrum", symbol: "ARB", color: "bg-blue-600", price: "1.23", change: 1.78 },
    { name: "Optimism", symbol: "OP", color: "bg-red-600", price: "2.45", change: -2.12 },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setIsLoading(true);
      // Navigation will unmount this component, so we don't need to reset loading state here
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Loading Screen */}
      <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${isPageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="relative">
          {/* Cool animated logo */}
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-neon-blue/20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-xl bg-primary/10 backdrop-blur-sm animate-pulse"></div>
            <div className="absolute inset-4 rounded-lg bg-primary/20 animate-pulse"></div>
            <div className="absolute inset-6 rounded-md bg-primary/30 animate-pulse"></div>
            <div className="absolute inset-8 rounded-sm bg-primary/40 animate-pulse"></div>
          </div>
          
          
        </div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center h-screen justify-center space-y-10 text-center px-4 overflow-hidden transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Hero Text */}
        <div className="space-y-6">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Instant Token{" "}
            <span className="text-primary animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              Risk Intelligence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-3xl leading-relaxed mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            Paste a token address to get on-chain risk score, honeypot & ownership checks, and liquidity insights—in seconds.
          </p>
          
          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-900">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass backdrop-blur-sm border border-border/20">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success"></span>
              </span>
              <span className="text-xs font-medium text-success">Live Risk Analysis</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">99.9% uptime</span>
            </div>
          </div>
        </div>
        
        {/* Primary Input - Full Width Pill Design */}
        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1100">
          <form onSubmit={handleSearch} className="relative">
            <div className={`relative transition-all duration-300 ${
              isSearchFocused ? "transform scale-[1.02]" : ""
            }`}>
              {/* Network Selector Button */}
              <button 
                type="button"
                onClick={() => setIsNetworkOpen(true)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-glass backdrop-blur-sm border border-border/20 hover:border-border/40 transition-all duration-200 z-10">
                <div className={`w-3 h-3 rounded-full ${selectedNetwork.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">
                    {selectedNetwork.symbol.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{selectedNetwork.symbol}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
              
              {/* Main Input */}
              <div className={`relative rounded-full bg-glass backdrop-blur-sm border border-border/20 transition-all duration-300 ${
                isSearchFocused
                  ? "shadow-lg shadow-primary/20 border-border/40"
                  : "hover:shadow-md hover:shadow-primary/10"
              }`}>
                <Input
                  type="search"
                  placeholder="Paste token address (Sui / EVM / ENS / SuiNS)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  disabled={isLoading}
                  autoComplete="off"
                  className="pl-32 pr-20 py-4 text-lg rounded-full h-14 bg-transparent border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none focus:outline-none focus-visible:outline-none appearance-none text-foreground placeholder:text-muted-foreground/90 transition-all duration-300 [&::-webkit-search-cancel-button]:hidden"
                />
              </div>
              
              {/* Scan Button */}
              <Button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground border border-border/20 rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                size="sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Scan</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Network Selector Dialog */}
        <Dialog open={isNetworkOpen} onOpenChange={setIsNetworkOpen}>
          <DialogOverlay />
          <DialogContent>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Select Network</h2>
              <button
                onClick={() => setIsNetworkOpen(false)}
                className="p-2 rounded-lg hover:bg-accent/50 transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Input - Liquid Glass Style */}
            <div className="mb-4">
              <div className="relative rounded-full bg-glass backdrop-blur-sm border border-border/20 transition-all duration-300 hover:border-border/40 focus-within:shadow-lg focus-within:shadow-primary/20 focus-within:border-border/40">
                <input 
                  placeholder="Search network…" 
                  className="w-full h-10 rounded-full bg-transparent border-0 ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none focus:outline-none focus-visible:outline-none appearance-none text-foreground placeholder:text-muted-foreground/70 transition-all duration-300 px-4 text-sm" 
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
              </div>
            </div>

            {/* Network List */}
            <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-2">
              {networks.map((network) => (
                <button
                  key={network.symbol}
                  type="button"
                  onClick={() => {
                    setSelectedNetwork(network);
                    // Smooth close with delay
                    setTimeout(() => {
                      setIsNetworkOpen(false);
                    }, 150);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-glass/50 backdrop-blur-sm border border-border/10 hover:bg-glass hover:border-border/30 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${network.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-sm font-bold">
                        {network.symbol.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-[15px] text-foreground group-hover:text-primary transition-colors duration-300">
                        {network.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {network.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground tabular-nums">
                      ${network.price}
                    </div>
                    <div className={`text-xs ${network.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {network.change >= 0 ? '+' : ''}{network.change}%
                    </div>
                  </div>
                  {selectedNetwork.symbol === network.symbol && (
                    <Check aria-hidden className="h-4 w-4 text-primary ml-2 animate-in fade-in duration-300" />
                  )}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        
        {/* Secondary CTA Row */}
        <div className="flex items-center justify-center gap-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1300">
          <button 
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            onClick={() => {
              // Add example token addresses
              const examples = [
                "0x1::aptos_coin::AptosCoin",
                "0x2::sui::SUI", 
                "0xA0b86a33E6441b8c4C8C0E6C4A3F4e4E4e4e4e4e4"
              ];
              setSearchValue(examples[Math.floor(Math.random() * examples.length)]);
            }}
          >
            <span className="text-primary group-hover:scale-110 transition-transform duration-200">✨</span>
            See live examples
          </button>
          <div className="w-px h-4 bg-border/30"></div>
          <button 
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            onClick={() => router.push('/wallet')}
          >
            <span className="text-primary group-hover:scale-110 transition-transform duration-200">ℹ️</span>
            How it works
          </button>
        </div>
          
        </div>
      </div>

  );
}
