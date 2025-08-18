'use client'

import { HeaderContextProvider } from '#/design/shared/Header/HeaderContext'
import { LanguageProvider } from '#/design/shared/language'
import type { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LanguageProvider>
      <HeaderContextProvider>{children}</HeaderContextProvider>
    </LanguageProvider>
  )
}
