"use client";

import type { FC } from "react";
import Image from "next/image";

import type { HighlightText } from "#/sanity/types";

import { HighlightedText } from "#/design/ui";
import { GradientCircle } from "#/design/icons/GradientCircle";

export type SloganVariant = "landing" | "programBuilder";

export type SloganProps = {
  slogan: HighlightText;
  variant?: SloganVariant;
};

export const Slogan: FC<SloganProps> = ({ slogan, variant = "landing" }) => {
  const isProgramBuilder = variant === "programBuilder";

  // Section spacing classes
  const sectionClasses = isProgramBuilder
    ? "px-5 md:px-8 lg:px-32 mt-8 md:mt-12 lg:mt-40 mb-20 md:mb-24 lg:mb-[120px]"
    : "px-5 lg:px-32 mt-8 lg:mt-40 mb-[120px]";

  // Content padding classes
  const contentPaddingClasses = isProgramBuilder
    ? "px-5 py-28 md:py-16 lg:py-20 md:px-16 lg:px-40"
    : "px-5 py-12 lg:py-20 lg:px-40";

  // Text size classes
  const textClasses = isProgramBuilder
    ? "relative text-center text-[22px] md:text-[32px] lg:text-[40px] xl:text-[40px] uppercase z-10"
    : "relative text-center xl:text-[40px] uppercase z-10";

  // Border classes
  const borderClasses = isProgramBuilder
    ? "absolute w-full h-full inset-0 z-0 bg-dark-gray border-[3px] md:border-[6px] lg:border-[3px] rounded-2xl md:rounded-[35px] lg:rounded-3xl border-light-gray mix-blend-color-dodge"
    : "absolute w-full h-full inset-0 z-0 bg-dark-gray border-[3px] rounded-3xl border-light-gray mix-blend-color-dodge";

  // Gradient positioning classes
  const gradientClasses = isProgramBuilder
    ? "absolute left-1/2 -translate-x-1/2 top-unset -bottom-2/3 w-[358px] h-[358px] md:w-[700px] md:h-[700px] lg:w-[870px] lg:h-[870px] md:-bottom-full md:translate-y-1/3 md:top-unset lg:translate-y-0 lg:top-4 z-1"
    : "absolute left-1/2 -translate-x-1/2 w-[440px] h-[460px] lg:w-[870px] lg:h-[870px] -bottom-2/3 top-unset lg:top-4 z-1";

  // Left logo positioning
  const leftLogoClasses = isProgramBuilder
    ? "w-[48px] md:w-[115px] lg:w-[182px] h-auto absolute -bottom-10 md:-bottom-14 lg:-bottom-16 top-unset -left-3 md:-left-8 lg:-left-[120px] md:top-auto lg:top-20"
    : "w-[76px] lg:w-[182px] h-auto absolute -bottom-16 top-unset -left-5 lg:-left-[120px] lg:top-20";

  // Right logo positioning
  const rightLogoClasses = isProgramBuilder
    ? "w-[46px] md:w-[110px] lg:w-[223px] h-auto absolute -top-10 md:-top-14 lg:-top-16 -right-3 md:-right-8 lg:-right-[110px] bottom-unset md:bottom-auto lg:bottom-4"
    : "w-[73px] lg:w-[223px] h-auto absolute -top-16 -right-5 bottom-unset lg:-right-[110px] lg:bottom-4";

  return (
    <section className={sectionClasses}>
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl md:rounded-[35px] lg:rounded-3xl">
          <div className={contentPaddingClasses}>
            <HighlightedText
              value={slogan}
              variant="title1"
              className={textClasses}
            />
            <GradientCircle
              className={`${gradientClasses} text-green-acid`}
              aria-hidden="true"
            />
            <div className={borderClasses} />
          </div>
        </div>
        <Image
          src="/logo/triple-logo-simple-left.png?url"
          width={0}
          height={0}
          sizes="100vw"
          className={leftLogoClasses}
          alt="Image: Healthy Life Dish Triple Logo"
        />
        <Image
          src="/logo/triple-logo-simple-right.png?url"
          width={0}
          height={0}
          sizes="100vw"
          className={rightLogoClasses}
          alt="Image: Healthy Life Dish Triple Logo"
        />
      </div>
    </section>
  );
};
