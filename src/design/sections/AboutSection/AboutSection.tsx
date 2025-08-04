import { FC } from 'react'
import { Button, HighlightedText } from '#/design/ui'
import { LANDING_PAGE_QUERYResult } from '#/sanity/types'
import { Container, Typography } from '#/design/shared'
import Link from 'next/link'
import Image from 'next/image'
import { FirstCard } from './FirstCard'
import { SecondCard } from './SecondCard'

export type AboutSectionData = LANDING_PAGE_QUERYResult['about']
interface AboutSectionProps {
  data?: AboutSectionData
}

export const AboutSection: FC<AboutSectionProps> = ({ data }) => {
  if (!data) return
  return (
    <Container className="overflow-hidden">
      <section className="flex items-start flex-col lg:flex-row justify-start lg:justify-between gap-11 lg:gap-4 pb-0 lg:pb-5">
        <div className="flex items-center justify-start max-w-full lg:max-w-1/3 w-full">
          {/* TODO: translate in english/spanish/ukrainian */}
          <Typography variant="menu" className="!text-base uppercase text-green-acid">
            Про нас
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
          {data.callToAction && (
            <Link href={data.callToAction.action ?? '#'} className="inline-block mt-9">
              <Button variant="secondary" className="rounded-full">
                {data.callToAction.label}
              </Button>
            </Link>
          )}
        </div>
      </section>
      {data.cards && (
        <section className="mt-10 lg:mt-24 mb-32">
          <div className="flex flex-col lg:flex-row gap-5">
            {data.cards.map((card, index) => {
              if (index === 0) return <FirstCard card={card} key={card._key} />
              return <SecondCard card={card} key={card._key} />
            })}
          </div>
        </section>
      )}
      {data.slogan && (
        <section className="px-5 lg:px-32 mt-8 lg:mt-40 mb-[120px]">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="px-5 py-12 lg:py-20 lg:px-40">
                <HighlightedText value={data.slogan} variant="title1" className="relative text-center xl:text-[40px] uppercase z-10" />
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[440px] h-[460px] lg:w-[870px] lg:h-[870px] -bottom-2/3 top-unset lg:top-4 z-1"
                  style={{
                    background:
                      'radial-gradient(56.63% 56.63% at 50% 50%, #C3F02F 0%, rgba(195, 240, 47, 0.85) 7%, rgba(195, 240, 47, 0.63) 19%, rgba(195, 240, 47, 0.43) 31%, rgba(195, 240, 47, 0.28) 43%, rgba(195, 240, 47, 0.16) 55%, rgba(195, 240, 47, 0.07) 66%, rgba(195, 240, 47, 0.02) 78%, rgba(195, 240, 47, 0.00) 89%)',
                  }}
                />
                <div className="absolute w-full h-full inset-0 z-0 bg-dark-gray border-[3px] rounded-3xl border-light-gray mix-blend-color-dodge" />
              </div>
            </div>
            <Image
              src="/logo/triple-logo-simple-left.png?url"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[76px] lg:w-[182px] h-auto absolute -bottom-16 top-unset -left-5 lg:-left-[120px] lg:top-20"
              alt="Image: Healthy Life Dish Triple Logo"
            />
            <Image
              src="/logo/triple-logo-simple-right.png?url"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[73px] lg:w-[223px] h-auto absolute -top-16 -right-5 bottom-unset lg:-right-[110px] lg:bottom-4"
              alt="Image: Healthy Life Dish Triple Logo"
            />
          </div>
        </section>
      )}
    </Container>
  )
}
