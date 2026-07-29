"use client";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

import Nav, { SideBar } from "./nav";
import { cn } from "@/lib/utils";
import Footer from "./footer";
import { SkipLink } from "./skip-link";

interface SectionHeaderProps {
  title: string;
}

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const onDropToggle = () => setIsDropDownOpen((prev) => !prev);

  return (
    <main className="w-full h-full flex flex-col items-center">
      <SkipLink />

      <Nav {...{ onDropToggle, isDropDownOpen }} />

      <AnimatePresence>
        {isDropDownOpen && <SideBar {...{ onDropToggle }} />}
      </AnimatePresence>

      <div id="main-content" className="w-full flex flex-col items-center">
        {children}
      </div>

      <Footer />
    </main>
  );
};

export const Logo = () => {
  return (
    <header className="flex items-center space-x-3">
      <Image alt="logo" src="/logo.svg" width={25} height={25} />
      <h1 className="text-primary font-bold font-fira md:text-lg">
        Divine Domokuma
      </h1>
    </header>
  );
};

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-80px" });

  return (
    <header ref={ref} className="flex-1 flex space-x-4 items-center overflow-hidden">
      <motion.h1
        className="font-medium text-white text-2xl md:text-3xl whitespace-nowrap"
        initial={{ x: -30, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.span
          className="text-primary inline-block"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          #
        </motion.span>
        {title}
      </motion.h1>

      <motion.div
        className="flex-1 h-0.5 bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      />
    </header>
  );
};

export function MasonryGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
