"use client";

import type { ReactNode } from "react";

import type { FreeProgram as FreeProgramBlock } from "#/sanity/types";

import { HighlightedText } from "#/design/ui";
import { Button } from "#/design/ui";
import { GradientCircle } from "#/design/icons/GradientCircle";

export type FreeProgramProps = {
  block: FreeProgramBlock;
};

export function FreeProgram({ block }: FreeProgramProps): ReactNode {
  const { description, button } = block;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[500px] py-20 px-8">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-acid/10 to-transparent pointer-events-none" />

      {/* Decorative icon */}
      <div className="relative z-10 mb-8">
        <GradientCircle className="w-32 h-32 text-green-acid" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
        <HighlightedText
          value={description!}
          variant="title2"
          className="!font-medium !text-3xl !leading-relaxed"
        />
      </div>

      {/* CTA Button */}
      {button && (
        <div className="relative z-10">
          <Button
            variant="special-dark"
            onClick={() => {
              if (button.link) {
                window.location.href = button.link;
              }
            }}
          >
            {button.text}
          </Button>
        </div>
      )}
    </section>
  );
}
