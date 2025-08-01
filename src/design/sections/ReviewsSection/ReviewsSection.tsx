"use client";

import { useState, useRef, useMemo } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Container, Typography, ReviewCard } from "#/design/shared";
import { HighlightedText, Button } from "#/design/ui";
import { ChevronRight } from "#/design/icons";
import { LANDING_PAGE_QUERYResult } from "#/sanity/types";

import "swiper/css";
import "swiper/css/navigation";

import "#/design/shared/ReviewCard/styles.css";

export type ReviewsSectionData = LANDING_PAGE_QUERYResult["reviews"];
interface ReviewsSectionProps {
  data?: ReviewsSectionData;
}

export function ReviewsSection({ data }: ReviewsSectionProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperRef>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  if (!data || !data.reviews || data.reviews.length === 0) return null;

  const reviews = data.reviews;

  return (
    <section className="pb-16 lg:pb-20 overflow-clip">
      <Container>
        <div className="flex items-start flex-col lg:flex-row justify-start lg:justify-between gap-11 lg:gap-4 mb-12">
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
                  className="font-normal !text-[2.5rem] leading-none max-w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Reviews Slider */}
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
              prevEl: ".reviews-slider-prev",
              nextEl: ".reviews-slider-next",
            }}
            onSwiper={setSwiper}
            onSlideChange={() =>
              setActiveSlide(swiperRef.current?.swiper.activeIndex ?? 0)
            }
            className="!overflow-visible"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review._id}>
                <ReviewCard
                  review={review}
                  isHighlighted={activeSlide === index} // Highlight the middle card as shown in the image
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons - Positioned over the slider */}
          {reviews.length > 1 && (
            <div className="hidden lg:block">
              <Button
                type="button"
                variant="icon"
                className="reviews-slider-prev bg-green-acid border-green-acid text-black hover:bg-black hover:text-white absolute left-4 top-1/2 -translate-y-1/2 z-10"
                icon={
                  <ChevronRight className="rotate-180" width={16} height={16} />
                }
                aria-label="Previous review"
                fullyRounded
              />
              <Button
                type="button"
                variant="icon"
                className="reviews-slider-next bg-green-acid border-green-acid text-black hover:bg-black hover:text-white absolute right-4 top-1/2 -translate-y-1/2 z-10"
                icon={<ChevronRight width={16} height={16} />}
                aria-label="Next review"
                fullyRounded
              />
            </div>
          )}
        </div>

        {/* Add Review Button - Below the slider */}
        <div className="flex justify-end mt-16">
          <Button variant="secondary" className="rounded-full px-8">
            Додати відгук
          </Button>
        </div>
      </Container>
    </section>
  );
}
