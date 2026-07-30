"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function PageTransition({ children, className }: Props) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
