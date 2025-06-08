import { Typography } from '#/design/Layout/shared/Typography'

export default function TypographyTestPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Color Tokens</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-black rounded-lg mb-2"></div>
            <Typography variant="small">Black (#1A1A1A)</Typography>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-light-gray rounded-lg mb-2"></div>
            <Typography variant="small">Light Gray (#545454)</Typography>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-lg mb-2"></div>
            <Typography variant="small">White (#F8F8F8)</Typography>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-acid rounded-lg mb-2"></div>
            <Typography variant="small">Green Acid (#C3F02F)</Typography>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-dark-gray rounded-lg mb-2"></div>
            <Typography variant="small">Dark Gray (#272727)</Typography>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-non-accent-green rounded-lg mb-2"></div>
            <Typography variant="small">Non Accent Green (#78941B)</Typography>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-error rounded-lg mb-2"></div>
            <Typography variant="small">Error (#FF0101)</Typography>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Desktop Typography Variants</h2>
        <div className="space-y-4">
          <Typography variant="title1" className="text-green-acid">Title/Header 1 - Jura Bold 64px</Typography>
          <Typography variant="title2" className="text-black">Title/Header 2 - Jura Bold 40px</Typography>
          <Typography variant="title3" className="text-dark-gray">Header 3 - Jura Bold 28px</Typography>
          <Typography variant="menu" className="text-light-gray">Menu/Subtitles - Jura Medium 16px</Typography>
          <Typography variant="bottoms" className="text-non-accent-green">Bottoms - Jura Bold 16px</Typography>
          <Typography variant="body">Body - Manrope Medium 16px</Typography>
          <Typography variant="small" className="text-light-gray">Small text - Manrope Regular 14px</Typography>
          <Typography variant="blogTitle">Blog title - Manrope Semibold 16px</Typography>
          <Typography variant="blogIntro">Blog intro - Manrope Medium 16px</Typography>
          <Typography variant="link" className="text-green-acid">Link - Manrope Medium 12px</Typography>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Mobile Typography Variants</h2>
        <div className="space-y-4">
          <Typography variant="mobileTitle1" className="text-green-acid">Mobile Header 1 - Jura Bold 40px</Typography>
          <Typography variant="mobileTitle2" className="text-black">Mobile Header 2 - Jura Bold 32px</Typography>
          <Typography variant="mobileTitle3" className="text-dark-gray">Mobile header 3 - Jura Bold 24px</Typography>
          <Typography variant="mobileMenu" className="text-light-gray">Mobile Menu/Subtitles - Jura Medium 16px</Typography>
          <Typography variant="mobileBottoms" className="text-non-accent-green">Mobile Bottoms - Jura Bold 16px</Typography>
          <Typography variant="mobileBody">Mobile Body - Manrope Medium 16px</Typography>
          <Typography variant="mobileSmall" className="text-light-gray">New small text - Manrope Regular 14px</Typography>
          <Typography variant="mobileBlogTitle">Mobile blog title - Manrope Semibold 16px</Typography>
          <Typography variant="mobileBlogIntro">Mobile blog intro - Manrope Medium 16px</Typography>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Legacy Variants (Backward Compatibility)</h2>
        <div className="space-y-4">
          <Typography variant="h1">H1 Legacy</Typography>
          <Typography variant="h2">H2 Legacy</Typography>
          <Typography variant="h3">H3 Legacy</Typography>
          <Typography variant="p">Paragraph Legacy</Typography>
          <Typography variant="span">Span Legacy</Typography>
        </div>
      </div>
    </div>
  )
}
