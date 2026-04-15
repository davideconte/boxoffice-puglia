"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold tracking-tight uppercase transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-4 border-brand-dark shadow-[4px_4px_0_#1B1B1B] active:translate-x-1 active:translate-y-1 active:shadow-none hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_#1B1B1B]",
          {
            "bg-brand-blue text-white": variant === "primary",
            "bg-white text-brand-dark": variant === "secondary",
            "bg-brand-lime text-brand-dark": variant === "ghost",
            "bg-brand-red text-white": variant === "danger",
          },
          {
            "text-base px-6 py-2.5": size === "sm",
            "text-xl px-10 py-4": size === "md",
            "text-2xl px-12 py-5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
