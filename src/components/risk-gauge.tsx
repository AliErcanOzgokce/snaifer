"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface RiskGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function RiskGauge({ score, size = "lg", showLabel = true, className }: RiskGaugeProps) {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Düşük Risk", color: "risk-low", bgColor: "risk-bg-low" };
    if (score >= 60) return { level: "Orta Risk", color: "risk-medium", bgColor: "risk-bg-medium" };
    return { level: "Yüksek Risk", color: "risk-high", bgColor: "risk-bg-high" };
  };

  const risk = getRiskLevel(score);
  
  const sizeClasses = {
    sm: "w-16 h-16 text-xl",
    md: "w-20 h-20 text-2xl", 
    lg: "w-24 h-24 text-3xl"
  };

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Risk Score Circle */}
      <div className={cn(
        "relative inline-flex items-center justify-center rounded-full shadow-2xl",
        sizeClasses[size],
        risk.bgColor,
        "border-2 border-border/20"
      )}>
        <span className={cn("font-bold", risk.color)}>
          {score}
        </span>
        
        {/* Gradient Halo Effect */}
        <div className={cn(
          "absolute inset-0 rounded-full opacity-20 blur-xl",
          risk.color === "risk-low" && "bg-success",
          risk.color === "risk-medium" && "bg-warning", 
          risk.color === "risk-high" && "bg-destructive"
        )} />
      </div>

      {/* Risk Label */}
      {showLabel && (
        <div className="text-center">
          <Badge 
            className={cn(
              "text-sm px-4 py-2 font-semibold",
              risk.color === "risk-low" && "bg-success/10 text-success border-success/20",
              risk.color === "risk-medium" && "bg-warning/10 text-warning border-warning/20",
              risk.color === "risk-high" && "bg-destructive/10 text-destructive border-destructive/20"
            )}
          >
            {risk.level}
          </Badge>
        </div>
      )}
    </div>
  );
}
