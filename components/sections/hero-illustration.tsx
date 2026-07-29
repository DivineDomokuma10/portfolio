"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export function HeroIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-fit w-fit"
    >
      <Image
        src="/logo-outline2.png"
        alt=""
        aria-hidden
        width={155}
        height={155}
        loading="lazy"
        className="animate-float-slow absolute top-1/4 left-0 -z-10 h-26 w-26 md:h-38.75 md:w-38.75"
        style={{
          transform: `translate(${offset.x * -16}px, ${offset.y * -16}px)`,
        }}
      />

      <Image
        src="/guy-image.svg"
        alt="Developer illustration"
        width={457}
        height={386}
        sizes="(max-width: 768px) 307px, 457px"
        className="h-65 w-76.75 md:h-96.5 md:w-114.25"
        style={{
          transform: `translate(${offset.x * 8}px, ${offset.y * 8}px)`,
        }}
        priority
      />

      <Image
        src="/Dots.svg"
        alt=""
        aria-hidden
        width={84}
        height={84}
        loading="lazy"
        className="animate-float absolute right-0 bottom-10 h-16 w-16 md:h-20 md:w-20"
        style={{
          transform: `translate(${offset.x * 24}px, ${offset.y * 24}px)`,
        }}
      />
    </div>
  );
}