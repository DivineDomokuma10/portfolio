"use client";
import Link from "next/link";
import { Command, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { Logo } from "./utils";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constant";

interface INav {
  onDropToggle: () => void;
}

const Nav = ({ onDropToggle }: INav) => {
  const pathname = usePathname();

  return (
    <nav className="w-full h-fit flex items-center justify-between px-5 py-7 transition-all duration-200 z-40 md:w-5/6">
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
    </nav>
  );
};

export const SideBar = ({ onDropToggle }: INav) => {
  const pathname = usePathname();

  return (
    <section className="w-full h-full bg-background fixed top-0 left-0 z-50 flex flex-col p-5 space-y-3 md:hidden">
      <header className="w-full flex items-center justify-between">
        <Logo />

        <div
          onClick={onDropToggle}
          className="group p-2 rounded-md hover:bg-primary-opacity md:hidden"
        >
          <X className="w-5 h-5 text-white font-bold duration-150 group-hover:text-primary" />
        </div>
      </header>

      <section className="flex flex-col space-y-3">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              "text-lg py-2 px-3 rounded-sm font-medium text-secondary duration-200 hover:text-white hover:bg-primary-opacity",
              {
                "text-white bg-primary-opacity": pathname === link.path,
              }
            )}
          >
            <span className="text-primary">#</span>
            {link.text}
          </Link>
        ))}
      </section>
    </section>
  );
};

export default Nav;
