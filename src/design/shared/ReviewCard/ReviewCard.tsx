import { FC } from "react";
import Image from "next/image";
import { Typography } from "../Typography";
import { StarRating } from "#/design/ui/StarRating";
import { urlFor } from "#/sanity/utils/sanityImageUrl";
import type { LANDING_PAGE_QUERYResult } from "#/sanity/types";

type ReviewData = NonNullable<
  NonNullable<LANDING_PAGE_QUERYResult["reviews"]>["reviews"]
>[0];

export interface ReviewCardProps {
  review: ReviewData;
  isHighlighted?: boolean;
  className?: string;
}

export const ReviewCard: FC<ReviewCardProps> = ({
  review,
  isHighlighted = false,
  className = "",
}) => {
  const cardClasses = isHighlighted
    ? "bg-green-acid text-black scale-120"
    : "bg-dark-gray text-white scale-100";

  const avatarUrl = review.person?.avatar?.asset?.url
    ? urlFor(review.person.avatar).width(80).height(80).url()
    : null;

  return (
    <div
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
            variant="bottoms"
            className={`uppercase ${isHighlighted ? "text-black" : "text-white"} truncate`}
          >
            {review.person?.name} {review.person?.surname}
          </Typography>
          {review.person?.occupation && (
            <Typography
              variant="small"
              className={`${isHighlighted ? "text-black/70" : "text-white/70"} truncate`}
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
              isHighlighted ? "text-black" : "text-green-acid"
            }
          />
        </div>
      )}

      {/* Review Text */}
      {review.text && (
        <div className="flex-1">
          <Typography
            variant="bottoms"
            className={`${isHighlighted ? "text-black" : "text-white"} leading-tight font-normal text-md text-center`}
          >
            &quot;{review.text}&quot;
          </Typography>
        </div>
      )}
    </div>
  );
};
