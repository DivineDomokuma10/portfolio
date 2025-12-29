import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (text: string): string => {
  if (text) {
    return text.replace(text[0], text[0].toUpperCase());
  } else {
    return " ";
  }
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
