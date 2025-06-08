import { FC, SVGProps } from 'react'

export const ArrowRight: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M9.4043 2.6543L15.7499 8.99995L9.4043 15.3456"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.7499 9L2.25 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
