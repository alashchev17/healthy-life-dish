import { useCallback, useState } from 'react'
import { useHeaderContext } from '../Header/HeaderContext'
import { useMobile } from '../useMobile'

export function useFooterData() {
  const { isMobile } = useMobile()
  const { headerHeight } = useHeaderContext()
  const currentYear = 2025;

  const [email, setEmail] = useState('')

  const handleEmailSubscription = useCallback(() => {
    console.log(`[DEBUG]: Subscribe email "${email}" to HLD email newsletter`)
  }, [email])

  return {
    isMobile,
    headerHeight,
    email,
    setEmail,
    handleEmailSubscription,
    currentYear,
  }
}
