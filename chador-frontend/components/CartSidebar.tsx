// components/CartSidebar.tsx - Professional Cart Sidebar
'use client'

import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/medusa'
import Image from 'next/image'
import Link from 'next/link'

export default function CartSidebar() {
    const { state, closeCart, updateCartItem, removeFromCart, getTotalPrice } = useCart()

    if (!state.isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Winkelwagen ({state.cart?.items?.length || 0})
                        </h2>
                        <button
                            onClick={closeCart}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Loading State */}
                    {state.isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {state.error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-400">
                            <p className="text-red-700 text-sm">{state.error}</p>
                        </div>
                    )}

                    {/* Empty Cart */}
                    {!state.isLoading && state.cart?.items?.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Je winkelwagen is leeg
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Voeg wat mooie items toe om te beginnen met winkelen
                            </p>
                            <button
                                onClick={closeCart}
                                className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                            >
                                Verder Winkelen
                            </button>
                        </div>
                    )}

                    {/* Cart Items */}
                    {!state.isLoading && state.cart?.items && state.cart.items.length > 0 && (
                        <>
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {state.cart.items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                            {item.thumbnail ? (
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                {item.title}
                                            </h4>
                                            {item.variant.title && item.variant.title !== 'Default Title' && (
                                                <p className="text-xs text-gray-500">{item.variant.title}</p>
                                            )}
                                            <p className="text-sm font-semibold text-amber-600">
                                                {formatPrice(item.unit_price, state.cart.region.currency_code)}
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateCartItem(item.id, item.quantity - 1)}
                                                disabled={state.isLoading}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </button>

                                            <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                                            <button
                                                onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                                disabled={state.isLoading}
                                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            disabled={state.isLoading}
                                            className="p-1 text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                                            title="Verwijder item"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="border-t p-6 space-y-4">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Subtotaal</span>
                                    <span className="text-sm font-medium">
                    {formatPrice(state.cart.subtotal, state.cart.region.currency_code)}
                  </span>
                                </div>

                                {/* Shipping */}
                                {state.cart.shipping_total > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Verzending</span>
                                        <span className="text-sm font-medium">
                      {formatPrice(state.cart.shipping_total, state.cart.region.currency_code)}
                    </span>
                                    </div>
                                )}

                                {/* Tax */}
                                {state.cart.tax_total > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">BTW</span>
                                        <span className="text-sm font-medium">
                      {formatPrice(state.cart.tax_total, state.cart.region.currency_code)}
                    </span>
                                    </div>
                                )}

                                {/* Total */}
                                <div className="flex items-center justify-between text-lg font-semibold border-t pt-4">
                                    <span>Totaal</span>
                                    <span className="text-amber-600">
                    {getTotalPrice()}
                  </span>
                                </div>

                                {/* Free Shipping Notice */}
                                {state.cart.subtotal < 5000 && (
                                    <div className="text-sm text-center text-gray-600 bg-amber-50 p-3 rounded-lg">
                                        Nog {formatPrice(5000 - state.cart.subtotal, state.cart.region.currency_code)} voor gratis verzending
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="space-y-3">
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
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}