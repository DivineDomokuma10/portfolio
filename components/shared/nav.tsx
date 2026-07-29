"use client";
import Link from "next/link";
import { Command } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Logo } from "./utils";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constant";

interface INav {
  onDropToggle: () => void;
}

const Nav = ({ onDropToggle }: INav) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="sticky top-4 z-40 w-full flex justify-center px-4"
      layout
    >
      <div
className={cn(
  "w-full md:w-5/6 rounded-xl transition-all duration-300 flex items-center justify-between px-5 border",
  scrolled
    ? "py-3 bg-background/80 backdrop-blur-md border-secondary/20 shadow-sm"
    : "py-7 border-transparent"
)}
      >
        <Logo />

        <div className="items-center space-x-7 hidden md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "text-sm font-medium text-secondary duration-200 hover:text-white",
                {
                  "text-white": pathname === link.path,
                }
              )}
            >
              <span className="text-primary">#</span>
              {link.text}
            </Link>
          ))}
        </div>

        <div
          onClick={onDropToggle}
          className="group p-2 rounded-md hover:bg-primary-opacity md:hidden"
        >
          <Command className="w-5 h-5 text-white font-bold duration-150 group-hover:text-primary" />
        </div>
      </div>
    </motion.nav>
  );
};

export const SideBar = ({ onDropToggle }: INav) => {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed top-28 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] md:w-5/6 md:hidden rounded-xl bg-background/80 backdrop-blur-md border border-secondary/20 shadow-sm flex flex-col p-5 space-y-3 origin-top z-30"
    >
      {NAV_LINKS.map((link, i) => (
        <motion.div
          key={link.path}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 * i }}
        >
          <Link
            href={link.path}
            onClick={onDropToggle}
            className={cn(
              "text-lg py-2 px-3 rounded-sm font-medium text-secondary duration-200 hover:text-white hover:bg-primary-opacity block",
              {
                "text-white bg-primary-opacity": pathname === link.path,
              }
            )}
          >
            <span className="text-primary">#</span>
            {link.text}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Nav;
