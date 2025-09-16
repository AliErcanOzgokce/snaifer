"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CategoryData {
  name: string;
  score: number;
  color: string;
  description: string;
  weight: number;
}

interface CategoryBarsProps {
  data: CategoryData[];
  className?: string;
}

export function CategoryBars({ data, className }: CategoryBarsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 text-foreground">Risk Kategorileri</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="text-sm">Nasıl hesaplanır?</span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-80">
              <div className="space-y-2">
                <p className="font-semibold">Risk Skoru Hesaplama:</p>
                <ul className="text-sm space-y-1">
                  {data.map((item) => (
                    <li key={item.name} className="flex justify-between">
                      <span>{item.name}:</span>
                      <span className="font-mono">{item.weight}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-3">
        {data.map((category, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {category.name}
                      </span>
                    </div>
                    <span className={cn(
                      "text-sm font-bold",
                      category.score >= 80 ? "text-success" : 
                      category.score >= 60 ? "text-warning" : "text-destructive"
                    )}>
                      {category.score}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <Progress 
                      value={category.score} 
                      className="h-2 bg-accent/30"
                    />
                    <div 
                      className="absolute top-0 left-0 h-2 rounded-full transition-all duration-700"
                      style={{ 
                        width: `${category.score}%`,
                        backgroundColor: category.color,
                        opacity: 0.8
                      }}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-80">
                <div className="space-y-2">
                  <p className="font-semibold">{category.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="flex justify-between text-xs">
                    <span>Skor: {category.score}/100</span>
                    <span>Ağırlık: %{category.weight}</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
