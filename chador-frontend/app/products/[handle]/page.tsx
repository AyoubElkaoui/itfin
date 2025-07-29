// app/products/[handle]/page.tsx - Product detail pagina
import { getProduct } from '@/lib/medusa'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import ProductImageGallery from '@/components/ProductImageGallery'

interface ProductPageProps {
    params: Promise<{
        handle: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { handle } = await params
    const product = await getProduct(handle)

    if (!product) {
        notFound()
    }

    // Selecteer de eerste variant (voor eenvoud)
    const variant = product.variants?.[0]
    const price = variant?.prices?.[0]

    return (
        <div className="min-h-screen bg-white">
            {/* Header/Navigation */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold text-amber-700">
                            Chador Collection
                        </Link>
                        <nav className="flex items-center space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-amber-600">
                                ← Terug naar overzicht
                            </Link>
                            <Link href="/cart" className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                                Winkelwagen
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Product Details */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <ProductImageGallery
                            images={product.images || []}
                            thumbnail={product.thumbnail}
                            title={product.title}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Breadcrumb */}
                        <nav className="text-sm text-gray-500">
                            <Link href="/" className="hover:text-amber-600">Home</Link>
                            <span className="mx-2">›</span>
                            <Link href="/products" className="hover:text-amber-600">Producten</Link>
                            <span className="mx-2">›</span>
                            <span className="text-gray-900">{product.title}</span>
                        </nav>

                        {/* Product Title */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {product.title}
                            </h1>

                            {/* Price */}
                            {price && (
                                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-amber-600">
                    €{(price.amount / 100).toFixed(2)}
                  </span>
                                    <span className="text-sm text-gray-500 bg-green-100 px-2 py-1 rounded">
                    Inclusief BTW
                  </span>
                                </div>
                            )}
                        </div>

                        {/* Product Description */}
                        {product.description && (
                            <div className="prose prose-gray max-w-none">
                                <h3 className="text-lg font-semibold mb-3">Beschrijving</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Variant Selection (als er meerdere zijn) */}
                        {product.variants && product.variants.length > 1 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Varianten</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            className="border border-gray-300 rounded-lg p-3 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        >
                                            <span className="text-sm font-medium">{variant.title}</span>
                                            {variant.prices?.[0] && (
                                                <span className="block text-xs text-gray-500">
                          €{(variant.prices[0].amount / 100).toFixed(2)}
                        </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <div className="border-t pt-6">
                            <AddToCartButton
                                productId={product.id}
                                productTitle={product.title}
                                variantId={variant?.id}
                                variantTitle={variant?.title}
                                price={price?.amount}
                                currency={price?.currency_code}
                                thumbnail={product.thumbnail}
                                disabled={!variant}
                            />
                        </div>

                        {/* Product Features */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">Productvoordelen</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <span className="text-sm">Premium kwaliteit</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <span className="text-sm">Gratis verzending</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <span className="text-sm">30 dagen retour</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600">✓</span>
                                    </div>
                                    <span className="text-sm">Duurzaam materiaal</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-amber-50 rounded-lg p-4">
                            <h4 className="font-semibold text-amber-800 mb-2">📦 Verzending</h4>
                            <p className="text-sm text-amber-700">
                                Gratis verzending vanaf €50. Besteld voor 16:00, morgen in huis.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-16 border-t pt-16">
                    <h2 className="text-2xl font-bold text-center mb-8">Gerelateerde Producten</h2>
                    {/* We vullen dit later in met andere producten */}
                    <div className="text-center text-gray-500">
                        <p>Andere producten worden hier binnenkort getoond</p>
                    </div>
                </div>
            </div>
        </div>
    )
}