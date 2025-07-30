// app/page.tsx - Clean Professional Homepage
import { medusaClient, formatPrice, getVariantPrice } from '@/lib/medusa'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AddToCartButton from '@/components/AddToCartButton'

export default async function HomePage() {
    let products = []

    try {
        products = await medusaClient.getProducts()
    } catch (error) {
        console.error('Error loading products:', error)
    }

    return (
        <div>
            <Navbar />

            {/* Hero Header */}
            <section className="section" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <div className="container text-center">
                    <h1 className="text-3xl mb-6">Welkom bij EleganteKleding</h1>
                    <p className="text-large mb-8">Premium kleding voor elke gelegenheid. Ontdek onze exclusieve collectie.</p>
                    <Link href="#featured" className="btn btn-primary">
                        Bekijk Collectie
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section id="featured" className="section">
                <div className="container">
                    <h2 className="text-2xl text-center mb-8">Uitgelichte Producten</h2>

                    {products.length === 0 ? (
                        <div className="text-center">
                            <p className="text-large mb-6">Geen producten gevonden. Voeg producten toe via de admin.</p>
                            <a href="http://localhost:7001" target="_blank" className="btn btn-primary">
                                Open Admin Dashboard
                            </a>
                        </div>
                    ) : (
                        <div className="grid-4">
                            {products.slice(0, 8).map((product) => {
                                const variant = product.variants?.[0]
                                const price = variant ? getVariantPrice(variant) : 0

                                return (
                                    <div key={product.id} className="product-card">
                                        <Link href={`/products/${product.handle}`}>
                                            {product.thumbnail ? (
                                                <Image
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    width={300}
                                                    height={250}
                                                    className="product-image"
                                                />
                                            ) : (
                                                <div className="product-image" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: '#f8f9fa'
                                                }}>
                                                    <span>Geen afbeelding</span>
                                                </div>
                                            )}
                                        </Link>

                                        <div className="product-info">
                                            <h3 className="product-title">{product.title}</h3>
                                            {product.description && (
                                                <p className="mb-4" style={{ color: '#666666', fontSize: '14px' }}>
                                                    {product.description.substring(0, 100)}...
                                                </p>
                                            )}
                                            <div className="product-price">
                                                {price > 0 ? formatPrice(price) : 'Prijs op aanvraag'}
                                            </div>

                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Link href={`/products/${product.handle}`} className="btn btn-secondary" style={{ flex: 1 }}>
                                                    Bekijken
                                                </Link>
                                                {variant && price > 0 && (
                                                    <AddToCartButton
                                                        variantId={variant.id}
                                                        className="btn btn-primary"
                                                        style={{ flex: 1 }}
                                                    >
                                                        In Winkelwagen
                                                    </AddToCartButton>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {products.length > 8 && (
                        <div className="text-center mt-8">
                            <Link href="/products" className="btn btn-primary">
                                Bekijk Alle Producten
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Over Ons */}
            <section className="section section-gray">
                <div className="container">
                    <div className="grid-3">
                        <div className="text-center">
                            <h3 className="text-xl mb-4">Onze Missie</h3>
                            <p>Wij geloven dat iedereen recht heeft op mooie, kwaliteitsvolle kleding. Daarom bieden wij premium fashion tegen eerlijke prijzen.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl mb-4">Kwaliteit</h3>
                            <p>Alle onze producten worden zorgvuldig geselecteerd en getest. Alleen de beste materialen en vakmanschap komen in onze collectie.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl mb-4">Service</h3>
                            <p>Ons team staat altijd klaar om je te helpen. Van styling advies tot na-verkoop service, wij zorgen voor een perfecte ervaring.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categorieën */}
            <section className="section">
                <div className="container">
                    <h2 className="text-2xl text-center mb-8">Shop per Categorie</h2>
                    <div className="grid-3">
                        <div className="card text-center">
                            <h3 className="text-xl mb-4">👕 T-Shirts & Tops</h3>
                            <p className="mb-6">Comfortabele en stijlvolle bovenstukken voor elke dag.</p>
                            <Link href="/categories/shirts" className="btn btn-primary">
                                Bekijk T-Shirts
                            </Link>
                        </div>
                        <div className="card text-center">
                            <h3 className="text-xl mb-4">👖 Broeken & Jeans</h3>
                            <p className="mb-6">Van casual jeans tot elegante pantalons.</p>
                            <Link href="/categories/pants" className="btn btn-primary">
                                Bekijk Broeken
                            </Link>
                        </div>
                        <div className="card text-center">
                            <h3 className="text-xl mb-4">👗 Jurken & Rokken</h3>
                            <p className="mb-6">Elegante jurken voor speciale gelegenheden.</p>
                            <Link href="/categories/dresses" className="btn btn-primary">
                                Bekijk Jurken
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section section-gray">
                <div className="container">
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h2 className="text-2xl text-center mb-8">Neem Contact Op</h2>
                        <form className="card">
                            <div className="form-group">
                                <label className="form-label">Naam *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Je volledige naam"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">E-mail *</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="je@email.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Onderwerp</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Waar gaat je bericht over?"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bericht *</label>
                                <textarea
                                    className="form-input form-textarea"
                                    placeholder="Typ hier je bericht..."
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Bericht Versturen
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}