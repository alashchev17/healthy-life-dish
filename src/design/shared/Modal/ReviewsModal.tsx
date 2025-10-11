'use client'

import { FC, useState } from 'react'
import { ModalCore } from './ModalCore'
import { Button } from '#/design/ui'
import { Typography } from '#/design/shared'
import { InputField } from '#/design/ui/InputField/InputField'
import { ArrowRight, StarIcon } from '#/design/icons'

export interface ReviewsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (reviewData: ReviewFormData) => Promise<void>
}

export interface ReviewFormData {
  rating: number
  name: string
  email: string
  review: string
}

export const ReviewsModal: FC<ReviewsModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    name: '',
    email: '',
    review: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleInputChange = (field: keyof ReviewFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.review.trim() || formData.rating === 0) {
      return
    }

    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      }

      setFormData({
        rating: 0,
        name: '',
        email: '',
        review: '',
      })

      onClose()
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.review.trim() !== '' && formData.rating > 0

  return (
    <ModalCore
      isOpen={isOpen}
      onClose={handleClose}
      className="w-full max-w-[450px] p-8"
      closeOnBackdropClick={!isSubmitting}
      closeOnEscape={!isSubmitting}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-center gap-5">
          <InteractiveStarRating rating={formData.rating} onRatingChange={handleRatingChange} maxRating={5} size="lg" className="mb-2" />
          <Typography variant="body" className="text-light-gray">
            {formData.rating.toFixed(1)}
          </Typography>
        </div>

        <div className="space-y-4">
          <div>
            <InputField
              type="text"
              value={formData.name}
              variant="flat"
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ім'я*"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <InputField
              type="email"
              value={formData.email}
              variant="flat"
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Електрона пошта*"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <div className="relative">
              <InputField
                value={formData.review}
                variant="flat"
                onChange={(e) => handleInputChange('review', e.target.value)}
                placeholder="Відгук*"
                maxLength={300}
                required
                disabled={isSubmitting}
                textarea
              />
              <div className="absolute right-0 -bottom-6">
                <Typography variant="small" className="text-light-gray">
                  {formData.review.length}/300
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
            disabled={!isFormValid || isSubmitting}
            icon={<ArrowRight />}
          >
            {/* TODO: needs to be translated */}
            Залишити відгук
          </Button>
        </div>
      </form>
    </ModalCore>
  )
}

interface InteractiveStarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const InteractiveStarRating: FC<InteractiveStarRatingProps> = ({ rating, onRatingChange, maxRating = 5, size = 'md', className = '' }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }

  const starSize = sizeClasses[size]

  const handleStarClick = (starIndex: number) => {
    onRatingChange(starIndex + 1)
  }

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex + 1)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: maxRating }, (_, index) => {
          const isFilled = index < (hoverRating || rating)
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
              className={`${starSize} w-[30px] h-[30px] transition-colors cursor-pointer ${
                isFilled ? 'text-green-acid fill-green-acid stroke-green-acid' : 'text-dark-gray fill-transparent stroke-green-acid'
              } hover:text-green-acid`}
            >
              <StarIcon className="w-full h-full stroke-[1.5px]" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
