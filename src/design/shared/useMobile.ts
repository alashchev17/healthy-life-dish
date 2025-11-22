'use client'

import { useCallback, useEffect, useState } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLessThan768, setIsLessThan768] = useState(false)
  const [isLessThan482, setIsLessThan482] = useState(false)
  const [isLessThan992, setIsLessThan992] = useState(false)
  const [currentWindowWidth, setCurrentWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWindowWidth(window.innerWidth);

      const currentIsLessThan462 = window.innerWidth < 462
      const currentIsLessThan768 = window.innerWidth < 768
      const currentIsLessThan992 = window.innerWidth < 992

      setIsLessThan482(currentIsLessThan462)
      setIsLessThan768(currentIsLessThan768)
      setIsLessThan992(currentIsLessThan992)

      setIsMobile(currentIsLessThan768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isLessThanX = useCallback((x: number) => {
    if (!currentWindowWidth) return false;
    console.log('currentWindowWidth', currentWindowWidth, 'x', x, `isLessThan${x}:`, currentWindowWidth < x);
    return currentWindowWidth < x
  }, [currentWindowWidth]);

  return { isMobile, isLessThanX, isLessThan992, isLessThan768, isLessThan482 }
}
