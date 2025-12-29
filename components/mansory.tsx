import { ReactNode } from "react";

export function MasonryGrid({ children }: { children: ReactNode }) {
  return <div className="columns-3">{children}</div>;
}
