import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Heading
            level="h1"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Kwaliteit die spreekt
          </Heading>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ontdek onze zorgvuldig geselecteerde collectie van premium producten.
            Elke aankoop is een investering in kwaliteit en stijl.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <LocalizedClientLink href="/store">
              <Button
                size="large"
                className="bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Bekijk collectie
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/about"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
            >
              Meer over ons <span aria-hidden="true">→</span>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero