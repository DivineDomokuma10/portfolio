"use client";
import { createContext, useContext, useRef } from "react";
import { motion, useInView } from "motion/react";

import type { RevealDirection } from "@/lib/animations";
import { revealVariants, spring, useReducedMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { TMarginType } from "@/types";

interface StaggerCtxValue {
  isInView: boolean;
  staggerDelay: number;
  direction: RevealDirection;
}

interface Props {
  once?: boolean;
  className?: string;
  margin?: TMarginType;
  staggerDelay?: number;
  children: React.ReactNode;
  direction?: RevealDirection;
}

const StaggerCtx = createContext<StaggerCtxValue>({
  isInView: false,
  staggerDelay: 0.12,
  direction: "up",
});

export function StaggerGroup({
  children,
  className,
  once = true,
  margin = "-80px",
  direction = "up",
  staggerDelay = 0.12,
}: Props) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isInView = useInView(ref, { once, margin: margin });

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <StaggerCtx.Provider value={{ isInView, staggerDelay, direction }}>
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    </StaggerCtx.Provider>
  );
}

export function StaggerItem({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const { isInView, staggerDelay, direction } = useContext(StaggerCtx);
  const variant = revealVariants[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={variant.hidden}
      animate={isInView ? variant.visible : variant.hidden}
      transition={{ ...spring.smooth, delay: index * staggerDelay }}
    >
      {children}
    </motion.div>
  );
}

export function WaveStaggerItem({
  children,
  index,
  directions,
  className,
}: {
  children: React.ReactNode;
  index: number;
  directions: RevealDirection[];
  className?: string;
}) {
  const { isInView, staggerDelay } = useContext(StaggerCtx);
  const dir = directions[index % directions.length];
  const variant = revealVariants[dir];

  return (
    <motion.div
      className={cn(className)}
      initial={variant.hidden}
      animate={isInView ? variant.visible : variant.hidden}
      transition={{ ...spring.smooth, delay: index * staggerDelay }}
    >
      {children}
    </motion.div>
  );
}
