import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-4 font-mono",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground border-primary hover:translate-x-1 hover:translate-y-1 hard-shadow",
        secondary: "bg-secondary text-secondary-foreground border-primary hover:translate-x-1 hover:translate-y-1 hard-shadow-secondary",
        ghost: "border-primary bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground border-destructive hover:opacity-90",
        outline: "border-border bg-background hover:bg-muted",
      },
      size: {
        default: "h-14 px-8 py-4 text-base",
        sm: "h-10 px-6 text-sm",
        lg: "h-20 px-12 text-xl",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const BrutalistButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
BrutalistButton.displayName = "BrutalistButton";

export { BrutalistButton, buttonVariants };
