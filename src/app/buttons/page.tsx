import { Button } from "#/design/ui/shared";
import { Typography } from "#/design/Layout/shared/Typography";
import { ArrowRight } from "#/design/icons";

export default function ButtonsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <Typography variant="title1" className="text-center mb-12">
          Button Component Showcase
        </Typography>

        {/* Primary Buttons */}
        <section className="space-y-6">
          <Typography variant="title3">Primary Buttons</Typography>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Підписатися</Button>
            <Button variant="primary" disabled>
              Підписатися (Disabled)
            </Button>
            <Button variant="primary" loading>
              Підписатися (Loading)
            </Button>
          </div>
        </section>

        {/* Secondary Buttons */}
        <section className="space-y-6">
          <Typography variant="title3">Secondary Buttons</Typography>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary">Обрати дієту</Button>
            <Button variant="secondary" disabled>
              Обрати дієту (Disabled)
            </Button>
            <Button variant="secondary" loading>
              Обрати дієту (Loading)
            </Button>
          </div>
        </section>

        {/* Special Buttons */}
        <section className="bg-green-acid px-6 py-4 rounded-2xl space-y-6">
          <Typography variant="title3" className="text-black">
            Special Light Buttons
          </Typography>
          <div className="flex flex-wrap gap-4">
            <Button variant="special-light">Забрати дієту</Button>
            <Button variant="special-light" disabled>
              Забрати дієту (Disabled)
            </Button>
            <Button variant="special-light" loading>
              Забрати дієту (Loading)
            </Button>
          </div>
        </section>
        <section className="space-y-6">
          <Typography variant="title3">Special Dark Buttons</Typography>
          <div className="flex flex-wrap gap-4">
            <Button variant="special-dark">Забрати дієту</Button>
            <Button variant="special-dark" disabled>
              Забрати дієту (Disabled)
            </Button>
            <Button variant="special-dark" loading>
              Забрати дієту (Loading)
            </Button>
          </div>
        </section>

        {/* Custom Icons */}
        <section className="space-y-6">
          <Typography variant="title3">Custom Icons</Typography>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" icon={<span>+</span>} iconPosition="left">
              Додати відгук
            </Button>
            <Button variant="secondary" icon={<span>⚡</span>}>
              Обрати програму
            </Button>
          </div>
        </section>

        {/* Icon Variant Buttons */}
        <section id="icon-only-section" className="space-y-6">
          <Typography variant="title3">Icon Variant Buttons</Typography>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="icon" icon={<ArrowRight />} size="md" />
            <Button variant="icon" icon={<ArrowRight />} size="md" disabled />
            <Button variant="icon" icon={<ArrowRight />} size="md" loading />
          </div>
        </section>

        {/* Icon Variant + Fully Rounded */}
        <section className="space-y-6">
          <Typography variant="title3">Icon Variant + Fully Rounded</Typography>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="icon" icon={<ArrowRight />} fullyRounded />
            <Button
              variant="icon"
              icon={<ArrowRight />}
              fullyRounded
              disabled
            />
            <Button variant="icon" icon={<ArrowRight />} fullyRounded loading />
          </div>
        </section>

        {/* Full Width */}
        <section className="space-y-6">
          <Typography variant="title3">Full Width</Typography>
          <div className="space-y-4">
            <Button variant="primary" fullWidth>
              Підписатися
            </Button>
            <Button variant="secondary" fullWidth>
              Обрати дієту
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}