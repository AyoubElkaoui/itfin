// lib/medusa.ts - GEFIXTE VERSIE DIE GEWOON WERKT
import Medusa from "@medusajs/js-sdk"

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

console.log('🔧 Medusa Client Setup:')
console.log('   Backend URL:', MEDUSA_BACKEND_URL)
console.log('   API Key:', PUBLISHABLE_API_KEY ? 'Present' : 'Missing')
console.log('   Raw env vars:', {
    backend: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
    key: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
})

// Initialize Medusa SDK
export const medusa = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    publishableKey: PUBLISHABLE_API_KEY,
    debug: true
})

// Types
export type {
    StoreProduct as Product,
    StoreProductVariant as ProductVariant,
    StoreCart as Cart,
    StoreCartLineItem as CartItem,
    StoreRegion as Region
} from "@medusajs/js-sdk"

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

export interface ProductImage {
    id: string
    url: string
}

class MedusaClient {
    async healthCheck(): Promise<boolean> {
        try {
            console.log('🏥 Health check...')

            // Test de store/regions endpoint ipv health (die vereist API key)
            const response = await medusa.store.region.list()
            const isHealthy = response && response.regions && response.regions.length > 0

            console.log(`   Result: ${isHealthy ? '✅ Healthy' : '❌ Failed'}`)
            console.log(`   Regions found: ${response?.regions?.length || 0}`)

            return isHealthy
        } catch (error) {
            console.error('❌ Health check failed:', error)
            return false
        }
    }

    async getProducts(): Promise<ProductWithVariants[]> {
        try {
            console.log('📦 Fetching products...')

            const response = await medusa.store.product.list({
                limit: 100,
                fields: "*variants,*variants.prices,*images"
            })

            const products = response.products || []
            console.log(`   Found: ${products.length} products`)

            return products
        } catch (error) {
            console.error('❌ Products fetch failed:', error)
            return []
        }
    }

    async getProduct(handle: string): Promise<ProductWithVariants | null> {
        try {
            console.log(`🔍 Fetching product: ${handle}`)

            const response = await medusa.store.product.list({
                handle: handle,
                fields: "*variants,*variants.prices,*images"
            })

            const product = response.products?.[0] || null
            console.log(`   Found: ${product ? '✅ Yes' : '❌ No'}`)

            return product
        } catch (error) {
            console.error(`❌ Product fetch failed for ${handle}:`, error)
            return null
        }
    }

    async getRegions() {
        try {
            console.log('🌍 Fetching regions...')

            const response = await medusa.store.region.list()
            const regions = response.regions || []

            console.log(`   Found: ${regions.length} regions`)
            regions.forEach(r => {
                console.log(`   - ${r.name}: ${r.currency_code} (${r.countries?.length || 0} countries)`)
            })

            return regions
        } catch (error) {
            console.error('❌ Regions fetch failed:', error)
            return []
        }
    }

    async createCart(regionId?: string) {
        try {
            console.log('🛒 Creating cart...')

            const regions = await this.getRegions()
            const region = regionId ? regions.find(r => r.id === regionId) : regions[0]

            if (!region) {
                throw new Error('No region available')
            }

            const response = await medusa.store.cart.create({
                region_id: region.id
            })

            const cart = response.cart
            console.log(`   Created: ${cart?.id}`)
            return cart
        } catch (error) {
            console.error('❌ Cart creation failed:', error)
            return null
        }
    }

    async getCart(cartId: string) {
        try {
            const response = await medusa.store.cart.retrieve(cartId)
            return response.cart
        } catch (error) {
            console.error('❌ Cart fetch failed:', error)
            return null
        }
    }

    async addToCart(cartId: string, variantId: string, quantity: number = 1) {
        try {
            const response = await medusa.store.cart.lineItem.create(cartId, {
                variant_id: variantId,
                quantity
            })
            console.log('✅ Added to cart')
            return response.cart
        } catch (error) {
            console.error('❌ Add to cart failed:', error)
            throw error
        }
    }

    async updateCartItem(cartId: string, lineItemId: string, quantity: number) {
        try {
            const response = await medusa.store.cart.lineItem.update(cartId, lineItemId, {
                quantity
            })
            return response.cart
        } catch (error) {
            console.error('❌ Update cart item failed:', error)
            throw error
        }
    }

    async removeFromCart(cartId: string, lineItemId: string) {
        try {
            const response = await medusa.store.cart.lineItem.delete(cartId, lineItemId)
            return response.cart
        } catch (error) {
            console.error('❌ Remove from cart failed:', error)
            throw error
        }
    }
}

export const medusaClient = new MedusaClient()

// Utility functions
export const formatPrice = (amount: number, currencyCode: string = 'EUR'): string => {
    if (!amount || isNaN(amount)) return '€0,00'

    try {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: currencyCode.toUpperCase(),
        }).format(amount / 100)
    } catch (error) {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
        }).format(amount / 100)
    }
}

export const getVariantPrice = (variant: any, currencyCode: string = 'EUR'): number => {
    if (!variant?.prices?.length) {
        return 0
    }

    const currency = currencyCode.toLowerCase()
    let price = variant.prices.find((p: any) => p?.currency_code?.toLowerCase() === currency)

    if (!price && currency !== 'eur') {
        price = variant.prices.find((p: any) => p?.currency_code?.toLowerCase() === 'eur')
    }

    if (!price) {
        price = variant.prices[0]
    }

    return price?.amount || 0
}