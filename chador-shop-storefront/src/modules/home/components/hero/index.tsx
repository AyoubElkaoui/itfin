import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-chador-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-chador-gold rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-chador-rose-gold rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 bg-chador-sage rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Elegant Badge */}
        <div className="inline-flex items-center px-6 py-2 bg-chador-warm-white border border-chador-taupe rounded-full mb-8 animate-fade-in-down">
          <span className="text-sm font-medium text-chador-brown tracking-wide">
            Premium Islamic Fashion
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Heading
            level="h1"
            className="chador-title bg-gradient-to-r from-chador-dark-brown to-chador-black bg-clip-text text-transparent"
          >
            Elegantie in Eenvoud
          </Heading>
          <p className="chador-subtitle text-chador-brown max-w-2xl mx-auto">
            Ontdek onze collectie van hoogwaardige chadors, hijabs en islamitische kleding.
            Waar traditie en moderne elegantie samenkomen.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <LocalizedClientLink href="/store">
            <Button
              className="chador-btn group relative overflow-hidden"
              size="large"
            >
              <span className="relative z-10 flex items-center gap-2">
                Bekijk Collectie
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Button>
          </LocalizedClientLink>

          <LocalizedClientLink href="/collections">
            <Button
              variant="secondary"
              className="chador-btn-secondary"
              size="large"
            >
              Categorieën
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-chador-cream rounded-full flex items-center justify-center mx-auto mb-4 shadow-chador">
              <svg className="w-8 h-8 text-chador-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="chador-heading text-lg mb-2">Premium Kwaliteit</h3>
            <p className="chador-caption">Alleen de beste materialen en vakmanschap</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-chador-cream rounded-full flex items-center justify-center mx-auto mb-4 shadow-chador">
              <svg className="w-8 h-8 text-chador-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="chador-heading text-lg mb-2">Snelle Levering</h3>
            <p className="chador-caption">Gratis verzending vanaf €50</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-chador-cream rounded-full flex items-center justify-center mx-auto mb-4 shadow-chador">
              <svg className="w-8 h-8 text-chador-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="chador-heading text-lg mb-2">Met Liefde Gemaakt</h3>
            <p className="chador-caption">Respect voor traditie en cultuur</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
          <div className="w-6 h-10 border-2 border-chador-taupe rounded-full flex justify-center">
            <div className="w-1 h-3 bg-chador-gold rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-8 w-2 h-16 bg-chador-gold opacity-20 transform rotate-12"></div>
        <div className="absolute top-1/3 right-12 w-1 h-12 bg-chador-rose-gold opacity-30 transform -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-chador-sage opacity-40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-chador-gold opacity-50 rounded-full"></div>
      </div>
    </div>
  )
}

export default Hero