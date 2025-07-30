// app/products/[handle]/page.tsx - Clean Product Detail Page
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
        <div>
            <Navbar />

            <div className="container" style={{ padding: '40px 20px' }}>
                {/* Breadcrumb */}
                <nav style={{ marginBottom: '30px' }}>
                    <Link href="/">Home</Link>
                    <span style={{ margin: '0 10px', color: '#666' }}>›</span>
                    <Link href="/products">Producten</Link>
                    <span style={{ margin: '0 10px', color: '#666' }}>›</span>
                    <span>{product.title}</span>
                </nav>

                {/* Product Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '60px',
                    marginBottom: '60px'
                }}>
                    {/* Product Images */}
                    <div>
                        {product.thumbnail ? (
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={600}
                                height={600}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e5e5'
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '500px',
                                backgroundColor: '#f8f9fa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #e5e5e5',
                                borderRadius: '8px'
                            }}>
                                <span style={{ color: '#666' }}>Geen afbeelding beschikbaar</span>
                            </div>
                        )}

                        {/* Additional Images */}
                        {product.images && product.images.length > 0 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                                gap: '10px',
                                marginTop: '20px'
                            }}>
                                {product.images.slice(0, 4).map((image, index) => (
                                    <Image
                                        key={image.id}
                                        src={image.url}
                                        alt={`${product.title} - ${index + 1}`}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100%',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                            border: '1px solid #e5e5e5'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl mb-6">{product.title}</h1>

                        {product.description && (
                            <div className="mb-6">
                                <h3 className="text-xl mb-4">Beschrijving</h3>
                                <p style={{ lineHeight: '1.6', color: '#333' }}>
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Price */}
                        <div className="mb-6">
                            <div className="product-price" style={{ fontSize: '28px' }}>
                                {price > 0 ? formatPrice(price) : 'Prijs op aanvraag'}
                            </div>
                            <p style={{ color: '#666', fontSize: '14px' }}>
                                Inclusief BTW, exclusief verzendkosten
                            </p>
                        </div>

                        {/* Variant Info */}
                        {variant && (
                            <div className="mb-6">
                                <h4 style={{ marginBottom: '10px' }}>Product Details:</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '5px' }}>
                                        <strong>Variant:</strong> {variant.title}
                                    </li>
                                    {variant.sku && (
                                        <li style={{ marginBottom: '5px' }}>
                                            <strong>SKU:</strong> {variant.sku}
                                        </li>
                                    )}
                                    <li style={{ marginBottom: '5px' }}>
                                        <strong>Voorraad:</strong> {
                                        (variant.inventory_quantity ?? 0) > 0
                                            ? `${variant.inventory_quantity} op voorraad`
                                            : 'Uitverkocht'
                                    }
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <div className="mb-8">
                            {variant && price > 0 && (variant.inventory_quantity ?? 0) > 0 ? (
                                <AddToCartButton
                                    variantId={variant.id}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '16px 24px',
                                        fontSize: '18px',
                                        marginBottom: '20px'
                                    }}
                                >
                                    Toevoegen aan Winkelwagen - {formatPrice(price)}
                                </AddToCartButton>
                            ) : (
                                <button
                                    disabled
                                    className="btn"
                                    style={{
                                        width: '100%',
                                        padding: '16px 24px',
                                        fontSize: '18px',
                                        backgroundColor: '#e5e5e5',
                                        color: '#999',
                                        cursor: 'not-allowed'
                                    }}
                                >
                                    {(variant?.inventory_quantity ?? 0) <= 0 ? 'Uitverkocht' : 'Niet beschikbaar'}
                                </button>
                            )}

                            <Link
                                href="/products"
                                className="btn btn-secondary"
                                style={{ width: '100%', textAlign: 'center' }}
                            >
                                ← Terug naar Producten
                            </Link>
                        </div>

                        {/* Product Features */}
                        <div className="card">
                            <h4 className="mb-4">Waarom Kiezen Voor Dit Product?</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '10px' }}>✓</span>
                                    Premium kwaliteit materialen
                                </li>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '10px' }}>✓</span>
                                    Gratis verzending vanaf €50
                                </li>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '10px' }}>✓</span>
                                    30 dagen gratis retour
                                </li>
                                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '10px' }}>✓</span>
                                    Vakmanschap van hoge kwaliteit
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="text-2xl mb-6">Gerelateerde Producten</h2>
                    <div className="text-center" style={{ padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                        <p>Andere producten uit onze collectie worden hier binnenkort getoond.</p>
                        <Link href="/products" className="btn btn-primary mt-4">
                            Bekijk Alle Producten
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}