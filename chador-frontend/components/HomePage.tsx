// components/HomePage.tsx - Client-side component met Medusa v2
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { medusaClient, formatPrice, getVariantPrice, ProductWithVariants } from '@/lib/medusa'
import AddToCartButton from '@/components/AddToCartButton'

export default function HomePage() {
    const [products, setProducts] = useState<ProductWithVariants[]>([])
    const [backendConnected, setBackendConnected] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            try {
                console.log('🔍 Checking Medusa v2 backend...')
                const healthCheck = await medusaClient.healthCheck()
                console.log('🏥 Health check result:', healthCheck)

                if (healthCheck) {
                    console.log('✅ Backend is healthy, loading products...')
                    const productsData = await medusaClient.getProducts()
                    console.log(`📦 Loaded ${productsData.length} products`)

                    // Debug log voor elk product
                    productsData.forEach(product => {
                        console.log('Product details:', {
                            title: product.title,
                            variants: product.variants?.length,
                            firstVariant: product.variants?.[0],
                            thumbnail: product.thumbnail
                        })
                    })

                    setProducts(productsData)
                    setBackendConnected(true)
                } else {
                    console.log('❌ Backend health check failed')
                    setBackendConnected(false)
                }
            } catch (error) {
                console.error('❌ Error loading data:', error)
                setBackendConnected(false)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    const handleRetry = () => {
        setLoading(true)
        window.location.reload()
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading Medusa v2...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">Elegante Kleding</h1>
                    <p className="hero-subtitle">
                        Premium kleding voor elke gelegenheid. Ontdek onze exclusieve collectie.
                    </p>
                    <div className="hero-actions">
                        {backendConnected ? (
                            <Link href="#products" className="btn btn-primary">
                                Bekijk Collectie
                            </Link>
                        ) : (
                            <button onClick={handleRetry} className="btn btn-primary">
                                Probeer Opnieuw
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Backend Status */}
            <section className="section">
                <div className="container">
                    {!backendConnected ? (
                        <div className="text-center mb-8">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
                                <h3 className="text-lg font-semibold text-red-800 mb-2">
                                    ❌ Medusa v2 Backend Niet Verbonden
                                </h3>
                                <p className="text-red-700 mb-4">
                                    Kan niet verbinden met http://localhost:9000
                                </p>
                                <div className="space-y-2 text-sm text-red-600 mb-4">
                                    <p><strong>Check backend status:</strong></p>
                                    <p>1. Backend moet draaien op poort 9000</p>
                                    <p>2. Check: <code className="bg-red-100 px-1 rounded">curl http://localhost:9000/health</code></p>
                                    <p>3. Zou "OK" moeten retourneren</p>
                                </div>
                                <div className="flex gap-2 justify-center">
                                    <a
                                        href="http://localhost:9000/health"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-secondary"
                                    >
                                        Test Health Endpoint
                                    </a>
                                    <button
                                        onClick={handleRetry}
                                        className="btn btn-primary"
                                    >
                                        Probeer Opnieuw
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mb-8">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-lg mx-auto">
                                <h3 className="text-lg font-semibold text-green-800 mb-1">
                                    ✅ Medusa v2 Backend Verbonden
                                </h3>
                                <p className="text-green-700">
                                    Backend actief - {products.length} producten geladen
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Products Section */}
            {backendConnected && (
                <section id="products" className="section">
                    <div className="container">
                        <h2 className="section-title">Onze Producten</h2>

                        {products.length === 0 ? (
                            <div className="text-center">
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-lg mx-auto">
                                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                                        📦 Geen Producten Gevonden
                                    </h3>
                                    <p className="text-yellow-700 mb-4">
                                        Er zijn geen producten geladen uit de database.
                                    </p>
                                    <div className="space-y-2 text-sm text-yellow-600 mb-4">
                                        <p><strong>Mogelijke oorzaken:</strong></p>
                                        <p>1. Geen producten in database</p>
                                        <p>2. Products niet published</p>
                                        <p>3. API key issues</p>
                                    </div>
                                    <a
                                        href="http://localhost:7001"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        Check Admin Dashboard
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-4">
                                {products.map((product) => {
                                    const variant = product.variants?.[0]
                                    const price = variant ? getVariantPrice(variant) : 0

                                    return (
                                        <div key={product.id} className="product-card">
                                            <Link href={`/products/${product.handle}`}>
                                                <div className="relative">
                                                    {product.thumbnail ? (
                                                        <Image
                                                            src={product.thumbnail}
                                                            alt={product.title}
                                                            width={300}
                                                            height={300}
                                                            className="product-image"
                                                        />
                                                    ) : (
                                                        <div className="product-image flex items-center justify-center bg-gray-100">
                                                            <span className="text-gray-400 text-sm">Geen afbeelding</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>

                                            <div className="product-info">
                                                <h3 className="product-title">{product.title}</h3>

                                                {product.description && (
                                                    <p className="product-description">
                                                        {product.description.length > 100
                                                            ? product.description.substring(0, 100) + '...'
                                                            : product.description
                                                        }
                                                    </p>
                                                )}

                                                <div className="product-price">
                                                    {price > 0 ? formatPrice(price) : 'Prijs niet beschikbaar'}
                                                </div>

                                                <div className="product-actions">
                                                    <Link
                                                        href={`/products/${product.handle}`}
                                                        className="btn btn-secondary flex-1 text-center"
                                                    >
                                                        Bekijken
                                                    </Link>
                                                    {variant && price > 0 && (
                                                        <AddToCartButton
                                                            variantId={variant.id}
                                                            className="btn btn-primary flex-1"
                                                        >
                                                            Winkelwagen
                                                        </AddToCartButton>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* About Section */}
            <section className="section" style={{ backgroundColor: '#f9fafb' }}>
                <div className="container">
                    <div className="grid grid-3">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Premium Kwaliteit</h3>
                            <p className="text-gray-600">
                                Zorgvuldig geselecteerde materialen en vakmanschap van de hoogste kwaliteit.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">Gratis Verzending</h3>
                            <p className="text-gray-600">
                                Gratis verzending bij bestellingen vanaf €50 binnen Nederland.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4">30 Dagen Retour</h3>
                            <p className="text-gray-600">
                                Niet tevreden? Retourneer binnen 30 dagen voor volledige terugbetaling.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}