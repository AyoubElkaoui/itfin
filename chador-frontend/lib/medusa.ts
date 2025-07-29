// lib/medusa.ts - Complete medusa library
const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
const API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

console.log('🔧 Environment Check:')
console.log('- MEDUSA_URL:', MEDUSA_URL)
console.log('- API_KEY present:', !!API_KEY)
console.log('- API_KEY length:', API_KEY.length)
console.log('- API_KEY starts with pk_:', API_KEY.startsWith('pk_'))

// Headers voor alle requests
const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
        'x-publishable-api-key': API_KEY,
    }
    console.log('📤 Request headers:', headers)
    return headers
}

// Types
export interface Product {
    id: string
    title: string
    description: string
    handle: string
    thumbnail: string
    images: Array<{ url: string }>
    variants: Array<{
        id: string
        title: string
        prices: Array<{
            amount: number
            currency_code: string
        }>
    }>
}

export interface Collection {
    id: string
    title: string
    handle: string
    products: Product[]
}

// API Response types
interface ProductsResponse {
    products: Product[]
    count: number
    offset: number
    limit: number
}

interface CollectionsResponse {
    collections: Collection[]
    count: number
    offset: number
    limit: number
}

// Test connectie functie met uitgebreide logging
export async function testConnection(): Promise<{ success: boolean; error?: string; details?: any }> {
    try {
        console.log('🔄 Testing connection to Medusa...')
        console.log('🔗 URL:', `${MEDUSA_URL}/store/products?limit=1`)

        // Check eerst of de URL bereikbaar is zonder headers
        try {
            const basicResponse = await fetch(`${MEDUSA_URL}/store/products?limit=1`)
            console.log('📡 Basic response status:', basicResponse.status)
            const basicText = await basicResponse.text()
            console.log('📝 Basic response:', basicText.substring(0, 200) + '...')
        } catch (basicError) {
            console.error('❌ Basic connection failed:', basicError)
            return {
                success: false,
                error: 'Cannot reach Medusa backend',
                details: basicError
            }
        }

        // Nu proberen met API key
        const response = await fetch(`${MEDUSA_URL}/store/products?limit=1`, {
            method: 'GET',
            headers: getHeaders(),
        })

        console.log('📡 API response status:', response.status)

        if (response.ok) {
            const data = await response.json()
            console.log('✅ Connection successful!')
            console.log('📊 Sample data:', data)
            return { success: true }
        } else {
            const errorText = await response.text()
            console.error('❌ API Error:', response.status, errorText)
            return {
                success: false,
                error: `HTTP ${response.status}: ${errorText}`,
                details: { status: response.status, body: errorText }
            }
        }
    } catch (error) {
        console.error("❌ Connection test failed:", error)
        return {
            success: false,
            error: 'Network or parsing error',
            details: error
        }
    }
}

// Producten ophalen met uitgebreide logging
export async function getProducts(): Promise<Product[]> {
    try {
        console.log('🔄 Fetching products...')

        const response = await fetch(`${MEDUSA_URL}/store/products`, {
            method: 'GET',
            headers: getHeaders(),
        })

        console.log('📡 Products response status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ Products API Error:', response.status, errorText)
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const data = await response.json()
        console.log('✅ Products data received:', data)
        console.log('📊 Number of products:', data.products?.length || 0)

        return data.products || []
    } catch (error) {
        console.error("❌ Error fetching products:", error)
        return []
    }
}

// Enkel product ophalen met uitgebreide debugging
export async function getProduct(handle: string): Promise<Product | null> {
    try {
        console.log('🔄 Fetching product by handle:', handle)

        // Probeer eerst met ?fields= om meer data op te halen
        const response = await fetch(`${MEDUSA_URL}/store/products?handle=${handle}&fields=*variants.prices,*variants.prices.currency,*variants.prices.amount`, {
            method: 'GET',
            headers: getHeaders(),
        })

        console.log('📡 Product response status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ Product API Error:', response.status, errorText)
            return null
        }

        const data = await response.json()
        console.log('✅ Raw Product data received:', JSON.stringify(data, null, 2))

        const product = data.products?.[0]
        if (product) {
            console.log('🔍 Product Analysis:')
            console.log('- Product ID:', product.id)
            console.log('- Product Title:', product.title)
            console.log('- Variants Count:', product.variants?.length || 0)

            if (product.variants && product.variants.length > 0) {
                product.variants.forEach((variant: any, index: number) => {
                    console.log(`- Variant ${index + 1}:`, {
                        id: variant.id,
                        title: variant.title,
                        prices: variant.prices,
                        pricesCount: variant.prices?.length || 0
                    })

                    if (variant.prices && variant.prices.length > 0) {
                        variant.prices.forEach((price: any, priceIndex: number) => {
                            console.log(`  - Price ${priceIndex + 1}:`, {
                                amount: price.amount,
                                currency_code: price.currency_code,
                                type: typeof price.amount,
                                raw: price
                            })
                        })
                    }
                })
            }
        }

        return product || null
    } catch (error) {
        console.error("❌ Error fetching product:", error)
        return null
    }
}

// Collecties ophalen
export async function getCollections(): Promise<Collection[]> {
    try {
        console.log('🔄 Fetching collections...')

        const response = await fetch(`${MEDUSA_URL}/store/collections`, {
            method: 'GET',
            headers: getHeaders(),
        })

        console.log('📡 Collections response status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error('❌ Collections API Error:', response.status, errorText)
            return []
        }

        const data = await response.json()
        console.log('✅ Collections data received:', data)

        return data.collections || []
    } catch (error) {
        console.error("❌ Error fetching collections:", error)
        return []
    }
}

// Environment debug functie
export function getEnvironmentInfo() {
    return {
        medusaUrl: MEDUSA_URL,
        hasApiKey: !!API_KEY,
        apiKeyLength: API_KEY.length,
        apiKeyValid: API_KEY.startsWith('pk_'),
        nodeEnv: process.env.NODE_ENV,
        allEnvVars: {
            NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
            NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ? 'SET' : 'NOT SET'
        }
    }
}