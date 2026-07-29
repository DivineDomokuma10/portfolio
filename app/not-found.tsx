"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Magnetic } from "@/components/animations/magnetic";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 px-7 py-24 text-center">
      <Reveal direction="up" className="flex flex-col items-center gap-4">
        <span className="text-primary text-8xl font-bold leading-none">404</span>

        <h1 className="text-white text-2xl font-semibold md:text-3xl">
          Page not found
        </h1>

        <p className="text-secondary text-sm max-w-md leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </Reveal>

      <Reveal direction="up" delay={0.2}>
        <Magnetic factor={0.2}>
          <Link
            href="/"
            className="flex items-center gap-2 border border-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary hover:text-background rounded-md"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}