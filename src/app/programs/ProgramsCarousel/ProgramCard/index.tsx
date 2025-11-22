"use client";

import { FC, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "#/design/ui";
import { ArrowRight, CloseIcon, GradientCircle } from "#/design/icons";
import { urlFor } from "#/sanity/utils";
import { Typography } from "#/design/shared";
import { ProgramBuilder } from "#/sanity/types";

import { useProgramCardAnimation } from "./useProgramCardAnimation";
import { useRouter } from "next/navigation";

export type ProgramCardProps = {
  program: ProgramBuilder;
  ctaLabel?: string;
  variant?: "desktop" | "tablet" | "mobile";
  index?: number;
  isExpanded?: boolean;
  onToggle?: (force?: boolean) => void;
  onAnimationStateChange?: (isAnimating: boolean) => void;
  href?: string;
};

export const ProgramCard: FC<ProgramCardProps> = ({
  program,
  ctaLabel,
  variant = "desktop",
  index: _index,
  isExpanded = false,
  onToggle,
  onAnimationStateChange,
  href,
}) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMemo(() => variant === "desktop", [variant]);
  const height = useMemo(() => {
    return variant === "tablet"
      ? "525px"
      : variant === "mobile"
        ? "655px"
        : undefined;
  }, [variant]);

  const width = useMemo(() => {
    return variant === "tablet" ? "calc(50% - 5px)" : undefined;
  }, [variant]);

  const thumbDimensions = useMemo(() => {
    if (variant === "mobile") return { width: 430, height: 540 };
    if (variant === "tablet") return { width: 285, height: 385 };
    return { width: 500, height: 625 };
  }, [variant]);

  // Only use animations on desktop
  useProgramCardAnimation({
    cardRef,
    contentRef,
    closeButtonRef,
    ctaButtonRef,
    isExpanded: isDesktop ? isExpanded : false,
    onAnimationStateChange: onAnimationStateChange || (() => {}),
  });

  useEffect(() => {
    console.log(`[DEBUG]: program data: `, program);
  }, [program]);

  return (
    <div
      ref={cardRef}
      className={`
        relative flex flex-col justify-between pt-7 pl-9 pb-9 pr-9
        bg-dark-gray rounded-3xl border-[3px] border-transparent
        transition-[border-color] duration-300 overflow-hidden group
        hover:border-green-acid
        ${isExpanded ? "!border-green-acid" : ""}
        ${isDesktop && !isExpanded ? "cursor-pointer" : ""}
        ${variant === "mobile" ? "w-full cursor-pointer" : ""}
        ${variant === "tablet" ? "cursor-pointer" : ""}
      `}
      style={{
        ...(height ? { height } : {}),
        ...(width ? { width } : {}),
      }}
      onClick={() => {
        if (isDesktop && !isExpanded && onToggle) onToggle();
        if ((variant === "tablet" || variant === "mobile") && href) {
          router.push(href);
        }
      }}
    >
      <div className="flex flex-col gap-2 relative z-10">
        <Typography
          variant="bottoms"
          className="uppercase text-light-gray !font-bold !text-[1.25rem]"
        >
          Програма
        </Typography>
        <Typography
          variant="title2"
          className="uppercase text-white !leading-none"
        >
          {program.title}
        </Typography>
      </div>

      {isDesktop && isExpanded && (
        <div
          ref={contentRef}
          className="my-6 flex flex-col gap-4 justify-between h-full relative z-10"
        >
          {program.shortDescription && (
            <Typography
              variant="body"
              className="text-white !text-lg !leading-tight max-w-3/4"
            >
              {program.shortDescription}
            </Typography>
          )}

          {program.slogan && (
            <Typography
              variant="title3"
              className="uppercase text-green-acid !font-bold !leading-tight max-w-1/3"
            >
              {program.slogan}
            </Typography>
          )}
        </div>
      )}

      <div ref={ctaButtonRef} className="relative z-10 mt-auto">
        <Link
          href={`/programs/${program.slug?.current ?? ""}`}
          onClick={(e) => {
            if (isDesktop) e.stopPropagation();
          }}
        >
          {isDesktop && isExpanded ? (
            <Button
              variant="primary"
              fullWidth
              className="uppercase font-bold max-w-2/3"
              icon={<ArrowRight />}
            >
              {ctaLabel}
            </Button>
          ) : (
            <Button
              variant="icon"
              className="w-16 h-16"
              icon={<ArrowRight />}
            />
          )}
        </Link>
      </div>

      {isDesktop && isExpanded && (
        <button
          ref={closeButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            if (onToggle) onToggle(true);
          }}
          className="absolute top-7 right-7 z-20 text-light-gray hover:text-white transition-colors duration-200"
          aria-label="Close card"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      )}

      {program.imagery?.thumb && (
        <Image
          className={`absolute z-1 bottom-0 right-0 translate-x-[30%] sm:translate-x-0 lg:translate-x-[30%] grayscale group-hover:grayscale-0 transition-[filter] object-cover pointer-events-none select-none duration-200 ${isExpanded ? "!grayscale-0" : ""}`}
          src={urlFor(program.imagery.thumb).url()}
          width={thumbDimensions.width}
          height={thumbDimensions.height}
          alt={`${program.title} thumbnail`}
          style={{
            width: `${thumbDimensions.width}px !important`,
            height: `${thumbDimensions.height}px !important`,
            maxWidth: "unset",
            maxHeight: "unset",
          }}
        />
      )}

      <GradientCircle
        className={`w-[1260px] h-[1335px] blur-xl absolute top-0 -left-[175px] text-green-acid z-0 opacity-0 group-hover:opacity-80 transition-opacity duration-300 ${isExpanded ? "!opacity-80" : ""}`}
      />
    </div>
  );
};
