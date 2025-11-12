"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Typography } from "#/design/shared/Typography";
import { Button } from "#/design/ui";
import { ChevronRight, GradientCircle } from "#/design/icons";
import { urlFor } from "#/sanity/utils/sanityImageUrl";
import type { ProgramBuilder } from "#/sanity/types";
import { useHeaderContext } from "#/design/shared/Header/HeaderContext";

gsap.registerPlugin(useGSAP);

interface DietsCarouselProps {
  programs: ProgramBuilder[];
  ctaLabel: string;
}

export function DietsCarousel({ programs, ctaLabel }: DietsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { headerHeight } = useHeaderContext();
  const heroImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prevIndexRef = useRef(activeIndex);

  const activeProgram = programs[activeIndex];

  // Handle navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? programs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === programs.length - 1 ? 0 : prev + 1));
  };

  // Gradient position animation
  useEffect(() => {
    const activeCard = cardRefs.current[activeIndex];
    if (gradientRef.current && activeCard) {
      const cardRect = activeCard.offsetTop + activeCard.offsetHeight / 2;
      gsap.to(gradientRef.current, {
        y: cardRect,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [activeIndex]);

  // Hero image animation on activeIndex change
  useGSAP(
    () => {
      if (heroImageRef.current && prevIndexRef.current !== activeIndex) {
        gsap.fromTo(
          heroImageRef.current,
          {
            y: 100,
            rotation: -15,
            opacity: 0,
            scale: 0.85,
          },
          {
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
        );
      }
    },
    { dependencies: [activeIndex], scope: heroImageRef },
  );

  // Details text fade animation
  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      const tl = gsap.timeline();

      // Fade out current content
      if (titleRef.current && descriptionRef.current) {
        tl.to([titleRef.current, descriptionRef.current], {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        })
          // Fade in new content
          .to([titleRef.current, descriptionRef.current], {
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
          });
      }
    }

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  if (!programs || programs.length === 0) {
    return null;
  }

  return (
    <div
      className="hidden lg:block w-full relative overflow-hidden bg-black"
      style={{ height: `calc(100dvh - ${headerHeight}px)` }}
    >
      {/* Main content */}
      <div className="relative z-10 h-full flex items-center px-10 xl:px-16">
        <div className="w-full grid grid-cols-[320px_1fr_480px] gap-16 items-center">
          {/* Left Panel - Diet List */}
          <div className="relative flex flex-col gap-4">
            {/* Single gradient that transitions between cards */}
            <div
              ref={gradientRef}
              className="absolute left-0 top-0 pointer-events-none -translate-x-[80%] -translate-y-1/2"
            >
              <GradientCircle className="text-green-acid blur-3xl w-[300px] h-[300px] opacity-40" />
            </div>

            {programs.map((program, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={program._id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                    isActive
                      ? "bg-dark-gray/60 border-2 border-green-acid/40"
                      : "bg-dark-gray/20 border-2 border-transparent hover:border-[3px] hover:border-dark-gray"
                  }`}
                >
                  {/* Title */}
                  <Typography
                    variant="menu"
                    className="uppercase text-green-acid text-left text-sm leading-tight flex-1 relative z-10"
                  >
                    {program.title}
                  </Typography>

                  {/* Thumbnail */}
                  {program.imagery?.thumb && (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 z-10">
                      <Image
                        src={urlFor(program.imagery.thumb).width(80).height(80).url()}
                        alt={program.title || ""}
                        width={56}
                        height={56}
                        className={`object-cover w-full h-full transition-all duration-500 ${
                          isActive ? "grayscale-0" : "grayscale"
                        }`}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Center Panel - Hero Image */}
          <div className="flex items-center justify-center h-full">
            <div
              ref={heroImageRef}
              className="relative w-full max-w-[600px] aspect-square"
            >
              {activeProgram?.imagery?.splash && (
                <div className="relative w-full h-full">
                  <Image
                    src={urlFor(activeProgram.imagery.splash)
                      .width(600)
                      .height(600)
                      .url()}
                    alt={activeProgram.title || ""}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="h-full flex flex-col justify-center py-16 bg-[#1A1A1A] rounded-3xl px-8">
            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-[#272727] flex items-center justify-center hover:bg-[#333] transition-all duration-300 border border-white/10"
                aria-label="Previous diet"
              >
                <ChevronRight className="rotate-180 text-white/60 w-5 h-5" />
              </button>

              <div ref={titleRef}>
                <Typography
                  variant="menu"
                  className="uppercase text-green-acid text-center text-base"
                >
                  {activeProgram?.title}
                </Typography>
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-[#272727] flex items-center justify-center hover:bg-[#333] transition-all duration-300 border border-white/10"
                aria-label="Next diet"
              >
                <ChevronRight className="text-white/60 w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div ref={descriptionRef} className="flex-1 flex items-start mb-8">
              <Typography
                variant="body"
                className="text-white/90 leading-relaxed text-sm"
              >
                {activeProgram?.seo?.metaDescription || ""}
              </Typography>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href={`/diets/${activeProgram?.slug?.current || ""}`}
                className="block"
              >
                <Button
                  variant="primary"
                  fullWidth
                  className="!rounded-full !py-4 !text-base font-bold uppercase"
                >
                  {ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
