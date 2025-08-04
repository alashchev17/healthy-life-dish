'use client'

import { useState, useRef, useMemo } from 'react'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Container, Typography, ReviewCard, ReviewsModal } from '#/design/shared'
import { HighlightedText, Button } from '#/design/ui'
import { ChevronRight } from '#/design/icons'
import { LANDING_PAGE_QUERYResult } from '#/sanity/types'
import type { ReviewFormData } from '#/design/shared'

import 'swiper/css'
import 'swiper/css/navigation'

import '#/design/shared/ReviewCard/styles.css'

export type ReviewsSectionData = LANDING_PAGE_QUERYResult['reviews']
interface ReviewsSectionProps {
  data?: ReviewsSectionData
}

const CONTAINER_PADDING = 40

export function ReviewsSection({ data }: ReviewsSectionProps) {
  // eslint-disable-next-line
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const swiperRef = useRef<SwiperRef>(null)

  const [activeSlide, setActiveSlide] = useState(0)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const [maxCardWidth, setMaxCardWidth] = useState(0)

  const buttonDisplacement = useMemo(() => {
    if (typeof window === 'undefined' || !window) {
      return 0
    }

    if (window.innerWidth < 768) {
      return 0
    }

    return window.innerWidth / 2 - maxCardWidth / 2 - CONTAINER_PADDING * 1.25
  }, [maxCardWidth])

  if (!data || !data.reviews || data.reviews.length === 0) return null

  const reviews = data.reviews

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true)
  }

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false)
  }

  const handleSubmitReview = async (reviewData: ReviewFormData) => {
    // Here you would typically send the review data to your backend
    console.log('Review submitted:', reviewData)

    // For now, just close the modal
    // In a real implementation, you might want to:
    // 1. Send data to your API
    // 2. Show a success message
    // 3. Refresh the reviews list

    try {
      // await submitReview(reviewData);
      // You could also trigger a refetch of reviews here
    } catch (error) {
      console.error('Failed to submit review:', error)
      throw error // Re-throw so the modal can handle the error
    }
  }

  return (
    <section className="pb-16 lg:pb-20 overflow-clip">
      <Container>
        <div className="flex items-start flex-col lg:flex-row justify-start lg:justify-between gap-11 lg:gap-4 mb-6 lg:mb-12">
          <div className="flex items-center justify-start max-w-full lg:max-w-1/3 w-full">
            {/* TODO: translate in english/spanish/ukrainian */}
            <Typography variant="menu" className="uppercase text-green-acid">
              Відгуки
            </Typography>
          </div>
          <div className="max-w-full lg:max-w-[calc(66.7%-1rem)]">
            {data.description && (
              <div className="text-white">
                <HighlightedText
                  value={data.description}
                  variant="title1"
                  className="font-normal !text-2xl lg:!text-[2.5rem] leading-none max-w-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative reviews-slider">
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            centeredSlides={true}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            navigation={{
              prevEl: '.reviews-slider-prev',
              nextEl: '.reviews-slider-next',
            }}
            onSwiper={setSwiper}
            onSlideChange={() => setActiveSlide(swiperRef.current?.swiper.activeIndex ?? 0)}
            className="!overflow-visible"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review._id}>
                <ReviewCard review={review} isHighlighted={activeSlide === index} onCardWidthChange={setMaxCardWidth} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="flex items-center gap-2 lg:gap-4 mt-6 lg:mt-14"
            style={{
              marginLeft: `${buttonDisplacement}px`,
            }}
          >
            <Button
              type="button"
              variant="icon"
              className="reviews-slider-prev w-10 h-10 lg:w-auto lg:h-auto !bg-transparent !border-dark-gray !text-light-gray hover:!bg-green-acid hover:!text-black hover:!border-green-acid"
              icon={<ChevronRight className="rotate-180" width={24} height={24} />}
              aria-label="Previous review"
              fullyRounded
            />
            <Button
              type="button"
              variant="icon"
              className="reviews-slider-next w-10 h-10 lg:w-auto lg:h-auto !bg-transparent !border-dark-gray !text-light-gray hover:!bg-green-acid hover:!text-black hover:!border-green-acid"
              icon={<ChevronRight width={24} height={24} />}
              aria-label="Next review"
              fullyRounded
            />
            <Button variant="secondary" className="ml-auto rounded-full px-8" onClick={handleOpenReviewModal}>
              Додати відгук
            </Button>
          </div>
        </div>
      </Container>

      <ReviewsModal isOpen={isReviewModalOpen} onClose={handleCloseReviewModal} onSubmit={handleSubmitReview} />
    </section>
  )
}
