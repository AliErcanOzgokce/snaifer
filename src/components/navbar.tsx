"use client";

import {
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { ConnectWallet } from "@/components/connect-wallet";
import Image from "next/image";
import snaife from "@/assets/snaife.png";

export default function NavbarComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4 animate-in fade-in slide-in-from-top-4 duration-1000 delay-100">
      <div className="bg-glass backdrop-blur-md border border-border/30 rounded-2xl shadow-2xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">
        <div className="flex h-14 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 transition-all duration-300 hover:scale-105 group"
            >
              <Image src={snaife} alt="Snaife" width={32} height={32} className="rounded-lg brightness-0 invert" />
              <span className="hidden sm:block text-xl font-bold text-foreground">
                snaife
              </span>
            </Link>
          </div>

         

          {/* CTA & Actions */}
          <div className="flex items-center space-x-3">
            <ConnectWallet />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 rounded-xl transition-all duration-300 hover:bg-accent/50 hover:scale-110"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
