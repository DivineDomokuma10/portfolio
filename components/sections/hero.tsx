"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { HeroIllustration } from "./hero-illustration";
import { MagneticButton } from "../shared/magnetic-button";

const heading = "Building scalable web applications.";

const HeroSection = () => {
  return (
    <section className="flex w-full flex-col justify-center gap-10 p-7 md:min-h-[60dvh] md:flex-row md:items-center md:justify-between">
      <div className="w-full space-y-5 md:w-[45%]">
        <motion.h1
          className="text-primary text-3xl font-bold leading-tight md:text-5xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {heading.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", damping: 12, stiffness: 100 },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          Frontend Developer who prioritizes performance, maintainability, and
          user experience.
        </motion.p>

        <motion.div
          className="flex items-center gap-4 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        >
          <MagneticButton href="/#contact">Get in Touch</MagneticButton>

          <Link
            href="/works"
            className="group flex items-center gap-2 border border-primary px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary hover:text-background rounded-md"
          >
            <span>View My Work</span>
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      <div className="flex w-full justify-center md:w-[45%]">
        <HeroIllustration />
      </div>
    </section>
  );
};

export default HeroSection;