import { FC } from 'react'
import { Button, HighlightedText } from '#/design/ui'
import { LANDING_PAGE_QUERYResult } from '#/sanity/types'
import { Container, Typography } from '#/design/shared'
import Link from 'next/link'

type AboutSectionData = LANDING_PAGE_QUERYResult['about']
interface AboutSectionProps {
  data?: AboutSectionData
}

export const AboutSection: FC<AboutSectionProps> = ({ data }) => {
  if (!data) return
  return (
    <Container>
      <section className="flex items-start flex-col lg:flex-row justify-start lg:justify-between gap-11 lg:gap-4 pb-0 lg:pb-5">
        <div className="flex items-center justify-start max-w-full lg:max-w-1/3 w-full">
          {/* TODO: translate in english/spanish/ukrainian */}
          <Typography variant="menu" className="uppercase text-green-acid">
            Про нас
          </Typography>
        </div>
        <div className="max-w-full lg:max-w-[calc(66.7%-1rem)]">
          {data.description && (
            <div className="text-white">
              <HighlightedText value={data.description} variant="title1" className="font-normal !text-[2.5rem] leading-none max-w-full" />
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
    </Container>
  )
}
