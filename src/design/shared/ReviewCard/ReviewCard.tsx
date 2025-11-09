"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Typography } from "../Typography";
import { StarRating } from "#/design/ui/StarRating";
import { urlFor } from "#/sanity/utils/sanityImageUrl";
import type { LANDING_PAGE_QUERYResult } from "#/sanity/types";

type ReviewData = NonNullable<
  NonNullable<LANDING_PAGE_QUERYResult["reviews"]>["reviews"]
>[0];

export type ReviewCardProps = {
  review: ReviewData;
  isHighlighted?: boolean;
  className?: string;
  onCardWidthChange: (width: number) => void;
};

export const ReviewCard: FC<ReviewCardProps> = ({
  review,
  isHighlighted = false,
  className = "",
  onCardWidthChange,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldHighlight = useMemo(() => {
    if (!isMounted) return false;
    return window.innerWidth > 768 && isHighlighted;
  }, [isHighlighted, isMounted]);

  const cardClasses = shouldHighlight
    ? "bg-green-acid text-black"
    : "bg-dark-gray text-white";

  const avatarUrl = review.person?.avatar?.asset?.url
    ? urlFor(review.person.avatar).width(80).height(80).url()
    : null;

  useEffect(() => {
    if (cardRef.current) {
      onCardWidthChange(cardRef.current?.clientWidth || 0);
    }
  }, [onCardWidthChange]);

  return (
    <div
      ref={cardRef}
      suppressHydrationWarning
      className={`relative rounded-2xl p-8 min-h-[300px] flex flex-col ${cardClasses} ${className} transition-all`}
    >
      <div className="flex flex-col items-center gap-4 mb-8">
        {avatarUrl && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={avatarUrl}
              alt={`${review.person?.name || "User"} avatar`}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-1 items-center">
          <Typography
            suppressHydrationWarning
            variant="bottoms"
            className={`uppercase ${shouldHighlight ? "text-black" : "text-white"} truncate`}
          >
            {review.person?.name} {review.person?.surname}
          </Typography>
          {review.person?.occupation && (
            <Typography
              suppressHydrationWarning
              variant="small"
              className={`${shouldHighlight ? "text-black/70" : "text-white/70"} truncate`}
            >
              {review.person.occupation}
            </Typography>
          )}
        </div>
      </div>

      {/* Rating */}
      {review.rating && (
        <div className="mb-8">
          <StarRating
            rating={review.rating}
            size="md"
            className="justify-center"
            starColorClassName={
              shouldHighlight ? "text-black" : "text-green-acid"
            }
          />
        </div>
      )}

      {/* Review Text */}
      {review.text && (
        <div className="flex-1">
          <Typography
            suppressHydrationWarning
            variant="bottoms"
            className={`${shouldHighlight ? "text-black" : "text-white"} leading-tight font-normal text-md text-center`}
          >
            &quot;{review.text}&quot;
          </Typography>
        </div>
      )}
    </div>
  );
};
