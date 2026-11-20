"use client";
import Image from "next/image";
import { HTMLAttributes } from "react";

import {
  CardContextProvider,
  ICardContext,
  useCardContext,
} from "@/context/card-context";
import { capitalize, cn } from "@/lib/utils";
import { TCardBtnVariant } from "@/types";
import { Code, Link } from "lucide-react";

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
          "group h-fit border-2 border-secondary flex flex-col transition-all duration-200 hover:border-primary",
          className,
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
        className,
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
  const { img, textInfo } = useCardContext();

  return (
    <>
      {img ? (
        <div className={cn("overflow-hidden relative", className)}>
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            quality={80}
            alt={textInfo?.title ?? "Project screenshot"}
            src={img}
            loading="lazy"
            className="w-full h-full top-0 absolute object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export const CardButton = ({
  variant,
  className,
}: { variant: TCardBtnVariant } & Props) => {
  const { links } = useCardContext();

  const link = links?.[variant as keyof typeof links];
  const isAvailable = Boolean(link && link !== "/");

  const unavailableText = variant === "live" ? "Demo on request" : capitalize(variant);
  const label = isAvailable
    ? `${capitalize(variant)} link`
    : variant === "live"
      ? "Demo available on request"
      : `${capitalize(variant)} link unavailable`;

  if (!isAvailable) {
    return (
      <span
        aria-disabled="true"
        aria-label={label}
        className={cn(
          "py-2 px-3 flex items-center space-x-3 border text-xs text-secondary",
          className,
          {
            "border-primary": variant === "live",
            "border-secondary": variant === "github",
          },
        )}
      >
        <span>{unavailableText}</span>
        {variant === "live" ? <Link size={15} /> : <Code size={15} />}
      </span>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={cn(
        "py-2 px-3 flex items-center space-x-3 border text-xs text-white",
        className,
        {
          "border-primary": variant === "live",
          "border-secondary": variant === "github",
        },
      )}
    >
      <span>{capitalize(variant)}</span>
      {variant === "live" ? <Link size={15} /> : <Code size={15} />}
    </a>
  );
};
