"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "relative inline-flex h-11 min-w-[230px] items-center justify-center rounded-pill border border-stroke-button px-6",
          "bg-rose-violet text-[18px] font-medium tracking-tight text-violet-10",
          "shadow-[0_8px_24px_-8px_rgba(162,51,125,0.55)]",
          "transition-transform duration-150 active:scale-[0.98]",
          "disabled:opacity-50",
          className,
        )}
      >
        <span className="relative">{children}</span>
      </button>
    );
  },
);
PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
