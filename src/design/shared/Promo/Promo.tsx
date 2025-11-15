"use client";

import { FC, ReactNode } from "react";
import Image from "next/image";
import { Container } from "#/design/shared";
import { Button, HighlightedText } from "#/design/ui";
import { GradientCircle } from "#/design/icons";
import type { HighlightText } from "#/sanity/types";

export type PromoButton = {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "special-dark";
  className?: string;
};

type PromoProps = {
  text: HighlightText;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  decoration?: ReactNode;
  buttons?: PromoButton[];
  renderButtons?: () => ReactNode;
  className?: string;
  containerClassName?: string;
  textClassName?: string;
  showGradientCircles?: boolean;
  gradientBackground?: boolean;
};

export const Promo: FC<PromoProps> = ({
  text,
  image,
  decoration,
  buttons,
  renderButtons,
  className = "",
  containerClassName = "",
  textClassName = "",
  showGradientCircles = true,
  gradientBackground = false,
}) => {
  const handleButtonClick = (button: PromoButton) => {
    if (button.href) {
      window.location.href = button.href;
    } else if (button.onClick) {
      button.onClick();
    }
  };

  return (
    <section className={`relative py-32 lg:py-20 overflow-hidden ${className}`}>
      {gradientBackground && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-acid/10 to-transparent pointer-events-none" />
      )}

      {showGradientCircles && (
        <>
          <GradientCircle className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-green-acid h-[350px] aspect-square lg:h-auto" />
          <GradientCircle className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-green-acid h-[350px] aspect-square lg:h-auto" />
        </>
      )}

      <Container>
        <div
          className={`relative z-10 flex flex-col items-center gap-8 lg:gap-14 max-w-[700px] mx-auto ${containerClassName}`}
        >
          {image && (
            <div className="flex justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            </div>
          )}

          {decoration && (
            <div className="flex justify-center">{decoration}</div>
          )}

          <HighlightedText
            value={text}
            variant="title1"
            className={`font-normal text-white text-center !leading-none ${textClassName}`}
          />

          {renderButtons ? (
            renderButtons()
          ) : buttons && buttons.length > 0 ? (
            <div className="flex items-center gap-2 lg:gap-4 w-full sm:w-auto justify-center">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "secondary"}
                  onClick={() => handleButtonClick(button)}
                  className={`whitespace-nowrap ${button.className || ""}`}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
};
