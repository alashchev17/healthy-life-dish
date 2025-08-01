import { FC } from "react";
import { Typography } from "#/design/shared";

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  starColorClassName?: string;
}

export const StarRating: FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = "md",
  className = "",
  starColorClassName = "",
}) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const starSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, index) => {
          const isFilled = index < Math.floor(rating);
          return (
            <svg
              key={index}
              className={`${starSize} ${isFilled ? starColorClassName : "text-light-gray"}`}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
            >
              <path
                d="M9.97339 0.615946C10.3171 -0.205315 11.6296 -0.205316 11.9734 0.615946L13.9734 4.61595C14.1184 4.96217 14.5973 5.58598 14.9734 5.61595H19.9734C20.8656 5.68703 21.6532 7.0373 20.9734 7.61595L16.9734 11.6159C16.6868 11.8599 15.8858 12.2513 15.9734 12.6159L17.9734 17.6159C18.1811 18.4811 16.7373 19.0795 15.9734 18.6159L11.9734 15.6159C11.6514 15.4205 10.2954 15.4205 9.97339 15.6159L5.97339 18.6159C5.20951 19.0795 3.76571 18.4811 3.97339 17.6159L5.97339 12.6159C6.06095 12.2513 5.25996 11.8599 4.97339 11.6159L0.973393 7.61595C0.293611 7.0373 1.08117 5.68703 1.97339 5.61595H6.97339C7.34954 5.58598 7.82848 4.96217 7.97339 4.61595L9.97339 0.615946Z"
                fill="currentColor"
              />
            </svg>
          );
        })}
      </div>
      <Typography variant="small">
        {parseFloat(rating.toString()).toFixed(1)}
      </Typography>
    </div>
  );
};
