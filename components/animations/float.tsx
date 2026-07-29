import { cn } from "@/lib/utils";

type FloatSpeed = "normal" | "slow" | "reverse" | "spin";

interface Props {
  children: React.ReactNode;
  speed?: FloatSpeed;
  className?: string;
}

const floatClasses: Record<FloatSpeed, string> = {
  normal: "animate-float",
  slow: "animate-float-slow",
  reverse: "animate-float-reverse",
  spin: "animate-float-spin",
};

export function Float({ children, speed = "normal", className }: Props) {
  return <div className={cn(floatClasses[speed], className)}>{children}</div>;
}
