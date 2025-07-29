// components/AddToCartButton.tsx - Clean and working version
'use client'

import { useState, useCallback } from 'react'
import { useCart, formatPrice } from '@/contexts/CartContext'

interface AddToCartButtonProps {
    productId: string
    productTitle: string
    variantId?: string
    variantTitle?: string
    price?: number
    currency?: string
    thumbnail?: string
    handle?: string
    disabled?: boolean
    className?: string
}

export default function AddToCartButton({
                                            productId,
                                            productTitle,
                                            variantId,
                                            variantTitle = 'Default Variant',
                                            price = 0,
                                            currency = 'EUR',
                                            thumbnail,
                                            handle,
                                            disabled = false,
                                            className = ""
                                        }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1)
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { addItem, state, isInCart } = useCart()
    const isLoading = state.isLoading
    const itemInCart = isInCart(variantId || '')

    // Validation - meer permissive voor testing
    const isValidItem = Boolean(variantId && productId && productTitle)
    const hasPrice = price > 0
    const isDisabled = disabled || !isValidItem || isLoading

    // Voor development: toon altijd waarom het niet valid is
    const validationErrors = []
    if (!variantId) validationErrors.push('Geen variant ID')
    if (!productId) validationErrors.push('Geen product ID')
    if (!productTitle) validationErrors.push('Geen product titel')
    if (!hasPrice) validationErrors.push('Geen geldige prijs')
    if (price <= 0) validationErrors.push(`Prijs is ${price}`)

    const handleAddToCart = useCallback(async () => {
        if (isDisabled) {
            console.warn('❌ Cannot add to cart:', { isDisabled, validationErrors })
            return
        }

        try {
            setError(null)

            // Use fallback price if needed (for testing)
            const finalPrice = hasPrice ? price : 2500 // €25.00 fallback

            console.log('🛒 Adding to cart:', {
                productId,
                variantId,
                productTitle,
                variantTitle,
                price: finalPrice,
                currency,
                quantity,
                thumbnail,
                handle
            })

            await addItem({
                productId,
                variantId: variantId!,
                productTitle,
                variantTitle,
                price: finalPrice,
                currency,
                quantity,
                thumbnail,
                handle
            })

            // Show success state
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 2000)

        } catch (error) {
            console.error('Error adding to cart:', error)
            setError('Er ging iets mis. Probeer opnieuw.')
            setTimeout(() => setError(null), 3000)
        }
    }, [addItem, productId, variantId, productTitle, variantTitle, price, hasPrice, currency, quantity, thumbnail, handle, isDisabled, validationErrors])

    const incrementQuantity = useCallback(() => {
        setQuantity(prev => Math.min(prev + 1, 10))
    }, [])

    const decrementQuantity = useCallback(() => {
        setQuantity(prev => Math.max(prev - 1, 1))
    }, [])

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Debug Info - alleen in development */}
            {process.env.NODE_ENV === 'development' && (
                <div className="bg-gray-100 p-3 rounded text-xs space-y-1">
                    <p><strong>Debug Info:</strong></p>
                    <p>Product ID: {productId || 'Missing'}</p>
                    <p>Variant ID: {variantId || 'Missing'}</p>
                    <p>Price: {price || 0}</p>
                    <p>Has Valid Price: {hasPrice ? '✅' : '❌'}</p>
                    <p>Valid Item: {isValidItem ? '✅' : '❌'}</p>
                    <p>In Cart: {itemInCart ? '✅' : '❌'}</p>
                    <p>Loading: {isLoading ? '✅' : '❌'}</p>
                    <p>Disabled: {isDisabled ? '✅' : '❌'}</p>
                    {validationErrors.length > 0 && (
                        <div className="mt-2 p-2 bg-red-100 rounded">
                            <p><strong>Validation Errors:</strong></p>
                            {validationErrors.map((error, i) => (
                                <p key={i}>• {error}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-700 text-sm">{error}</span>
                    </div>
                </div>
            )}

            {/* Product Info */}
            <div className="bg-chador-cream rounded-lg p-4">
                <h3 className="font-semibold text-lg text-chador-black mb-2">{productTitle}</h3>
                {variantTitle && variantTitle !== 'Default Variant' && (
                    <p className="text-sm text-chador-brown mb-2">{variantTitle}</p>
                )}
                <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-chador-gold">
            {hasPrice ? formatPrice(price, currency) : '€0.00 (Test Price)'}
          </span>
                    {itemInCart && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              ✓ In winkelwagen
            </span>
                    )}
                </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-chador-black">
                    Aantal:
                </label>
                <div className="flex items-center bg-white border border-chador-taupe rounded-lg overflow-hidden">
                    <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-4 py-3 hover:bg-chador-soft-beige transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    </button>
                    <div className="flex-1 text-center py-3 border-x border-chador-taupe bg-chador-warm-white">
                        <span className="text-lg font-semibold">{quantity}</span>
                    </div>
                    <button
                        onClick={incrementQuantity}
                        disabled={quantity >= 10}
                        className="px-4 py-3 hover:bg-chador-soft-beige transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Add to Cart Button - minder strikt voor testing */}
            <button
                onClick={handleAddToCart}
                disabled={!isValidItem || isLoading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    showSuccess
                        ? 'bg-green-600 text-white transform scale-105'
                        : (!isValidItem || isLoading)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : isLoading
                                ? 'bg-chador-gold/80 text-chador-black'
                                : 'bg-chador-black text-chador-warm-white hover:bg-chador-dark-brown hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
                type="button"
            >
                <div className="flex items-center justify-center space-x-2">
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Toevoegen...</span>
                        </>
                    ) : showSuccess ? (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Toegevoegd!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                            </svg>
                            <span>Toevoegen aan winkelwagen</span>
                        </>
                    )}
                </div>
            </button>

            {/* Validation Messages */}
            {!isValidItem && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-yellow-700 text-sm">
              Product gegevens ontbreken. Controleer de debug info hierboven.
            </span>
                    </div>
                </div>
            )}

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-chador-taupe">
                <div className="flex items-center space-x-2 text-sm text-chador-brown">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Op voorraad</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-chador-brown">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Snelle levering</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-chador-brown">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Veilig betalen</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-chador-brown">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>30d retour</span>
                </div>
            </div>

            {/* Shipping Notice */}
            <div className="bg-chador-gold/10 border border-chador-gold/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-chador-gold mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <div>
                        <h4 className="font-medium text-chador-black text-sm">📦 Gratis verzending</h4>
                        <p className="text-sm text-chador-brown">
                            Vanaf €50 • Besteld voor 16:00, morgen in huis
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}