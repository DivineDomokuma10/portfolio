"use client";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isPending: boolean;
  children: ReactNode;
  className?: string;
}

export function SubmitButton({ isPending, children, className }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={cn(
        "border border-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary hover:text-background disabled:opacity-60",
        className,
      )}
    >
      {isPending ? "Saving…" : children}
    </button>
  );
}
