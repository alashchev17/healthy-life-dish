'use client'

import { useEffect, useState } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLessThan768, setIsLessThan768] = useState(false)
  const [isLessThan482, setIsLessThan482] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const currentIsLessThan768 = window.innerWidth < 768
      const currentIsLessThan462 = window.innerWidth < 462
      setIsLessThan768(currentIsLessThan768)
      setIsLessThan482(currentIsLessThan462)

      setIsMobile(currentIsLessThan768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { isMobile, isLessThan768, isLessThan482 }
}
