"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { DexAggregator } from './swap';

const exchangeRates = [
  {
    dex: "Uniswap",
    color: "bg-pink-500",
    pair: "ETH/USDT",
    price: "3255.45",
    change24h: "+2.5%",
    positive: true,
  },
  {
    dex: "PancakeSwap",
    color: "bg-yellow-500",
    pair: "ETH/USDT",
    price: "3254.98",
    change24h: "+2.3%",
    positive: true,
  },
  {
    dex: "SushiSwap",
    color: "bg-blue-500",
    pair: "ETH/USDT",
    price: "3253.75",
    change24h: "+2.2%",
    positive: true,
  },
  {
    dex: "Curve",
    color: "bg-green-500",
    pair: "ETH/USDT",
    price: "3252.90",
    change24h: "+2.4%",
    positive: true,
  },
];

export function SwapContainer({ tokenAddress }: { tokenAddress?: string }) {
  const [activeTab, setActiveTab] = useState('swap');

  return (
    <Card className="shadow-sm border-none overflow-hidden">
      <div className="flex items-center justify-between py-1.5 px-2.5 border-b">
        <div className="flex items-center gap-1">
          <ArrowUpDown className="w-3 h-3" /> 
          <span className="text-xs font-medium">DEX İşlemleri</span>
        </div>
        <Badge variant="outline" className="text-[9px] py-0 h-4 px-1.5">Beta</Badge>
      </div>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b h-7">
            <TabsTrigger value="swap" className="text-xs py-0">Swap</TabsTrigger>
            <TabsTrigger value="markets" className="text-xs py-0">Piyasalar</TabsTrigger>
          </TabsList>

          <TabsContent value="swap" className="mt-0 px-2 py-2">
            <DexAggregator tokenAddress={tokenAddress} />
          </TabsContent>
          
          <TabsContent value="markets" className="mt-0">
            <div className="overflow-hidden">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left py-1 px-1.5">DEX</th>
                    <th className="text-left py-1 px-1.5">Parite</th>
                    <th className="text-right py-1 px-1.5">Fiyat</th>
                    <th className="text-right py-1 px-1.5">24s</th>
                  </tr>
                </thead>
                <tbody>
                  {exchangeRates.map((rate, i) => (
                    <tr key={i} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-1 px-1.5">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${rate.color} flex-shrink-0`}></div>
                          <span className="font-medium">{rate.dex}</span>
                        </div>
                      </td>
                      <td className="py-1 px-1.5">{rate.pair}</td>
                      <td className="py-1 px-1.5 text-right font-mono">${rate.price}</td>
                      <td className={`py-1 px-1.5 text-right ${rate.positive ? 'text-green-500' : 'text-red-500'}`}>
                        {rate.change24h}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center text-muted-foreground text-[9px] p-1">
              Fiyat verileri 15 dakikada bir güncellenir
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 