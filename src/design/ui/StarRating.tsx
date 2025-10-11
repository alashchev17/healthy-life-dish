'use client'

import { FC } from 'react'
import { Typography } from '#/design/shared'
import { StarIcon } from '#/design/icons'

export interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  starColorClassName?: string
}

export const StarRating: FC<StarRatingProps> = ({ rating, maxRating = 5, size = 'md', className = '', starColorClassName = '' }) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const starSize = sizeClasses[size]

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, index) => {
          const isFilled = index < Math.floor(rating)
          return (
            <StarIcon suppressHydrationWarning key={index} className={`${starSize} ${isFilled ? starColorClassName : 'text-light-gray'}`} />
          )
        })}
      </div>
      <Typography variant="small">{parseFloat(rating.toString()).toFixed(1)}</Typography>
    </div>
  )
}
