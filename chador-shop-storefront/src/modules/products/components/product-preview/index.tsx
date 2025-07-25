import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
                                               product,
                                               isFeatured,
                                               region,
                                             }: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        className="chador-product-card relative overflow-hidden"
        data-testid="product-wrapper"
      >
        {/* Product Image */}
        <div className="relative overflow-hidden bg-chador-cream rounded-t-lg">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="w-full transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-chador-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="bg-chador-warm-white text-chador-black px-4 py-2 rounded-full text-sm font-medium">
                Bekijk Product
              </span>
            </div>
          </div>

          {/* Sale Badge */}
          {cheapestPrice?.price_type === "sale" && (
            <div className="absolute top-3 left-3 bg-chador-gold text-chador-black px-3 py-1 rounded-full text-xs font-medium">
              Sale
            </div>
          )}

          {/* New Badge */}
          {new Date(product.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
            <div className="absolute top-3 right-3 bg-chador-sage text-white px-3 py-1 rounded-full text-xs font-medium">
              Nieuw
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 bg-chador-warm-white rounded-b-lg">
          <div className="mb-2">
            {/* Product Category */}
            {product.collection && (
              <span className="text-xs text-chador-brown tracking-wide uppercase">
                {product.collection.title}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3
            className="chador-heading text-lg mb-2 line-clamp-2 group-hover:text-chador-gold transition-colors duration-200"
            data-testid="product-title"
          >
            {product.title}
          </h3>

          {/* Product Description Preview */}
          {product.description && (
            <p className="text-sm text-chador-brown line-clamp-2 mb-3">
              {product.description}
            </p>
          )}

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>

            {/* Rating Stars Placeholder */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${i < 4 ? 'text-chador-gold' : 'text-chador-soft-beige'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="flex-1 bg-chador-cream hover:bg-chador-soft-beige text-chador-black py-2 px-3 rounded text-sm font-medium transition-colors duration-200">
              Snel Bekijken
            </button>
            <button className="bg-chador-gold hover:bg-opacity-90 text-chador-black p-2 rounded transition-colors duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}