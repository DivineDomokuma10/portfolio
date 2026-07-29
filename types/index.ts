export type P<T> = {
  [K in keyof T]: T[K];
} & {};

export type TCardBtnVariant = "live" | "github";

type MarginValue = `${number}${"px" | "%"}`;

export type TMarginType =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;
