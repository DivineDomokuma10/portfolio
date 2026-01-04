export type P<T> = {
  [K in keyof T]: T[K];
} & {};

export type TCardBtnVariant = "live" | "github";
