import classNames from 'classnames'
import { FC } from 'react'
import styles from './Badge.module.css'

export type BadgeProps = {
  children: string
  className?: string
}

export const Badge: FC<BadgeProps> = ({ children, className }) => {
  const resultClassNames = classNames(styles.badgeBase, 'font-jura', className)
  return <span className={resultClassNames}>{children}</span>
}
