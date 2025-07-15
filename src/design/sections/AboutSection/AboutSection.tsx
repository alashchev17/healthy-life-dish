import { FC } from 'react'
import { HighlightedText } from '#/design/ui'
import { LANDING_PAGE_QUERYResult } from '#/sanity/types'
import { Container, Typography } from '#/design/shared'

type AboutSectionData = LANDING_PAGE_QUERYResult['about']
interface AboutSectionProps {
  data?: AboutSectionData
}

export const AboutSection: FC<AboutSectionProps> = ({ data }) => {
  if (!data) return
  return (
    <Container>
      <section className="flex items-start justify-between gap-4">
        <div className="flex items-center justify-start max-w-1/3 w-full">
          {/* TODO: translate in english/spanish/ukrainian */}
          <Typography variant="menu" className="uppercase text-green-acid">
            Про нас
          </Typography>
          {/* <span>Про нас</span> */}
        </div>
        <div className="lg:max-w-2/3">
          {data.description && (
            <div className="text-white">
              <HighlightedText value={data.description} variant="title1" className="font-normal !text-[2.5rem] leading-none max-w-full" />
            </div>
          )}
        </div>
      </section>
    </Container>
  )
}
