"use client";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

import Nav, { SideBar } from "./nav";
import { cn } from "@/lib/utils";
import { SkipLink } from "./skip-link";

interface IProps {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export const Wrapper = ({ children, footer }: IProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const onDropToggle = () => setIsDropDownOpen((prev) => !prev);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <SkipLink />

      <Nav {...{ onDropToggle, isDropDownOpen }} />

      <AnimatePresence>
        {isDropDownOpen && <SideBar {...{ onDropToggle }} />}
      </AnimatePresence>

      <div id="main-content" className="w-full flex flex-col items-center">
        {children}
      </div>

      {footer}
    </div>
  );
};

export const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <Image alt="logo" src="/logo.svg" width={25} height={25} />
      <span className="text-primary font-bold font-fira md:text-lg">
        Divine Domokuma
      </span>
    </div>
  );
};

export const SectionHeader = ({ title, className }: SectionHeaderProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-80px" });

  return (
    <header
      ref={ref}
      className={cn(
        "flex-1 flex space-x-4 items-center overflow-hidden",
        className,
      )}
    >
      <motion.h2
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
      </motion.h2>

      <motion.div
        className="flex-1 h-0.5 bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      />
    </header>
  );
};

export const MasonryGrid = ({ children, className }: IProps) => {
  return <div className={cn("w-full", className)}>{children}</div>;
};

export const PageHeader = ({
  desc,
  title,
}: SectionHeaderProps & { desc: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-80px" });

  return (
    <header
      ref={ref}
      className="flex-1 flex flex-col space-y-4 py-7 overflow-hidden"
    >
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
          /
        </motion.span>
        {title}
      </motion.h1>

      <motion.p
        className="text-gray-300"
        initial={{ x: -30, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
      >
        {desc}
      </motion.p>
    </header>
  );
};
