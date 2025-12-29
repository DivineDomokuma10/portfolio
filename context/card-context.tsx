"use client";
import { createContext, ReactNode, useContext } from "react";

export interface ICardContext {
  img?: string;
  techs: Array<string>;
  links?: {
    github: string;
    live: string;
  };
}

interface ICardProvider {
  children: ReactNode;
  value: ICardContext;
}

const CardContext = createContext<ICardContext | undefined>(undefined);

export const CardContextProvider = ({ children, value }: ICardProvider) => {
  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardContext = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCardContext mut be used inside a CardContextProvider");
  }

  return context;
};
