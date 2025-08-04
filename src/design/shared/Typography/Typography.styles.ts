import { TypographyVariant } from './Typography'

export const getTypographyStyles = ({ variant }: { variant: TypographyVariant }) => {
  const baseStyles = 'antialiased'

  switch (variant) {
    // Desktop Typography Variants
    case 'title1':
      return `${baseStyles} font-jura font-bold text-[1.5rem] leading-[115%] lg:text-[4rem] lg:leading-[120%]`

    case 'title2':
      return `${baseStyles} font-jura font-bold text-[2.5rem] leading-[120%]`

    case 'title3':
      return `${baseStyles} font-jura font-bold text-[1.75rem] leading-[120%]`

    case 'menu':
      return `${baseStyles} font-jura font-medium text-[1rem] leading-[100%] lg:text-[1.5rem] lg:leading-[125%]`

    case 'bottoms':
      return `${baseStyles} font-jura font-bold text-[1.25rem] leading-[100%]`

    case 'body':
      return `${baseStyles} font-manrope font-medium text-[1rem] leading-[125%]`

    case 'small':
      return `${baseStyles} font-manrope font-regular text-[0.875rem] leading-[125%]`

    case 'blogTitle':
      return `${baseStyles} font-manrope font-semibold text-[1rem] leading-[125%]`

    case 'blogIntro':
      return `${baseStyles} font-manrope font-medium text-[1rem] leading-[125%]`

    case 'link':
      return `${baseStyles} font-manrope font-medium text-[0.75rem] leading-[125%] underline`

    // Mobile Typography Variants
    case 'mobileTitle2':
      return `${baseStyles} font-jura font-bold text-[2rem] leading-[120%] md:text-[2.5rem]`

    case 'mobileTitle3':
      return `${baseStyles} font-jura font-bold text-[1.5rem] leading-[120%] md:text-[1.75rem]`

    case 'mobileBottoms':
      return `${baseStyles} font-jura font-bold text-[1rem] leading-[100%]`

    case 'mobileBody':
      return `${baseStyles} font-manrope font-medium text-[1rem] leading-[125%]`

    case 'mobileSmall':
      return `${baseStyles} font-manrope font-regular text-[0.875rem] leading-[125%]`

    case 'mobileBlogTitle':
      return `${baseStyles} font-manrope font-semibold text-[1rem] leading-[125%]`

    case 'mobileBlogIntro':
      return `${baseStyles} font-manrope font-medium text-[1rem] leading-[125%]`

    // Legacy variants for backward compatibility
    case 'h1':
      return `${baseStyles} font-jura font-bold text-[4rem] leading-[120%] md:text-[2.5rem]`

    case 'h2':
      return `${baseStyles} font-jura font-bold text-[2.5rem] leading-[120%] md:text-[2rem]`

    case 'h3':
      return `${baseStyles} font-jura font-bold text-[1.75rem] leading-[120%] md:text-[1.5rem]`

    case 'h4':
      return `${baseStyles} font-jura font-medium text-[1.25rem] leading-[120%]`

    case 'h5':
      return `${baseStyles} font-jura font-medium text-[1.125rem] leading-[120%]`

    case 'h6':
      return `${baseStyles} font-jura font-medium text-[1rem] leading-[120%]`

    case 'p':
      return `${baseStyles} font-manrope font-medium text-[1rem] leading-[125%]`

    case 'span':
      return `${baseStyles} font-manrope font-regular text-[1rem] leading-[125%]`

    default:
      return `${baseStyles} font-manrope font-medium text-[1rem] leading-[125%]`
  }
}
