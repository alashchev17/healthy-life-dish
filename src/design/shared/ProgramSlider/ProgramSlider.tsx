"use client";

import { FC, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Button } from "#/design/ui";
import { Typography } from "../Typography";
import type { ProgramBuilder } from "#/sanity/types";
import { urlFor } from "#/sanity/utils";
import { ArrowRight, ChevronRight } from "#/design/icons";

import "swiper/css";
import "swiper/css/navigation";

interface ProgramSliderProps {
  programs: ProgramBuilder[];
  type: "diet" | "training";
}

const SLIDER_AUTOPLAY_SPEED = 3_000;
const INITIAL_SLIDE_DELAY = 1_500;

export const ProgramSlider: FC<ProgramSliderProps> = ({ programs, type }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [_swiper, setSwiper] = useState<SwiperType | null>(null);

  const hasStarted = useRef(false);
  const autoplayIters = useRef(0);
  const programSliderRef = useRef<SwiperRef>(null);

  const programHref = useMemo(() => {
    const programType = type === "diet" ? "diets" : "programs";
    return programs[activeIndex].slug?.current
      ? `/${programType}/${programs[activeIndex].slug.current}`
      : "#";
  }, [programs, activeIndex]);

  if (programs.length === 0) {
    return (
      <div className="text-center text-white/60 py-12">
        <Typography variant="body">
          Немає доступних {type === "diet" ? "дієт" : "програм"}
        </Typography>
      </div>
    );
  }

  if (type === "diet") {
    return (
      <>
        <div className="relative program-carousel">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: ".diet-carousel-prev",
              nextEl: ".diet-carousel-next",
            }}
            loop={programs.length > 1}
            onSwiper={setSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            onAutoplayStart={() => (hasStarted.current = true)}
            className="rounded-lg h-full"
            autoplay={{
              delay: SLIDER_AUTOPLAY_SPEED,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={1000}
          >
            {programs.map((program) => (
              <SwiperSlide key={program._id}>
                <div className="relative h-full min-h-[200px] md:min-h-[250px] lg:min-h-[350px] xl:min-h-[425px] flex flex-col justify-between rounded-lg overflow-hidden">
                  {program.imagery?.splash && (
                    <div className="absolute w-full h-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center aspect-square">
                      <Image
                        src={urlFor(program.imagery.splash).url()}
                        alt={program.title || "Program"}
                        fill
                        className="object-contain max-w-[80%] max-h-[80%] md:max-w-[256px] self-center justify-self-center"
                      />
                    </div>
                  )}
                  <div className="h-full inset-0 absolute flex flex-col items-center justify-center p-8 z-10">
                    <Typography
                      variant="bottoms"
                      as="span"
                      className="!text-[12px] md:!text-[1.25rem] inline-block px-3 py-1.5 max-w-[180px] md:max-w-[250px] text-center select-none rounded-3xl uppercase bg-dark-gray/70 text-white"
                    >
                      {program.title}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {programs.length > 1 && (
            <div className="hidden lg:block">
              <Button
                type="button"
                variant="icon"
                className={`diet-carousel-prev bg-transparent border-transparent absolute left-0 top-1/2 -translate-y-1/2 z-10`}
                icon={<ChevronRight className="mr-1 rotate-180" />}
                aria-label="Previous"
              />
              <Button
                type="button"
                variant="icon"
                className={`diet-carousel-next bg-transparent border-transparent absolute right-0 top-1/2 -translate-y-1/2 z-10`}
                icon={<ChevronRight className="ml-1" />}
                aria-label="Next"
              />
            </div>
          )}
        </div>
        <Link href={programHref}>
          <Button
            variant="special-light"
            icon={<ArrowRight />}
            className="mx-auto block"
          >
            Обрати дієту
          </Button>
        </Link>
      </>
    );
  }

  return (
    <div className="relative program-carousel h-full">
      <Swiper
        ref={programSliderRef}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation={{
          prevEl: ".program-carousel-prev",
          nextEl: ".program-carousel-next",
        }}
        loop={programs.length > 1}
        onSwiper={setSwiper}
        onAutoplayStart={() => (hasStarted.current = true)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="rounded-lg h-full"
        autoplay={{
          delay:
            !hasStarted.current || autoplayIters.current === 0
              ? SLIDER_AUTOPLAY_SPEED + INITIAL_SLIDE_DELAY
              : SLIDER_AUTOPLAY_SPEED,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        onAutoplay={() => {
          autoplayIters.current++;
        }}
        speed={1000}
      >
        {programs.map((program) => (
          <SwiperSlide key={program._id}>
            <div className="relative h-full overflow-hidden">
              {program.imagery?.splash && (
                <>
                  <Image
                    src={urlFor(program.imagery.splash).url()}
                    alt={program.title || "Program"}
                    fill
                    className="object-cover w-full h-full"
                    sizes="100vw"
                  />
                  <div
                    className="h-full w-full absolute top-0 left-0 z-10"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%)",
                    }}
                  />
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {programs.length > 1 && (
        <div className="hidden lg:block">
          <Button
            type="button"
            variant="icon"
            className={`program-carousel-prev bg-transparent !border-dark-gray text-light-gray absolute left-8 top-11 z-20`}
            icon={
              <ChevronRight
                width={11}
                height={20}
                className="mr-1 rotate-180"
              />
            }
            aria-label="Previous"
          />
          <Button
            type="button"
            variant="icon"
            className={`program-carousel-next bg-transparent !border-dark-gray text-light-gray absolute right-8 top-11 z-20`}
            icon={<ChevronRight width={11} height={20} className="ml-1" />}
            aria-label="Next"
          />
        </div>
      )}
      <div className="absolute flex w-full px-4 lg:px-9 lg:px-unset justify-between lg:justify-center items-center top-6 lg:top-11 left-0 z-10 gap-4">
        <Typography
          variant="bottoms"
          as="span"
          className="inline-block !text-sm lg:!text-[1.25rem] lg:leading-[100%] uppercase text-[#545454]"
        >
          Программа
        </Typography>
        <Typography
          variant="bottoms"
          as="span"
          className="inline-block py-2 px-4 lg:py-4 lg:px-4 !text-sm lg:!text-[1.25rem] lg:leading-[100%] rounded-3xl uppercase bg-dark-gray/70 text-[#545454] lg:text-white"
        >
          {programs[activeIndex].title}
        </Typography>
      </div>
      <Link href={programHref} className="block w-full">
        <Button
          variant="special-dark"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-nowrap"
        >
          Обрати програму 💪
        </Button>
      </Link>

      <style jsx global>{`
        .program-carousel .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .program-carousel {
          height: 100%;
        }
      `}</style>
    </div>
  );
};
