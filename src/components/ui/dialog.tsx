import * as React from 'react';
import { createPortal } from 'react-dom';

export function Dialog({ open, onOpenChange, children }: { 
  open: boolean; 
  onOpenChange: (v: boolean) => void; 
  children: React.ReactNode; 
}) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { 
      document.body.style.overflow = prev; 
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-[100]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      {children}
    </div>,
    document.body
  );
}

export function DialogOverlay() {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] will-change-opacity animate-in fade-in duration-300" />
  );
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,520px)] rounded-2xl border border-border/20 bg-glass backdrop-blur-sm shadow-2xl shadow-black/20 p-6 focus:outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
      {children}
    </div>
  );
}