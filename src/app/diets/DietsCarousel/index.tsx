"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Typography } from "#/design/shared/Typography";
import { Button } from "#/design/ui";
import { ArrowRight, ChevronRight, GradientCircle } from "#/design/icons";
import { urlFor } from "#/sanity/utils/sanityImageUrl";
import type { ProgramBuilder } from "#/sanity/types";
import { useHeaderContext } from "#/design/shared/Header";

import { useLanguage } from "#/design/shared/language";

import { wordWrap } from "#/app/globalUtils";

gsap.registerPlugin(useGSAP);

interface DietsCarouselProps {
  programs: ProgramBuilder[];
  ctaLabel: string;
}

export function DietsCarousel({ programs, ctaLabel }: DietsCarouselProps) {
  const { currentLanguage } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { headerHeight } = useHeaderContext();
  const heroImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prevIndexRef = useRef(activeIndex);
  const isInitialMount = useRef(true);

  const activeProgram = programs[activeIndex];

  // Initialize opacity states before first paint to prevent flash
  useLayoutEffect(() => {
    if (isInitialMount.current) {
      heroImageRefs.current.forEach((img, index) => {
        if (img) {
          gsap.set(img, { opacity: index === 0 ? 1 : 0 });
        }
      });
      isInitialMount.current = false;
    }
  }, []);

  const handlePrev = () => {
    if (!isAnimating) {
      setActiveIndex((prev) => (prev === 0 ? programs.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setActiveIndex((prev) => (prev === programs.length - 1 ? 0 : prev + 1));
    }
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
  useEffect(() => {
    if (!isInitialMount.current && prevIndexRef.current !== activeIndex) {
      const prevImage = heroImageRefs.current[prevIndexRef.current];
      const nextImage = heroImageRefs.current[activeIndex];

      if (prevImage && nextImage) {
        setIsAnimating(true);

        const tl = gsap.timeline({
          onComplete: () => {
            // Reset transforms on previous image
            gsap.set(prevImage, {
              y: 0,
              rotation: 0,
              scale: 1,
            });
            prevIndexRef.current = activeIndex;
            setIsAnimating(false);
          },
        });

        // Fade out previous image with reverse rotation
        tl.to(prevImage, {
          opacity: 0,
          y: -100,
          rotation: 15,
          scale: 0.85,
          duration: 0.4,
          ease: "power2.in",
        })
          // Reset next image position and then fade in with rotation
          .set(nextImage, {
            y: 100,
            rotation: -15,
            scale: 0.85,
          })
          .to(nextImage, {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });
      }
    }
  }, [activeIndex]);

  // Details text fade animation
  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      // Immediately hide the new content to prevent flash
      if (titleRef.current && descriptionRef.current) {
        gsap.set([titleRef.current, descriptionRef.current], { opacity: 0 });

        // Then animate in after a short delay
        gsap.to([titleRef.current, descriptionRef.current], {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1,
        });
      }
    }
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
      <div className="relative h-full flex items-center px-10 xl:px-16 xl:pt-4 xl:pb-16">
        <div className="w-full h-full grid grid-cols-[300px_1fr_430px] gap-16 items-center">
          {/* Left Panel - Diet List */}
          <div className="relative flex flex-col gap-4">
            {/* Single gradient that transitions between cards */}
            <div
              ref={gradientRef}
              className="absolute z-0 left-0 top-0 pointer-events-none -translate-x-[95%] -translate-y-1/2"
            >
              <GradientCircle className="text-green-acid blur-sm w-[250px] h-[250px]" />
            </div>

            {programs.map((program, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={program._id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => !isAnimating && setActiveIndex(index)}
                  disabled={isAnimating}
                  className={`relative z-10 flex border-transparent hover:border-dark-gray items-center border-[3px] gap-4 p-4 rounded-3xl cursor-pointer select-none transition-all duration-300 group ${
                    isActive ? "!border-dark-gray" : ""
                  } ${isAnimating ? "cursor-not-allowed" : ""}`}
                >
                  {/* Title */}
                  <Typography
                    variant="menu"
                    className="uppercase text-green-acid text-left !text-lg flex-1 relative z-10 whitespace-pre-wrap"
                  >
                    {wordWrap({
                      text: program.title ?? "",
                      limit: 12,
                      language: currentLanguage.code,
                    })}
                  </Typography>

                  {/* Thumbnail */}
                  {program.imagery?.thumb && (
                    <div className="relative w-full h-full max-w-[104px] max-h-[104px] rounded-full flex-shrink-0 overflow-hidden z-10">
                      <Image
                        src={urlFor(program.imagery.thumb)
                          .width(104)
                          .height(104)
                          .url()}
                        alt={program.title || ""}
                        width={104}
                        height={104}
                        className={`object-cover inline-block w-full h-full transition-all duration-500 ${
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
            <div className="relative w-full max-w-[540px] aspect-square">
              {/* Render all images, GSAP controls visibility */}
              {programs.map((program, index) =>
                program?.imagery?.splash ? (
                  <div
                    key={program._id}
                    ref={(el) => {
                      heroImageRefs.current[index] = el;
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={urlFor(program.imagery.splash)
                        .width(600)
                        .height(600)
                        .url()}
                      alt={program.title || ""}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                ) : null,
              )}
            </div>
          </div>

          {/* Right Panel - Details */}
          <div className="h-full flex flex-col justify-center bg-dark-gray rounded-3xl">
            {/* Navigation Arrows */}
            <div className="flex items-center justify-between p-4 border-b-black border-b-[3px]">
              <button
                onClick={handlePrev}
                disabled={isAnimating}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-light-gray ${
                  isAnimating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Previous diet"
              >
                <ChevronRight className="rotate-180 text-light-gray w-5 h-5" />
              </button>

              <div ref={titleRef}>
                <Typography
                  variant="menu"
                  className="uppercase text-green-acid text-center !text-[1.25rem] !font-bold !leading-tight"
                >
                  {activeProgram?.title}
                </Typography>
              </div>

              <button
                onClick={handleNext}
                disabled={isAnimating}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-light-gray ${
                  isAnimating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Next diet"
              >
                <ChevronRight className="text-light-gray w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <div
              ref={descriptionRef}
              className="flex-1 flex items-start py-10 px-8 overflow-y-auto"
              style={{
                maxHeight: descriptionRef.current
                  ? `${descriptionRef.current.offsetHeight}px`
                  : "auto",
              }}
            >
              <Typography
                variant="body"
                className="text-white !font-medium !leading-tight"
              >
                {activeProgram?.shortDescription ?? ""}
              </Typography>
            </div>

            {/* CTA Button */}
            <div className="flex items-center justify-center p-6">
              <Link
                href={`/diets/${activeProgram?.slug?.current ?? ""}`}
                className="block w-full"
              >
                <Button
                  variant="primary"
                  fullWidth
                  className="font-bold uppercase"
                  icon={<ArrowRight />}
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
