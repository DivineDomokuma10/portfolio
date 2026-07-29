"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

import { cn } from "@/lib/utils";
import { TMarginType } from "@/types";
import type { RevealDirection } from "@/lib/animations";
import { revealVariants, spring, useReducedMotion } from "@/lib/animations";

interface Props {
  delay?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "span";
  margin?: TMarginType;
  children: React.ReactNode;
  direction?: RevealDirection;
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  once = true,
  direction = "up",
  margin = "-80px",
}: Props) {
  const Tag = motion[as];
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isInView = useInView(ref, { once, margin: margin });

  const variant = revealVariants[direction];

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      initial={variant.hidden}
      animate={isInView ? variant.visible : variant.hidden}
      transition={{ ...spring.smooth, delay }}
    >
      {children}
    </Tag>
  );
}
