// lib/medusa.ts - Werkende Medusa v2 Client
import Medusa from "@medusajs/js-sdk"

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

// Initialize Medusa SDK
export const medusa = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    publishableKey: PUBLISHABLE_API_KEY,
})

// Types - Export van Medusa SDK
export type {
    StoreProduct as Product,
    StoreProductVariant as ProductVariant,
    StoreCart as Cart,
    StoreCartLineItem as CartItem,
    StoreRegion as Region
} from "@medusajs/js-sdk"

// Custom interfaces voor ons gebruik
export interface ProductWithVariants {
    id: string
    title: string
    subtitle?: string
    description?: string
    handle: string
    thumbnail?: string
    images?: Array<{ id: string; url: string }>
    variants?: Array<{
        id: string
        title: string
        sku?: string
        prices?: Array<{
            id: string
            amount: number
            currency_code: string
        }>
        inventory_quantity?: number
    }>
    status: string
}

class MedusaClient {
    // Get all products
    async getProducts(): Promise<ProductWithVariants[]> {
        try {
            console.log('🔍 Fetching products from Medusa v2...')

            const { products } = await medusa.store.product.list({
                limit: 100,
                fields: "*variants,*variants.prices,*images"
            })

            console.log(`✅ Found ${products?.length || 0} products`)

            if (products) {
                products.forEach((product, index) => {
                    console.log(`Product ${index + 1}:`, {
                        id: product.id,
                        title: product.title,
                        handle: product.handle,
                        variants: product.variants?.length || 0,
                        thumbnail: product.thumbnail
                    })
                })
            }

            return products || []
        } catch (error) {
            console.error('❌ Error fetching products:', error)
            return []
        }
    }

    // Get single product by handle
    async getProduct(handle: string): Promise<ProductWithVariants | null> {
        try {
            console.log(`🔍 Fetching product: ${handle}`)

            const { products } = await medusa.store.product.list({
                handle: handle,
                fields: "*variants,*variants.prices,*images"
            })

            const product = products?.[0] || null

            if (product) {
                console.log('✅ Product found:', product.title)
            } else {
                console.log('❌ Product not found')
            }

            return product
        } catch (error) {
            console.error(`❌ Error fetching product ${handle}:`, error)
            return null
        }
    }

    // Get regions
    async getRegions() {
        try {
            const { regions } = await medusa.store.region.list()
            return regions || []
        } catch (error) {
            console.error('❌ Error fetching regions:', error)
            // Fallback region
            return [{
                id: 'default-eur',
                name: 'Europe',
                currency_code: 'eur',
                countries: []
            }]
        }
    }

    // Create cart
    async createCart(regionId?: string) {
        try {
            const regions = await this.getRegions()
            const region = regionId
                ? regions.find(r => r.id === regionId) || regions[0]
                : regions[0]

            const { cart } = await medusa.store.cart.create({
                region_id: region.id
            })

            console.log('✅ Cart created:', cart?.id)
            return cart
        } catch (error) {
            console.error('❌ Error creating cart:', error)
            return null
        }
    }

    // Get cart
    async getCart(cartId: string) {
        try {
            const { cart } = await medusa.store.cart.retrieve(cartId)
            return cart
        } catch (error) {
            console.error('❌ Error fetching cart:', error)
            return null
        }
    }

    // Add to cart
    async addToCart(cartId: string, variantId: string, quantity: number = 1) {
        try {
            const { cart } = await medusa.store.cart.lineItem.create(cartId, {
                variant_id: variantId,
                quantity
            })

            console.log('✅ Added to cart')
            return cart
        } catch (error) {
            console.error('❌ Error adding to cart:', error)
            throw error
        }
    }

    // Update cart item
    async updateCartItem(cartId: string, lineItemId: string, quantity: number) {
        try {
            const { cart } = await medusa.store.cart.lineItem.update(cartId, lineItemId, {
                quantity
            })
            return cart
        } catch (error) {
            console.error('❌ Error updating cart item:', error)
            throw error
        }
    }

    // Remove from cart
    async removeFromCart(cartId: string, lineItemId: string) {
        try {
            const { cart } = await medusa.store.cart.lineItem.delete(cartId, lineItemId)
            return cart
        } catch (error) {
            console.error('❌ Error removing from cart:', error)
            throw error
        }
    }

    // Health check
    async healthCheck(): Promise<boolean> {
        try {
            const response = await fetch(`${MEDUSA_BACKEND_URL}/health`)
            return response.ok
        } catch (error) {
            console.error('❌ Health check failed:', error)
            return false
        }
    }
}

// Export singleton
export const medusaClient = new MedusaClient()

// Utility functions
export const formatPrice = (amount: number, currencyCode: string = 'EUR'): string => {
    if (!amount || isNaN(amount)) return '€0,00'

    return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: currencyCode.toUpperCase(),
    }).format(amount / 100)
}

export const getVariantPrice = (variant: any, currencyCode: string = 'EUR'): number => {
    if (!variant?.prices?.length) {
        console.warn('❌ No prices found for variant:', variant?.title)
        return 0
    }

    // Zoek prijs voor de juiste currency
    const price = variant.prices.find((p: any) =>
        p?.currency_code?.toLowerCase() === currencyCode.toLowerCase()
    )

    // Fallback naar eerste prijs
    const finalPrice = price?.amount || variant.prices[0]?.amount || 0

    console.log(`💰 Price for ${variant.title}: ${finalPrice} ${currencyCode}`)

    return finalPrice
}