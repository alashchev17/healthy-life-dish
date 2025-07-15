import { FC, SVGProps } from 'react'

export const ChevronRight: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.height ?? '16'}
      height={props.height ?? '27'}
      viewBox="0 0 16 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M2 2L14 13.5L2 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
