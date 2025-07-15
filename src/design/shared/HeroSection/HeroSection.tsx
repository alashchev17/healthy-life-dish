import { FC } from 'react'
import { HighlightedText } from '#/design/ui'
import { ProgramCarousel } from '../ProgramCarousel'
import type { ProgramBuilder, HighlightText } from '#/sanity/types'

interface HeroSectionProps {
  heroSlogan?: HighlightText | null
  dietPrograms: ProgramBuilder[]
  trainingPrograms: ProgramBuilder[]
}

export const HeroSection: FC<HeroSectionProps> = ({ heroSlogan, dietPrograms, trainingPrograms }) => {
  return (
    <section className="max-h-screen h-screen bg-black pt-20 pb-12 space-x-4 flex px-10">
      <div className="px-9 pt-14 pb-8 bg-green-acid flex flex-col justify-between rounded-3xl max-w-1/3 w-full">
        {heroSlogan && (
          <div className="text-center mb-15">
            <HighlightedText value={heroSlogan} variant="title1" className="text-black !text-[2.5rem] leading-none uppercase max-w-full" />
          </div>
        )}

        {dietPrograms.length > 0 && <ProgramCarousel programs={dietPrograms} type="diet" />}
      </div>

      <div className="max-w-2/3 w-full h-full">
        {trainingPrograms.length > 0 && <ProgramCarousel programs={trainingPrograms} type="training" />}
      </div>
    </section>
  )
}
