'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Typography } from '#/design/shared/Typography'

export const Header: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-greenAcid rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">HLD</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-white hover:text-greenAcid transition-colors">
              <Typography variant="menu">ПОСЛУГИ</Typography>
            </Link>
            <Link href="/diets" className="text-white hover:text-greenAcid transition-colors">
              <Typography variant="menu">ДІЄТИ</Typography>
            </Link>
            <Link href="/programs" className="text-white hover:text-greenAcid transition-colors">
              <Typography variant="menu">ПРОГРАМИ</Typography>
            </Link>
            <Link href="/about" className="text-white hover:text-greenAcid transition-colors">
              <Typography variant="menu">ПРО НАС</Typography>
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-4">
            <button className="text-greenAcid text-sm font-medium">УКР</button>
            <span className="text-white/30">|</span>
            <button className="text-white/60 hover:text-white text-sm font-medium transition-colors">ENG</button>
          </div>
        </div>
      </div>
    </header>
  )
}
