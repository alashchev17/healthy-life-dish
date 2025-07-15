import { FC, ReactNode } from 'react'

export const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="px-6 lg:px-10">{children}</div>
}
