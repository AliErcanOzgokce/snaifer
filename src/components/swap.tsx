"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Settings,
  ArrowDown,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Token listesi
const popularTokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    color: "bg-blue-500",
    balance: "1.25",
    value: 3250.75,
  },
  {
    symbol: "USDT",
    name: "Tether",
    color: "bg-green-500",
    balance: "1250.00",
    value: 1250.0,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    color: "bg-orange-500",
    balance: "0.04",
    value: 2600.0,
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    color: "bg-yellow-500",
    balance: "10.5",
    value: 3570.0,
  },
  {
    symbol: "SAFEMOON",
    name: "SafeMoon Token",
    color: "bg-purple-500",
    balance: "15000000",
    value: 1020.0,
  },
];

// DEX verileri
const dexOptions = [
  {
    name: "Uniswap",
    color: "bg-pink-500",
    outputAmount: "1,245.78",
    gasPrice: "$5.23",
    routeInfo: "ETH > USDT",
  },
  {
    name: "SushiSwap",
    color: "bg-blue-500",
    outputAmount: "1,243.52",
    gasPrice: "$4.15",
    routeInfo: "ETH > USDT",
  },
  {
    name: "PancakeSwap",
    color: "bg-yellow-500",
    outputAmount: "1,242.90",
    gasPrice: "$3.85",
    routeInfo: "ETH > USDT",
  },
];

export function DexAggregator({ tokenAddress }: { tokenAddress?: string }) {
  const [fromToken, setFromToken] = useState(popularTokens[0]);
  const [toToken, setToToken] = useState(popularTokens[4]);
  const [fromAmount, setFromAmount] = useState("0.5");
  const [isLoading, setIsLoading] = useState(false);
  const [showDexOptions, setShowDexOptions] = useState(false);

  // tokenAddress parametresini kullanarak varsayılan token seçimi
  React.useEffect(() => {
    if (tokenAddress) {
      // Gerçek bir uygulamada burada tokenAddress'e göre token bilgisi çekilebilir
      // Şimdilik sadece örnek olarak SafeMoon'u seçiyoruz
      setToToken(popularTokens[4]); // SafeMoon
    }
  }, [tokenAddress]);

  const handleSwapClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleSwitchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  return (
    <Card className="w-full border-none shadow-sm">
      <CardContent className="space-y-2 p-3">
        {/* From Token Section */}
        <div className="p-2 bg-muted/50 rounded-md">
          <div className="flex justify-between mb-0.5">
            <span className="text-xs text-muted-foreground">Gönder</span>
            <span className="text-xs text-muted-foreground">
              Bakiye: {fromToken.balance}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="relative flex-1">
              <Input
                className="pl-2 pr-10 py-1 h-8 text-base font-medium bg-transparent border-0"
                type="text"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2">
                <Button variant="ghost" size="sm" className="text-xs h-5 px-1">
                  MAX
                </Button>
              </div>
            </div>
            <div className="relative min-w-[80px]">
              <Select
                defaultValue={fromToken.symbol}
                onValueChange={(value) => {
                  const token = popularTokens.find((t) => t.symbol === value);
                  if (token) setFromToken(token);
                }}
              >
                <SelectTrigger className="w-full h-8 pl-2 pr-2 py-0 border-0 bg-transparent">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-4 h-4 rounded-full ${fromToken.color} flex items-center justify-center`}>
                      <span className="text-white text-[8px] font-bold">
                        {fromToken.symbol.charAt(0)}
                      </span>
                    </div>
                    <SelectValue className="text-sm" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {popularTokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-4 h-4 rounded-full ${token.color} flex items-center justify-center`}>
                          <span className="text-white text-[8px] font-bold">
                            {token.symbol.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm">{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Switch Tokens Button */}
        <div className="flex justify-center -my-1 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-5 w-5 bg-background border shadow-sm hover:bg-muted p-0"
            onClick={handleSwitchTokens}
          >
            <ArrowDown className="h-2.5 w-2.5" />
          </Button>
        </div>

        {/* To Token Section */}
        <div className="p-2 bg-muted/50 rounded-md">
          <div className="flex justify-between mb-0.5">
            <span className="text-xs text-muted-foreground">Al</span>
            <span className="text-xs text-muted-foreground">
              Bakiye: {toToken.balance}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="relative flex-1">
              <Input
                className="pl-2 pr-2 py-1 h-8 text-base font-medium bg-transparent border-0"
                type="text"
                value={(parseFloat(fromAmount) * fromToken.value / toToken.value).toFixed(6)}
                readOnly
              />
            </div>
            <div className="relative min-w-[80px]">
              <Select
                defaultValue={toToken.symbol}
                onValueChange={(value) => {
                  const token = popularTokens.find((t) => t.symbol === value);
                  if (token) setToToken(token);
                }}
              >
                <SelectTrigger className="w-full h-8 pl-2 pr-2 py-0 border-0 bg-transparent">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-4 h-4 rounded-full ${toToken.color} flex items-center justify-center`}>
                      <span className="text-white text-[8px] font-bold">
                        {toToken.symbol.charAt(0)}
                      </span>
                    </div>
                    <SelectValue className="text-sm" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {popularTokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-4 h-4 rounded-full ${token.color} flex items-center justify-center`}>
                          <span className="text-white text-[8px] font-bold">
                            {token.symbol.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm">{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* DEX Information */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">1 {fromToken.symbol} = {(fromToken.value / toToken.value).toFixed(4)} {toToken.symbol}</span>
          <span className="text-green-500">Etki: 0.12%</span>
        </div>

        {/* DEX Route Options */}
        <div 
          className="p-1.5 rounded-md border border-muted flex items-center justify-between cursor-pointer hover:bg-muted/50"
          onClick={() => setShowDexOptions(!showDexOptions)}
        >
          <div className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded-full ${dexOptions[0].color} flex items-center justify-center`}>
              <span className="text-white text-[8px] font-bold">U</span>
            </div>
            <div>
              <div className="font-medium text-xs">{dexOptions[0].name}</div>
              <div className="text-[10px] text-muted-foreground">{dexOptions[0].routeInfo}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-xs">{dexOptions[0].outputAmount}</div>
            <div className="text-[10px] text-muted-foreground">Gas: {dexOptions[0].gasPrice}</div>
          </div>
        </div>

        {showDexOptions && (
          <div className="space-y-1">
            {dexOptions.slice(1).map((dex, index) => (
              <div
                key={index}
                className="p-1.5 rounded-md border border-transparent hover:border-muted flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded-full ${dex.color} flex items-center justify-center`}>
                    <span className="text-white text-[8px] font-bold">{dex.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-xs">{dex.name}</div>
                    <div className="text-[10px] text-muted-foreground">{dex.routeInfo}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-xs">{dex.outputAmount}</div>
                  <div className="text-[10px] text-muted-foreground">Gas: {dex.gasPrice}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Swap Button */}
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-1 h-8 text-sm"
          disabled={isLoading || parseFloat(fromAmount) <= 0}
          onClick={handleSwapClick}
        >
          {isLoading ? (
            <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : null}
          {isLoading
            ? "İşlem Hazırlanıyor..."
            : parseFloat(fromAmount) <= 0
            ? "Miktar Girin"
            : `${fromToken.symbol} → ${toToken.symbol}`}
        </Button>

        {/* Settings Button */}
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Settings className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
