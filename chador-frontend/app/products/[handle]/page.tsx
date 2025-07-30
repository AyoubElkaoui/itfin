// app/products/[handle]/page.tsx - Minimale Product Detail Pagina
import { medusaClient, formatPrice, getVariantPrice } from '@/lib/medusa'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AddToCartButton from '@/components/AddToCartButton'

interface ProductPageProps {
    params: Promise<{
        handle: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { handle } = await params

    let product = null
    try {
        product = await medusaClient.getProduct(handle)
    } catch (error) {
        console.error('Error loading product:', error)
    }

    if (!product) {
        notFound()
    }

    const variant = product.variants?.[0]
    const price = variant ? getVariantPrice(variant) : 0

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="container py-xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-xs text-sm text-medium-grey mb-xl">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-black transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-black">{product.title}</span>
                </nav>

                {/* Product Content */}
                <div className="grid lg:grid-cols-2 gap-2xl mb-2xl">
                    {/* Product Images */}
                    <div>
                        {/* Main Image */}
                        <div className="aspect-[3/4] bg-lightest-grey mb-md">
                            {product.thumbnail ? (
                                <Image
                                    src={product.thumbnail}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-light-grey">No Image Available</span>
                                </div>
                            )}
                        </div>

                        {/* Additional Images */}
                        {product.images && product.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-xs">
                                {product.images.slice(0, 4).map((image, index) => (
                                    <div key={image.id} className="aspect-square bg-lightest-grey">
                                        <Image
                                            src={image.url}
                                            alt={`${product.title} - ${index + 1}`}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="lg:pl-xl">
                        <div className="mb-xl">
                            <h1 className="text-3xl font-light mb-md leading-tight">
                                {product.title}
                            </h1>

                            {/* Price */}
                            <div className="mb-lg">
                                <span className="text-xl text-black">
                                    {price > 0 ? formatPrice(price) : 'Price on request'}
                                </span>
                                <p className="text-xs text-medium-grey mt-xs">
                                    Tax included
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="mb-lg">
                                <p className="text-sm text-medium-grey leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Product Details */}
                        {variant && (
                            <div className="mb-lg">
                                <div className="space-y-xs text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-medium-grey">SKU:</span>
                                        <span className="text-black">{variant.sku || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-medium-grey">Availability:</span>
                                        <span className="text-black">
                                            {(variant.inventory_quantity ?? 0) > 0
                                                ? `${variant.inventory_quantity} in stock`
                                                : 'Out of stock'
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <div className="mb-xl">
                            {variant && price > 0 && (variant.inventory_quantity ?? 0) > 0 ? (
                                <AddToCartButton
                                    variantId={variant.id}
                                    className="btn btn-primary w-full mb-sm"
                                >
                                    Add to Cart - {formatPrice(price)}
                                </AddToCartButton>
                            ) : (
                                <button
                                    disabled
                                    className="btn w-full mb-sm bg-lightest-grey text-medium-grey border-lighter-grey cursor-not-allowed"
                                >
                                    {(variant?.inventory_quantity ?? 0) <= 0 ? 'Out of Stock' : 'Unavailable'}
                                </button>
                            )}

                            <Link
                                href="/products"
                                className="btn btn-secondary w-full text-center"
                            >
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Product Features */}
                        <div className="space-y-xs text-sm">
                            <div className="flex items-center gap-xs">
                                <span className="w-1 h-1 bg-black"></span>
                                <span className="text-medium-grey">Free shipping over €50</span>
                            </div>
                            <div className="flex items-center gap-xs">
                                <span className="w-1 h-1 bg-black"></span>
                                <span className="text-medium-grey">30-day return policy</span>
                            </div>
                            <div className="flex items-center gap-xs">
                                <span className="w-1 h-1 bg-black"></span>
                                <span className="text-medium-grey">Premium quality materials</span>
                            </div>
                            <div className="flex items-center gap-xs">
                                <span className="w-1 h-1 bg-black"></span>
                                <span className="text-medium-grey">Secure payment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="border-t border-lighter-grey pt-xl mb-2xl">
                    <div className="max-w-4xl">
                        <h3 className="text-lg font-normal mb-md">Details</h3>
                        <div className="prose prose-sm text-medium-grey">
                            <p className="leading-relaxed">
                                {product.description || 'This product is carefully crafted with premium materials and attention to detail. Perfect for any occasion where you want to look elegant and sophisticated.'}
                            </p>
                            <p className="leading-relaxed mt-md">
                                Our commitment to quality means that each piece is made by experienced craftsmen
                                with the finest materials. We believe in timeless elegance that remains relevant season after season.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="section-title mb-lg">You may also like</h2>

                    <div className="bg-lightest-grey p-xl text-center">
                        <p className="text-medium-grey mb-md">Related products coming soon</p>
                        <Link href="/products" className="btn btn-secondary">
                            View All Products
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}