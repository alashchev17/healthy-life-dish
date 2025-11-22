'use client'

import { useEffect, useState } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLessThan768, setIsLessThan768] = useState(false)
  const [isLessThan482, setIsLessThan482] = useState(false)
  const [isLessThan992, setIsLessThan992] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const currentIsLessThan768 = window.innerWidth < 768
      const currentIsLessThan462 = window.innerWidth < 462
      const currentIsLessThan992 = window.innerWidth < 992

      setIsLessThan768(currentIsLessThan768)
      setIsLessThan482(currentIsLessThan462)
      setIsLessThan992(currentIsLessThan992)

      setIsMobile(currentIsLessThan768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { isMobile, isLessThan992, isLessThan768, isLessThan482 }
}
