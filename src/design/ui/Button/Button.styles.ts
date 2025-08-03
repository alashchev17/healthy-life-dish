import { ButtonVariant } from '#/design/ui/Button/Button'

export function getButtonStyles({
  variant,
  fullWidth,
  disabled,
  fullyRounded,
  size,
}: {
  variant: ButtonVariant
  fullWidth: boolean
  disabled: boolean
  fullyRounded: boolean
  size: 'sm' | 'md'
}) {
  // Base styles
  const baseStyles =
    'font-jura font-bold text-[20px] leading-[90%] uppercase transition-all duration-200 ease-in-out disabled:cursor-not-allowed cursor-pointer'

  // Width styles - icon variant overrides fullWidth
  const widthStyles = variant === 'icon' ? '' : fullWidth ? 'w-full' : 'w-auto'

  // Size styles - icon variant gets fixed dimensions, otherwise use variant-specific sizing
  const iconButtonDimensions = size === 'sm' ? 'w-12 h-12' : 'w-17 h-17'
  // const sizeStyles =
  //   variant === "icon" ? `${iconButtonDimensions} p-0` : "text-base min-h-[48px] py-6 px-9";

  let sizeStyles = 'text-base min-h-[48px] py-6 px-9'

  // Variant styles and variant-specific disabled styles
  let variantStyles = ''

  switch (variant) {
    case 'primary':
      variantStyles =
        'border-[3px] rounded-[24px] bg-green-acid border-green-acid text-black hover:bg-black hover:text-white active:bg-white active:text-black active:border-transparent'
      if (disabled) {
        variantStyles = 'border-[3px] rounded-[24px] bg-dark-gray border-dark-gray text-light-gray cursor-not-allowed pointer-events-none'
      }
      break
    case 'secondary':
      sizeStyles = 'text-base min-h-[48px] py-4 px-6'
      variantStyles =
        'border-[3px] rounded-[24px] bg-black border-green-acid text-green-acid hover:bg-green-acid hover:text-black active:bg-white active:text-black active:border-white focus:ring-black'
      if (disabled) {
        variantStyles = 'border-[3px] rounded-[24px] border-light-gray text-light-gray cursor-not-allowed pointer-events-none'
      }
      break
    case 'special-light':
      variantStyles =
        'text-black border-b-[3px] rounded-tl-[24px] rounded-tr-[24px] border-b-light-gray hover:bg-non-accent-green hover:border-white hover:text-white active:bg-black active:text-white active:border-white focus:ring-light-gray'
      if (disabled) {
        variantStyles =
          'border-b-[3px] rounded-tl-[24px] rounded-tr-[24px] border-non-accent-green text-non-accent-green cursor-not-allowed pointer-events-none'
      }
      break
    case 'special-dark':
      variantStyles =
        'text-white border-b-[3px] rounded-tl-[24px] rounded-tr-[24px] border-b-green-acid hover:bg-non-accent-green hover:border-white hover:text-white active:bg-white active:border-white active:text-black focus:ring-light-gray'
      if (disabled) {
        variantStyles =
          'border-b-[3px] rounded-tl-[24px] rounded-tr-[24px] border-light-gray text-light-gray cursor-not-allowed pointer-events-none'
      }
      break
    case 'icon':
      sizeStyles = `${iconButtonDimensions} p-0`
      // Icon variant - uses primary button colors but with fixed icon sizing
      variantStyles = fullyRounded
        ? 'border-[3px] rounded-full bg-green-acid border-green-acid text-black hover:bg-black hover:text-white active:bg-white active:text-black active:border-transparent'
        : 'border-[3px] rounded-[24px] bg-green-acid border-green-acid text-black hover:bg-black hover:text-white active:bg-white active:text-black active:border-transparent'
      if (disabled) {
        variantStyles = fullyRounded
          ? 'border-[3px] rounded-full bg-dark-gray border-dark-gray text-light-gray cursor-not-allowed pointer-events-none'
          : 'border-[3px] rounded-[24px] bg-dark-gray border-dark-gray text-light-gray cursor-not-allowed pointer-events-none'
      }
      // Icon variant doesn't get additional padding - it uses the fixed w-12 h-12 p-0 from sizeStyles
      break
  }

  return `${baseStyles} ${sizeStyles} ${widthStyles} ${variantStyles}`.trim()
}
