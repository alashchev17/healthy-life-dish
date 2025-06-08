import { FC, ReactNode } from 'react'
import { ArrowRight } from '../../icons/ArrowRight'

export type ButtonVariant = 'primary' | 'secondary' | 'special-light' | 'special-dark'
export type IconPosition = 'left' | 'right'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  loading?: boolean
  icon?: ReactNode
  iconPosition?: IconPosition
  fullWidth?: boolean
}

const getButtonStyles = (variant: ButtonVariant, fullWidth: boolean, disabled: boolean) => {
  // Base styles
  const baseStyles =
    'font-jura font-bold text-[20px] leading-[90%] uppercase transition-all duration-200 ease-in-out disabled:cursor-not-allowed cursor-pointer'

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : 'w-auto'

  // Size styles (will be modified per variant)
  let sizeStyles = 'text-base min-h-[48px] '

  // Variant styles and variant-specific disabled styles
  let variantStyles = ''

  switch (variant) {
    case 'primary':
      variantStyles =
        'border-[3px] rounded-[24px] bg-green-acid border-green-acid text-black hover:bg-black hover:text-white active:bg-white active:text-black active:border-transparent'
      if (disabled) {
        variantStyles = 'border-[3px] rounded-[24px] bg-dark-gray border-dark-gray text-light-gray cursor-not-allowed pointer-events-none'
      }
      sizeStyles += 'py-6 px-9'
      break
    case 'secondary':
      variantStyles =
        'border-[3px] rounded-[24px] bg-black border-green-acid text-green-acid hover:bg-green-acid hover:text-black active:bg-white active:border-white focus:ring-black'
      if (disabled) {
        variantStyles = 'border-[3px] rounded-[24px] border-light-gray text-light-gray cursor-not-allowed pointer-events-none'
      }
      sizeStyles += 'py-4 px-9'
      break
    case 'special-light':
      variantStyles =
        'text-black border-b-[3px] rounded-tl-[24px] rounded-tr-[24px] border-b-light-gray hover:bg-non-accent-green hover:border-white hover:text-white active:bg-black active:border-white focus:ring-light-gray'
      if (disabled) {
        variantStyles =
          'border-b-[3px] rounded-tl-[24px] rounded-tr-[24px] border-non-accent-green text-non-accent-green cursor-not-allowed pointer-events-none'
      }
      sizeStyles += 'py-4 px-9'
      break
    case 'special-dark':
      variantStyles =
        'text-white border-b-[3px] rounded-tl-[24px] rounded-tr-[24px] border-b-green-acid hover:bg-non-accent-green hover:border-white hover:text-white active:bg-white active:border-white active:text-black focus:ring-light-gray'
      if (disabled) {
        variantStyles =
          'border-b-[3px] rounded-tl-[24px] rounded-tr-[24px] border-light-gray text-light-gray cursor-not-allowed pointer-events-none'
      }
      sizeStyles += 'py-4 px-9'
      break
  }

  return `${baseStyles} ${sizeStyles} ${widthStyles} ${variantStyles}`.trim()
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const buttonStyles = getButtonStyles(variant, fullWidth, disabled || loading)
  const combinedClassName = `${buttonStyles} ${className}`.trim()

  const renderIcon = () => {
    if (loading) {
      return (
        <div className="animate-spin">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )
    }

    if (icon) {
      return icon
    }

    // Default arrow icon for primary and secondary buttons
    if (variant === 'primary' || variant === 'secondary') {
      return <ArrowRight className="w-4 h-4" />
    }

    return null
  }

  const iconElement = renderIcon()

  return (
    <button className={combinedClassName} disabled={disabled || loading} {...props}>
      <div className="flex justify-between items-center gap-2">
        {iconPosition === 'left' && iconElement && <span className="flex-shrink-0">{iconElement}</span>}

        <span className="flex-1 text-left">{children}</span>

        {iconPosition === 'right' && iconElement && <span className="flex-shrink-0">{iconElement}</span>}
      </div>
    </button>
  )
}
