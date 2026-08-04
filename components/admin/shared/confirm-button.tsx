"use client";
import { useEffect, useRef, useState, useTransition } from "react";

import { cn } from "@/lib/utils";

interface ConfirmButtonProps {
  onConfirm: () => Promise<unknown> | unknown;
  label?: string;
  confirmLabel?: string;
}

export function ConfirmButton({
  onConfirm,
  label = "Delete",
  confirmLabel = "Confirm?",
}: ConfirmButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleClick() {
    if (confirming) {
      if (timer.current) clearTimeout(timer.current);
      startTransition(async () => {
        await onConfirm();
        setConfirming(false);
      });
    } else {
      setConfirming(true);
      timer.current = setTimeout(() => setConfirming(false), 3000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "px-3 py-1.5 text-xs transition-colors disabled:opacity-60",
        confirming
          ? "border border-red-400 text-red-400 hover:bg-red-400 hover:text-background"
          : "border border-secondary text-white hover:border-red-400 hover:text-red-400",
      )}
    >
      {isPending ? "Deleting…" : confirming ? confirmLabel : label}
    </button>
  );
}
