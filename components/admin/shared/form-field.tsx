"use client";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const fieldClass =
  "w-full border border-secondary bg-background px-3 py-2 text-sm text-white outline-none transition-colors focus:border-primary";

interface FormFieldProps {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({ label, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <span className="block text-sm text-secondary">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-400">{error}</span>}
    </div>
  );
}
