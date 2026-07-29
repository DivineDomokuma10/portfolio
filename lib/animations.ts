import { useEffect, useState } from "react";

export const spring = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 14 },
  smooth: { type: "spring" as const, stiffness: 120, damping: 16 },
  gentle: { type: "spring" as const, stiffness: 70, damping: 20 },
};

export const revealVariants = {
  up: {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  down: {
    hidden: { y: -40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  left: {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  right: {
    hidden: { x: 60, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.92, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
} as const;

export type RevealDirection = keyof typeof revealVariants;

export const waveDirections: Array<RevealDirection> = ["left", "down", "right"];

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
