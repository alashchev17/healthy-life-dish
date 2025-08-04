'use client'

import { ArrowRight } from '#/design/icons'
import { LogoSimple } from '#/design/icons/LogoSimple'
import { Typography } from '#/design/shared'
import Image from 'next/image'
import { FC, useState } from 'react'
import { AboutSectionData } from './AboutSection'
import { urlFor } from '#/sanity/utils/sanityImageUrl'
import Link from 'next/link'

type FirstCardProps = {
  card: NonNullable<NonNullable<AboutSectionData>['cards']>[number]
}

export const FirstCard: FC<FirstCardProps> = ({ card }) => {
  const { title, description, image } = card

  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <Link
      href="/programs"
      className="relative max-w-full lg:max-w-[50%] h-[360px] lg:h-[580px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative w-full h-full bg-dark-gray pl-6 pr-8 py-5 lg:py-12 lg:pl-12 lg:pr-12 border-[3px] rounded-3xl flex flex-col justify-between ${isHovered ? 'border-black' : 'border-green-acid'} transition-colors duration-750 overflow-clip`}
      >
        <div
          className={`absolute inset-0 w-full h-full bg-gradient-to-r from-black via-green-acid/30 to-green-acid transition-opacity duration-750 ${isHovered ? 'opacity-100' : 'opacity-0'} z-0`}
        />
        <LogoSimple className="text-green-acid relative z-10 w-9 h-9 lg:w-auto lg:h-auto" />
        <div className="flex flex-col gap-4 relative z-10 max-w-full lg:max-w-[80%]">
          <Typography variant="title1" className="uppercase">
            {title}
          </Typography>
          <Typography variant="menu">{description}</Typography>
        </div>
        <ArrowRight width={32} height={32} className="absolute top-1/2 right-4 -translate-y-1/2 text-dark-gray z-10" />
      </div>

      {image && (
        <Image
          src={urlFor(image).url()}
          width={0}
          height={0}
          sizes="100vw"
          className={`w-auto h-full object-contain absolute bottom-0 right-0 ${isHovered ? 'scale-120' : 'scale-100 grayscale'} origin-bottom-right transition-all duration-750 pointer-events-none`}
          alt={`Photo: ${title}`}
        />
      )}
    </Link>
  )
}
