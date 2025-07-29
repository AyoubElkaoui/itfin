// components/CartSidebar.tsx - Winkelwagen zijbalk
'use client'

import { useCart, formatPrice } from '@/contexts/CartContext'
import { Fragment } from 'react'
import Link from 'next/link'

export default function CartSidebar() {
    const { state, closeCart, removeItem, updateQuantity } = useCart()

    if (!state.isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="text-lg font-semibold">
                            Winkelwagen ({state.totalItems})
                        </h2>
                        <button
                            onClick={closeCart}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto">
                        {state.items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                <div className="text-6xl mb-4">🛒</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Je winkelwagen is leeg
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Voeg wat mooie items toe om te beginnen met winkelen
                                </p>
                                <button
                                    onClick={closeCart}
                                    className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                                >
                                    Verder winkelen
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 space-y-4">
                                {state.items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                            {item.thumbnail ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.productTitle}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <span className="text-2xl">📷</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                {item.productTitle}
                                            </h4>
                                            {item.variantTitle && item.variantTitle !== 'Default Variant' && (
                                                <p className="text-xs text-gray-500">{item.variantTitle}</p>
                                            )}
                                            <p className="text-sm font-semibold text-amber-600">
                                                {formatPrice(item.price, item.currency)}
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                disabled={item.quantity >= (item.maxQuantity || 10)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                                            title="Verwijder item"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {state.items.length > 0 && (
                        <div className="border-t p-4 space-y-4">
                            {/* Totaal */}
                            <div className="flex items-center justify-between text-lg font-semibold">
                                <span>Totaal:</span>
                                <span className="text-amber-600">
                  {formatPrice(state.totalPrice)}
                </span>
                            </div>

                            {/* Shipping Notice */}
                            <div className="text-sm text-gray-600 text-center">
                                {state.totalPrice >= 5000 ? (
                                    <span className="text-green-600">✅ Gratis verzending!</span>
                                ) : (
                                    <span>
                    Nog {formatPrice(5000 - state.totalPrice)} voor gratis verzending
                  </span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2">
                                <Link
                                    href="/cart"
                                    onClick={closeCart}
                                    className="block w-full bg-gray-100 text-gray-900 text-center py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                >
                                    Bekijk Winkelwagen
                                </Link>
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="block w-full bg-amber-600 text-white text-center py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                                >
                                    Afrekenen
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex justify-center space-x-4 text-xs text-gray-500 pt-2">
                                <div className="flex items-center space-x-1">
                                    <span>🔒</span>
                                    <span>Veilig</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span>📦</span>
                                    <span>Snelle levering</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span>↩️</span>
                                    <span>30d retour</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}