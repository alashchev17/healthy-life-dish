'use client'

import { FC, useState } from 'react'
import { ModalCore } from './ModalCore'
import { Button } from '#/design/ui'
import { Typography } from '#/design/shared'
import { InputField } from '#/design/ui/InputField/InputField'

export interface ReviewsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (reviewData: ReviewFormData) => void
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

      // Reset form after successful submission
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
        {/* Header */}
        <div className="text-center mb-6">
          <Typography variant="title3" className="text-white mb-2">
            Залишити відгук
          </Typography>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-center space-y-4">
          <InteractiveStarRating rating={formData.rating} onRatingChange={handleRatingChange} maxRating={5} size="lg" className="mb-2" />
          <Typography variant="body" className="text-light-gray">
            {formData.rating.toFixed(1)}
          </Typography>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name Field */}
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

          {/* Email Field */}
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

          {/* Review Text Field */}
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

        {/* Submit Button */}
        <div className="pt-8">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
            disabled={!isFormValid || isSubmitting}
            className="rounded-full"
          >
            ЗАЛИШИТИ ВІДГУК
          </Button>
        </div>
      </form>
    </ModalCore>
  )
}

// Interactive Star Rating Component
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
              className={`${starSize} transition-colors cursor-pointer ${
                isFilled ? 'text-green-acid' : 'text-light-gray'
              } hover:text-green-acid`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none" className="w-full h-full">
                <path
                  d="M9.97339 0.615946C10.3171 -0.205315 11.6296 -0.205316 11.9734 0.615946L13.9734 4.61595C14.1184 4.96217 14.5973 5.58598 14.9734 5.61595H19.9734C20.8656 5.68703 21.6532 7.0373 20.9734 7.61595L16.9734 11.6159C16.6868 11.8599 15.8858 12.2513 15.9734 12.6159L17.9734 17.6159C18.1811 18.4811 16.7373 19.0795 15.9734 18.6159L11.9734 15.6159C11.6514 15.4205 10.2954 15.4205 9.97339 15.6159L5.97339 18.6159C5.20951 19.0795 3.76571 18.4811 3.97339 17.6159L5.97339 12.6159C6.06095 12.2513 5.25996 11.8599 4.97339 11.6159L0.973393 7.61595C0.293611 7.0373 1.08117 5.68703 1.97339 5.61595H6.97339C7.34954 5.58598 7.82848 4.96217 7.97339 4.61595L9.97339 0.615946Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          )
        })}
      </div>
    </div>
  )
}
