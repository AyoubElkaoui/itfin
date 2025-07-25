import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { ChadorLinkButton } from "@modules/ui/components/chador-buttons.tsx"

interface FeaturedProductsProps {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
  products: HttpTypes.StoreProduct[]
}

export default function FeaturedProducts({
                                           collection,
                                           region,
                                           products,
                                         }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-chador-warm-white">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-chador-cream border border-chador-taupe rounded-full mb-6">
            <span className="text-sm font-medium text-chador-brown tracking-wide">
              Featured Collection
            </span>
          </div>

          <h2 className="chador-title text-4xl lg:text-5xl mb-6">
            {collection.title}
          </h2>

          {collection.description && (
            <p className="chador-subtitle max-w-2xl mx-auto text-chador-brown">
              {collection.description}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {products.slice(0, 8).map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductPreview
                product={product}
                region={region}
                isFeatured={index < 4}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <LocalizedClientLink href={`/collections/${collection.handle}`}>
            <ChadorLinkButton
              variant="primary"
              size="lg"
              icon={
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              }
            >
              Bekijk Volledige Collectie
            </ChadorLinkButton>
          </LocalizedClientLink>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-64 h-64 bg-chador-gold opacity-5 rounded-full transform translate-x-32"></div>
        <div className="absolute bottom-20 left-0 w-48 h-48 bg-chador-rose-gold opacity-5 rounded-full transform -translate-x-24"></div>
      </div>
    </section>
  )
}

// Alternative layout for collections showcase
export function CollectionsShowcase({
                                      collections,
                                      region,
                                    }: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  if (!collections || collections.length === 0) {
    return null
  }

  return (
    <section className="py-16 lg:py-24 bg-chador-cream">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="chador-title text-4xl lg:text-5xl mb-6">
            Onze Collecties
          </h2>
          <p className="chador-subtitle max-w-2xl mx-auto text-chador-brown">
            Ontdek onze zorgvuldig samengestelde collecties, elk met hun eigen unieke stijl en karakter.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.slice(0, 6).map((collection, index) => (
            <LocalizedClientLink
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group block"
            >
              <div className="chador-card relative overflow-hidden h-80 bg-chador-soft-beige rounded-lg">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-chador-gold rounded-full"></div>
                  <div className="absolute bottom-6 left-6 w-12 h-12 bg-chador-rose-gold rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="chador-heading text-2xl mb-3 group-hover:text-chador-gold transition-colors duration-200">
                      {collection.title}
                    </h3>
                    {collection.description && (
                      <p className="chador-body text-chador-brown line-clamp-3">
                        {collection.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center text-chador-brown group-hover:text-chador-gold transition-colors duration-200">
                    <span className="text-sm font-medium mr-2">Bekijk Collectie</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-chador-gold opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        {/* View All Collections */}
        <div className="text-center mt-12">
          <LocalizedClientLink href="/collections">
            <ChadorLinkButton
              variant="primary"
              size="lg"
              icon={
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              }
            >
              Alle Collecties Bekijken
            </ChadorLinkButton>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}