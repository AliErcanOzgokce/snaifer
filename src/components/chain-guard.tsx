"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface ChainGuardProps {
  tokenChain: string;
  walletChain?: string;
  children: ReactNode;
  className?: string;
}

export function ChainGuard({ tokenChain, walletChain, children, className }: ChainGuardProps) {
  const isChainMatch = !walletChain || walletChain === tokenChain;
  
  const getChainColor = (chain: string) => {
    switch (chain.toLowerCase()) {
      case "ethereum":
      case "eth":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "solana":
      case "sol":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "sui":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "polygon":
      case "matic":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Chain Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Badge className={getChainColor(tokenChain)}>
            {tokenChain}
          </Badge>
          
          {walletChain && (
            <>
              <span className="text-muted-foreground">→</span>
              <Badge className={getChainColor(walletChain)}>
                {walletChain}
              </Badge>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {isChainMatch ? (
            <div className="flex items-center space-x-1 text-success">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Eşleşiyor</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-warning">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">Zincir Uyumsuz</span>
            </div>
          )}
        </div>
      </div>

      {/* Warning Banner */}
      {!isChainMatch && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-warning mb-1">Zincir Uyumsuzluğu</p>
              <p className="text-muted-foreground">
                Cüzdanınız <strong>{walletChain}</strong> ağında, ancak token <strong>{tokenChain}</strong> ağında. 
                İşlem yapmadan önce ağ değiştirmeniz gerekebilir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(
        "transition-opacity duration-300",
        !isChainMatch && "opacity-50"
      )}>
        {children}
      </div>
    </div>
  );
}
