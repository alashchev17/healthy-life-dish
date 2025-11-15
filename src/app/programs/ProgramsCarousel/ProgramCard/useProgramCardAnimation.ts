"use client";

import { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { CONTENT_ANIMATION_DELAY } from "../constants";

export type UseProgramCardAnimationProps = {
  cardRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  ctaButtonRef: RefObject<HTMLDivElement | null>;
  isExpanded: boolean;
  onAnimationStateChange: (isAnimating: boolean) => void;
};

export function useProgramCardAnimation({
  cardRef,
  contentRef,
  closeButtonRef,
  ctaButtonRef,
  isExpanded,
  onAnimationStateChange,
}: UseProgramCardAnimationProps) {
  useGSAP(
    () => {
      if (!cardRef.current) return;

      onAnimationStateChange(true);

      const tl = gsap.timeline({
        onComplete: () => onAnimationStateChange(false),
      });

      if (isExpanded) {
        if (contentRef.current) {
          gsap.set(contentRef.current, { opacity: 0, y: 20 });
          tl.to(
            contentRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            CONTENT_ANIMATION_DELAY,
          );
        }

        if (closeButtonRef.current) {
          gsap.set(closeButtonRef.current, { opacity: 0, scale: 0.5 });
          tl.to(
            closeButtonRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "back.out(2)",
            },
            CONTENT_ANIMATION_DELAY + 0.1,
          );
        }

        if (ctaButtonRef.current) {
          gsap.set(ctaButtonRef.current, { opacity: 0 });
          tl.to(
            ctaButtonRef.current,
            { opacity: 1, duration: 0.3, ease: "power2.out" },
            CONTENT_ANIMATION_DELAY,
          );
        }
      } else {
        if (contentRef.current) {
          tl.to(contentRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            ease: "power2.in",
          });
        }

        if (closeButtonRef.current) {
          tl.to(
            closeButtonRef.current,
            {
              opacity: 0,
              scale: 0.5,
              duration: 0.2,
              ease: "power2.in",
            },
            0,
          );
        }
      }
    },
    { dependencies: [isExpanded], scope: cardRef },
  );
}
