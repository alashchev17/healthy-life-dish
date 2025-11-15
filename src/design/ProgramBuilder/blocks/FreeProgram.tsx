"use client";

import type { ReactNode } from "react";

import type { FreeProgram as FreeProgramBlock } from "#/sanity/types";

import { Promo } from "#/design/shared";

export type FreeProgramProps = {
  block: FreeProgramBlock;
};

export function FreeProgram({ block }: FreeProgramProps): ReactNode {
  const { description, button } = block;

  if (!description) return null;

  return (
    <Promo
      text={description}
      image={{
        src: "/landing/promo-img.png?url",
        alt: "Imagery: Promo section",
        width: 214,
        height: 171,
      }}
      buttons={
        button
          ? [
              {
                text: button.text || "",
                href: button.link || undefined,
                variant: "secondary",
              },
            ]
          : undefined
      }
      className="flex flex-col items-center justify-center min-h-[500px] px-8"
      textClassName="lg:!text-[2.5rem]"
      containerClassName="!max-w-[750px]"
      // textClassName="!font-medium !text-3xl !leading-relaxed"
      showGradientCircles={true}
    />
  );
}
