'use client'

import { FC, ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export interface ModalCoreProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  backdropClassName?: string
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
}

export const ModalCore: FC<ModalCoreProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  backdropClassName = '',
  closeOnBackdropClick = true,
  closeOnEscape = true,
}) => {
  const bodyRef = useRef<HTMLElement | null>(null)

  // Store original body styles
  const originalBodyStylesRef = useRef<{
    overflow: string
    userSelect: string
  } | null>(null)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      bodyRef.current = document.body
    }
  }, [])

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return

    if (isOpen) {
      // Store original styles
      originalBodyStylesRef.current = {
        overflow: body.style.overflow || '',
        userSelect: body.style.userSelect || '',
      }

      // Apply modal styles
      body.style.overflow = 'hidden'
      body.style.userSelect = 'none'
    } else {
      // Restore original styles
      if (originalBodyStylesRef.current) {
        body.style.overflow = originalBodyStylesRef.current.overflow
        body.style.userSelect = originalBodyStylesRef.current.userSelect
      }
    }

    return () => {
      // Cleanup function to restore styles when component unmounts
      if (body && originalBodyStylesRef.current) {
        body.style.overflow = originalBodyStylesRef.current.overflow
        body.style.userSelect = originalBodyStylesRef.current.userSelect
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose, closeOnEscape])

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${backdropClassName}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-dark-gray rounded-3xl border border-light-gray max-h-full overflow-auto ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
