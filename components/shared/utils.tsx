"use client";
import Image from "next/image";
import { Activity, ReactNode, useState } from "react";

import Nav, { SideBar } from "./nav";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
}

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);

  const onDropToggle = () => setIsDropDownOpen((prev) => !prev);

  return (
    <main className="w-full h-full flex flex-col items-center">
      <Nav {...{ onDropToggle }} />

      <Activity mode={isDropDownOpen ? "visible" : "hidden"}>
        <SideBar {...{ onDropToggle }} />
      </Activity>

      {children}
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
  return (
    <header className="flex-1 flex space-x-4 items-center">
      <h1 className="font-medium text-white text-2xl md:text-3xl">
        <span className="text-primary">#</span>
        {title}
      </h1>

      <div className="flex-1 h-0.5 bg-primary" />
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
