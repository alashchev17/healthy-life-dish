import { ProgramBuilder } from '#/sanity/types'
import { useCallback, useState } from 'react'
import { useHeaderContext } from '../Header/HeaderContext'
import { useMobile } from '../useMobile'

type GroupedProgramData = {
  [K in NonNullable<ProgramBuilder['type']>]: ProgramBuilder[]
}

type useFooterDataArgs = {
  programsData: ProgramBuilder[]
}

export function useFooterData({ programsData }: useFooterDataArgs) {
  const { isMobile } = useMobile()
  const { headerHeight } = useHeaderContext()
  const currentYear = 2025;

  const [email, setEmail] = useState('')

  const handleEmailSubscription = useCallback(() => {
    console.log(`[DEBUG]: Subscribe email "${email}" to HLD email newsletter`)
  }, [email])

  const groupedProgramsByType = programsData.reduce<GroupedProgramData>((acc, program) => {
    const type = program.type
    if (!type) return acc
    if (!(type in acc)) {
      acc[type] = []
    }
    acc[type].push(program)
    return acc
  }, {} as GroupedProgramData)

  return {
    isMobile,
    headerHeight,
    email,
    setEmail,
    handleEmailSubscription,
    groupedProgramsByType,
    currentYear,
  }
}
