// app/page.tsx - Homepage met Client Component voor afbeeldingen
import { getProducts, getCollections, testConnection, getEnvironmentInfo } from '@/lib/medusa'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'
import CartHeaderButton from '@/components/CartHeaderButton'

export default async function HomePage() {
    // Haal environment info op
    const envInfo = getEnvironmentInfo()
    console.log('🔧 Environment Info:', envInfo)

    // Test de connectie en krijg gedetailleerde info
    const connectionResult = await testConnection()
    console.log('🔌 Connection Result:', connectionResult)

    // Probeer products op te halen (ook als connectie faalt)
    const products = await getProducts()
    const collections = await getCollections()

    return (
        <div className="min-h-screen bg-white">
            {/* Debug Info Panel */}
            <div className="bg-gray-900 text-white p-4 text-xs font-mono">
                <div className="max-w-7xl mx-auto">
                    <h3 className="font-bold mb-2">🔧 DEBUG INFO:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p><span className="text-yellow-300">Medusa URL:</span> {envInfo.medusaUrl}</p>
                            <p><span className="text-yellow-300">API Key Present:</span> {envInfo.hasApiKey ? '✅' : '❌'}</p>
                            <p><span className="text-yellow-300">API Key Length:</span> {envInfo.apiKeyLength}</p>
                            <p><span className="text-yellow-300">API Key Valid:</span> {envInfo.apiKeyValid ? '✅' : '❌'}</p>
                        </div>
                        <div>
                            <p><span className="text-green-300">Connection:</span> {connectionResult.success ? '✅ SUCCESS' : '❌ FAILED'}</p>
                            {connectionResult.error && (
                                <p><span className="text-red-300">Error:</span> {connectionResult.error}</p>
                            )}
                            <p><span className="text-blue-300">Products Found:</span> {products.length}</p>
                            <p><span className="text-blue-300">Collections Found:</span> {collections.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {!connectionResult.success && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="text-2xl">🚨</div>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-red-800">API Connectie Probleem</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p className="mb-2"><strong>Error:</strong> {connectionResult.error}</p>

                                    <div className="bg-white rounded p-3 border">
                                        <p className="font-medium mb-2">Controleer deze dingen:</p>
                                        <ol className="list-decimal list-inside space-y-1">
                                            <li>Is je .env.local bestand in de juiste map? (niet .env.local.local!)</li>
                                            <li>Draait Medusa backend op <a href="http://localhost:9000" target="_blank" className="underline text-blue-600">http://localhost:9000</a>?</li>
                                            <li>Is je API key correct? (moet beginnen met pk_)</li>
                                            <li>Heb je Next.js herstart na het maken van .env.local?</li>
                                        </ol>
                                    </div>

                                    <div className="mt-3 space-x-2">
                                        <a
                                            href="http://localhost:9000/store/products"
                                            target="_blank"
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                        >
                                            Test Medusa Direct
                                        </a>
                                        <a
                                            href="http://localhost:7001"
                                            target="_blank"
                                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                        >
                                            Open Admin
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success State */}
            {connectionResult.success && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex">
                            <div className="text-2xl mr-3">✅</div>
                            <div>
                                <h3 className="text-lg font-medium text-green-800">Medusa Connectie Succesvol!</h3>
                                <p className="text-sm text-green-700">
                                    Gevonden: {products.length} producten, {collections.length} collecties
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-amber-700">Chador Collection</h1>
                    <nav className="flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-amber-600">Home</Link>
                        <Link href="/products" className="text-gray-700 hover:text-amber-600">Producten</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-amber-600">Contact</Link>
                        <CartHeaderButton />
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Chador Collection
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Premium islamitische kleding waar traditie en moderne elegantie samenkomen
                    </p>
                    <Link
                        href="#products"
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                        Bekijk Collectie
                    </Link>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Onze Producten</h2>

                    {connectionResult.success && products.length === 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold text-yellow-800 mb-2">Nog geen producten</h3>
                            <p className="text-yellow-700 mb-4">Je Medusa backend werkt, maar er zijn nog geen producten toegevoegd.</p>
                            <a
                                href="http://localhost:7001"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors inline-block"
                            >
                                Voeg Producten Toe in Admin
                            </a>
                        </div>
                    )}

                    {products.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border">
                                    <div className="aspect-square bg-gray-100 relative">
                                        <ProductImage
                                            src={product.thumbnail}
                                            alt={product.title}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                                        {product.description && (
                                            <p className="text-gray-600 text-sm mb-3">
                                                {product.description.substring(0, 100)}...
                                            </p>
                                        )}
                                        {product.variants?.[0]?.prices?.[0] && (
                                            <p className="text-amber-600 font-bold text-lg mb-3">
                                                €{(product.variants[0].prices[0].amount / 100).toFixed(2)}
                                            </p>
                                        )}
                                        <Link
                                            href={`/products/${product.handle}`}
                                            className="block w-full bg-gray-900 text-white text-center py-2 rounded hover:bg-gray-800 transition-colors"
                                        >
                                            Bekijk Product
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}