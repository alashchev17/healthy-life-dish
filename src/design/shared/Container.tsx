import { FC, ReactNode } from 'react'

export const Container: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={'px-6 lg:px-10' + (className ? ` ${className}` : '')}>{children}</div>
}
