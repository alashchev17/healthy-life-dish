'use client'

import { ArrowRight } from '#/design/icons'
import { Typography } from '#/design/shared'
import Image from 'next/image'
import { FC, useState } from 'react'
import { AboutSectionData } from './AboutSection'
import { urlFor } from '#/sanity/utils/sanityImageUrl'
import Link from 'next/link'

type SecondCardProps = {
  card: NonNullable<NonNullable<AboutSectionData>['cards']>[number]
}

export const SecondCard: FC<SecondCardProps> = ({ card }) => {
  const { title, description, image } = card

  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <Link
      href="/diets"
      className="relative max-w-[50%] h-[580px] overflow-clip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative w-full h-full bg-green-acid p-12 rounded-3xl flex flex-col justify-between overflow-clip`}>
        <div className="text-dark-gray flex flex-col gap-4 relative z-10 max-w-[80%]">
          <Typography variant="h1" className="uppercase">
            {title}
          </Typography>
          <Typography variant="menu">{description}</Typography>
        </div>
        <ArrowRight
          width={32}
          height={32}
          className={`absolute top-1/2 ${isHovered ? 'right-4' : '-right-8'} -translate-y-1/2 text-dark-gray transition-all duration-750 z-10`}
        />
      </div>

      {image && (
        <Image
          src={urlFor(image).url()}
          width={0}
          height={0}
          sizes="100vw"
          className={`w-auto h-[80%] object-cover absolute -bottom-1/3 right-0 ${isHovered ? 'scale-115 -translate-y-[64px] rotate-[25deg]' : 'scale-100 grayscale'} origin-center transition-all duration-750 pointer-events-none`}
          alt={`Photo: ${title}`}
        />
      )}
    </Link>
  )
}
