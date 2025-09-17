"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShellProps {
  children: ReactNode;
  className?: string;
  showGradient?: boolean;
}

export function Shell({ children, className, showGradient = true }: ShellProps) {
  return (
    <div className={cn("min-h-screen bg-background relative", className)}>
      {/* Gradient Background */}
      {showGradient && (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-hover/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />
        </div>
      )}
      
      {/* Main Content */}
      <div className="relative z-10">
        <div className="container-app">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ShellHeaderProps {
  children: ReactNode;
  className?: string;
}

export function ShellHeader({ children, className }: ShellHeaderProps) {
  return (
    <header className={cn(" mb-6 backdrop-blur-md border-b border-border/20", className)}>
      <div className="container-app py-3 sm:py-6 mt-25 px-2 sm:px-6">
        {children}
      </div>
    </header>
  );
}

interface ShellContentProps {
  children: ReactNode;
  className?: string;
}

export function ShellContent({ children, className }: ShellContentProps) {
  return (
    <main className={cn("py-3 sm:py-8 px-2 sm:px-6", className)}>
      {children}
    </main>
  );
}
