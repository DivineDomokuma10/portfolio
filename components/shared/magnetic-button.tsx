"use client";
import Link from "next/link";

import { Magnetic } from "../animations/magnetic";
import { cn } from "@/lib/utils";

export function MagneticButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Magnetic factor={0.3} className="inline-block">
      <Link
        href={href}
        className={cn(
          "block px-5 py-2.5 text-sm font-medium transition-colors duration-200 border rounded-md",
          "bg-primary text-background border-primary hover:bg-primary/90",
          className
        )}
      >
        {children}
      </Link>
    </Magnetic>
  );
}