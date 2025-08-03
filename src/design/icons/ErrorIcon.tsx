import { FC, SVGProps } from 'react'

export const ErrorIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 20.5C4.477 20.5 0 16.023 0 10.5C0 4.977 4.477 0.5 10 0.5C15.523 0.5 20 4.977 20 10.5C20 16.023 15.523 20.5 10 20.5ZM10 9.086L7.172 6.257L5.757 7.672L8.586 10.5L5.757 13.328L7.172 14.743L10 11.914L12.828 14.743L14.243 13.328L11.414 10.5L14.243 7.672L12.828 6.257L10 9.086Z"
        fill="currentColor"
      />
    </svg>
  )
}
