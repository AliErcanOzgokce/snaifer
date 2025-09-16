"use client";

import { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol?: string;
  theme?: "light" | "dark";
  height?: string;
}

export function TradingViewChart({
  symbol = "BITSTAMP:ETHUSD",
  theme = "dark",
  height = "500px"
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const script = document.createElement("script");
    scriptRef.current = script;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";
    
    // TradingView widget configuration
    script.innerHTML = JSON.stringify({
      "allow_symbol_change": true,
      "calendar": false,
      "details": false,
      "hide_side_toolbar": true,
      "hide_top_toolbar": false,
      "hide_legend": false,
      "hide_volume": false,
      "hotlist": false,
      "interval": "D",
      "locale": "en",
      "save_image": true,
      "style": "1",
      "symbol": symbol,
      "theme": theme,
      "timezone": "Etc/UTC",
      "backgroundColor": "#0F0F0F",
      "gridColor": "rgba(242, 242, 242, 0.06)",
      "watchlist": [],
      "withdateranges": false,
      "compareSymbols": [],
      "studies": [],
      "autosize": true
    });

    // Add script to container
    if (containerRef.current) {
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "tradingview-widget-container__widget";
      widgetContainer.style.height = "calc(100% - 32px)";
      widgetContainer.style.width = "100%";
      
      const container = containerRef.current;
      container.appendChild(widgetContainer);
      container.appendChild(script);
      
      scriptLoadedRef.current = true;
    }

    return () => {
      scriptLoadedRef.current = false;
      
      // Script referansını kullanarak temizleme yapıyoruz
      const scriptElement = scriptRef.current;
      
      const container = containerRef.current;
      if (container && scriptElement && container.contains(scriptElement)) {
        try {
          container.removeChild(scriptElement);
        } catch (e) {
          console.error("Failed to remove script:", e);
        }

        // Diğer içerikleri temizle
        container.innerHTML = '';
      }
    };
  }, [symbol, theme]);

  return (
    <div 
      ref={containerRef} 
      className="tradingview-widget-container" 
      style={{ height, width: "100%" }}
    />
  );
} 