import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-foreground hover:bg-primary-hover active:bg-primary-hover disabled:bg-secondary disabled:text-muted-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-accent text-accent-foreground hover:bg-accent-hover",
        secondary:
          "bg-accent text-accent-foreground hover:bg-accent-hover border border-border",
        ghost:
          "bg-transparent text-primary hover:bg-transparent2",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-2.5 has-[>svg]:px-2",
        lg: "h-10 rounded-xl px-4 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
