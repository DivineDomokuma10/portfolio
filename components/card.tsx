"use client";
import Image from "next/image";
import { HTMLAttributes } from "react";

import {
  CardContextProvider,
  ICardContext,
  useCardContext,
} from "@/context/card-context";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement>;

export const Card = ({
  className,
  children,
  cardData,
}: Props & {
  cardData: ICardContext;
}) => {
  return (
    <CardContextProvider value={cardData}>
      <div
        className={cn(
          "group h-fit border-2 border-secondary inline-flex flex-col transition-all duration-200 hover:border-primary",
          className
        )}
      >
        {children}
      </div>
    </CardContextProvider>
  );
};

export const CardTools = ({ className }: Props) => {
  const { techs } = useCardContext();

  return (
    <div
      className={cn(
        "w-full flex flex-wrap items-center space-x-2.5 gap-1.5 p-2",
        className
      )}
    >
      {techs.map((tech, i) => (
        <span key={i} className="text-secondary font-light text-xs">
          {tech}
        </span>
      ))}
    </div>
  );
};

export const CardImage = ({ className }: Props) => {
  const { img } = useCardContext();

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {img ? (
        <Image
          fill
          quality={100}
          alt="card-img"
          src={img}
          className="w-full h-full absolute object-fill transition-all duration-200 hover:scale-110"
        />
      ) : (
        <></>
      )}
    </div>
  );
};
