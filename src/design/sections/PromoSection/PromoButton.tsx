import { FC } from 'react'

interface PromoButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const PromoButton: FC<PromoButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        border-[3px] border-green-acid bg-black
        rounded-[24px] px-6 py-4 lg:px-9 lg:py-4
        font-jura font-bold text-[16px] lg:text-[20px] leading-[90%] text-green-acid
        hover:bg-green-acid hover:text-black
        active:bg-white active:text-black active:border-white
        transition-all duration-200 ease-in-out
        uppercase
        ${className}
      `.trim()}
    >
      {children}
    </button>
  )
}
