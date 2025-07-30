// lib/medusa.ts - Real Medusa client without demo fallbacks
const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

console.log('🔧 Medusa Config:')
console.log('- Backend URL:', MEDUSA_BACKEND_URL)
console.log('- API Key present:', !!PUBLISHABLE_API_KEY)

// Types
export interface Price {
    id: string
    amount: number
    currency_code: string
}

export interface ProductVariant {
    id: string
    title: string
    sku?: string
    prices?: Price[]
    inventory_quantity?: number
}

export interface ProductImage {
    id: string
    url: string
}

export interface Product {
    id: string
    title: string
    subtitle?: string
    description?: string
    handle: string
    thumbnail?: string
    images?: ProductImage[]
    variants?: ProductVariant[]
    status: string
}

export interface Region {
    id: string
    name: string
    currency_code: string
    countries: Array<{ iso_2: string; display_name: string }>
}

export interface Cart {
    id: string
    email?: string
    region: Region
    items: CartItem[]
    subtotal: number
    total: number
    shipping_total: number
    tax_total: number
}

export interface CartItem {
    id: string
    title: string
    description?: string
    thumbnail?: string
    quantity: number
    variant: ProductVariant
    unit_price: number
    total: number
}

class MedusaClient {
    private baseUrl: string
    private publishableApiKey: string

    constructor() {
        this.baseUrl = MEDUSA_BACKEND_URL
        this.publishableApiKey = PUBLISHABLE_API_KEY
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        }

        if (this.publishableApiKey) {
            headers['x-publishable-api-key'] = this.publishableApiKey
        }

        console.log(`🔄 API Request: ${endpoint}`)
        console.log(`🔗 Full URL: ${url}`)

        const response = await fetch(url, {
            ...options,
            headers,
        })

        console.log(`📡 Response: ${response.status} ${response.statusText}`)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ API Error:', response.status, errorText)
            throw new Error(`HTTP ${response.status}: ${errorText}`)
        }

        const data = await response.json()
        console.log(`✅ Data received:`, data)
        return data
    }

    // Get all products from Medusa
    async getProducts(): Promise<Product[]> {
        try {
            // Use correct Medusa v2 syntax - no expand parameter
            const response = await this.request<{ products: Product[] }>('/store/products')

            console.log('📦 Products from Medusa:', response.products?.length || 0)

            if (response.products && response.products.length > 0) {
                console.log('🔍 First product structure:', response.products[0])

                // Log variant and price info for debugging
                response.products.forEach((product, index) => {
                    console.log(`Product ${index + 1}:`, {
                        title: product.title,
                        handle: product.handle,
                        thumbnail: product.thumbnail,
                        variants: product.variants?.length || 0,
                        images: product.images?.length || 0,
                        firstVariantPrices: product.variants?.[0]?.prices?.length || 0
                    })
                })
            }

            return response.products || []
        } catch (error) {
            console.error('❌ Error fetching products:', error)
            throw error
        }
    }

    async getProduct(handle: string): Promise<Product | null> {
        try {
            console.log(`🔍 Fetching product with handle: ${handle}`)

            // Use correct Medusa v2 syntax - no expand parameter
            const response = await this.request<{ products: Product[] }>(`/store/products?handle=${handle}`)

            const product = response.products?.[0] || null

            if (product) {
                console.log('✅ Product found:', {
                    title: product.title,
                    variants: product.variants?.length,
                    images: product.images?.length,
                    thumbnail: product.thumbnail
                })
            } else {
                console.log('❌ Product not found for handle:', handle)
            }

            return product
        } catch (error) {
            console.error(`❌ Error fetching product ${handle}:`, error)
            throw error
        }
    }

    // Regions
    async getRegions(): Promise<Region[]> {
        try {
            const data = await this.request<{ regions: Region[] }>('/store/regions')
            return data.regions || []
        } catch (error) {
            console.error('Failed to fetch regions:', error)
            return []
        }
    }

    // Cart operations
    async createCart(regionId?: string): Promise<Cart | null> {
        try {
            const regions = await this.getRegions()
            const region = regionId
                ? regions.find(r => r.id === regionId)
                : regions[0]

            if (!region) {
                throw new Error('No region available')
            }

            const data = await this.request<{ cart: Cart }>('/store/carts', {
                method: 'POST',
                body: JSON.stringify({
                    region_id: region.id,
                }),
            })

            return data.cart
        } catch (error) {
            console.error('Failed to create cart:', error)
            return null
        }
    }

    async getCart(cartId: string): Promise<Cart | null> {
        try {
            const data = await this.request<{ cart: Cart }>(`/store/carts/${cartId}`)
            return data.cart
        } catch (error) {
            console.error('Failed to fetch cart:', error)
            return null
        }
    }

    async addToCart(
        cartId: string,
        variantId: string,
        quantity: number = 1
    ): Promise<Cart | null> {
        try {
            const data = await this.request<{ cart: Cart }>(`/store/carts/${cartId}/line-items`, {
                method: 'POST',
                body: JSON.stringify({
                    variant_id: variantId,
                    quantity,
                }),
            })

            return data.cart
        } catch (error) {
            console.error('Failed to add to cart:', error)
            return null
        }
    }

    async updateCartItem(
        cartId: string,
        lineItemId: string,
        quantity: number
    ): Promise<Cart | null> {
        try {
            const data = await this.request<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
                method: 'POST',
                body: JSON.stringify({ quantity }),
            })

            return data.cart
        } catch (error) {
            console.error('Failed to update cart item:', error)
            return null
        }
    }

    async removeFromCart(cartId: string, lineItemId: string): Promise<Cart | null> {
        try {
            const data = await this.request<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
                method: 'DELETE',
            })

            return data.cart
        } catch (error) {
            console.error('Failed to remove from cart:', error)
            return null
        }
    }

    // Health check
    async healthCheck(): Promise<boolean> {
        try {
            await this.request('/health')
            return true
        } catch (error) {
            return false
        }
    }
}

// Export singleton
export const medusaClient = new MedusaClient()

// Utility functions
export const formatPrice = (amount: number, currencyCode: string = 'EUR'): string => {
    if (!amount || isNaN(amount)) return '€0.00'

    return new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: currencyCode.toUpperCase(),
    }).format(amount / 100)
}

export const getVariantPrice = (variant: ProductVariant, currencyCode: string = 'EUR'): number => {
    if (!variant?.prices?.length) {
        console.warn('No prices found for variant:', variant)
        return 0
    }

    const price = variant.prices.find(p =>
        p?.currency_code?.toLowerCase() === currencyCode.toLowerCase()
    )

    const finalPrice = price?.amount || variant.prices[0]?.amount || 0
    console.log(`💰 Price for variant ${variant.title}:`, finalPrice, currencyCode)

    return finalPrice
}