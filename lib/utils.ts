import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text: string): string => {
  if (!text) return " ";
  const first = text[0];
  if (!first) return " ";
  return text.replace(first, first.toUpperCase());
};

export const toSentenceCase = (value: string) => {
  return value === " "
    ? " "
    : value
        .split(" ")
        .map((w) => capitalize(w))
        .join(" ");
};

export const toUpperHypeCase = (value: string) => {
  return value === ""
    ? " "
    : value
        .split(" ")
        .map((w) => capitalize(w))
        .join("-");
};
