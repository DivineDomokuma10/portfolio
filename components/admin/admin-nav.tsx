"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { ExternalLink, LogOut } from "lucide-react";

import { logoutAction } from "@/app/admin/actions/auth";
import { cn } from "@/lib/utils";

const LINKS = [
  { text: "Projects", path: "/admin/projects" },
  { text: "Skills", path: "/admin/skills" },
  { text: "About", path: "/admin/about" },
  { text: "Contact", path: "/admin/contact" },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <header className="sticky top-0 z-40 border-b border-secondary bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-5">
          <span className="text-sm font-semibold text-white">Admin</span>

          <nav aria-label="Admin navigation" className="flex items-center gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                aria-current={pathname === link.path ? "page" : undefined}
                className={cn(
                  "rounded-sm px-2.5 py-1.5 text-xs font-medium text-secondary transition-colors hover:text-white",
                  { "text-white bg-primary-opacity": pathname === link.path },
                )}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-secondary sm:inline">{email}</span>

          <Link
            href="/"
            target="_blank"
            aria-label="View site"
            className="p-2 text-secondary transition-colors hover:text-white"
          >
            <ExternalLink size={14} />
          </Link>

          <button
            type="button"
            onClick={() => startTransition(() => void logoutAction())}
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-sm border border-secondary px-2.5 py-1.5 text-xs text-white transition-colors hover:border-primary disabled:opacity-60"
          >
            <LogOut size={14} />
            {isPending ? "Signing out…" : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
}
