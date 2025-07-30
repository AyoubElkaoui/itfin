// components/CartSidebar.tsx - Minimale Professionele Winkelwagen
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
                className="fixed inset-0 bg-black bg-opacity-20 z-50 transition-opacity"
                onClick={closeCart}
            />

            {/* Sidebar */}
            <div className="cart-sidebar fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-lg border-b border-lighter-grey bg-white">
                    <h2 className="text-lg font-normal text-black">
                        Shopping Cart
                        {state.cart?.items?.length && state.cart.items.length > 0 && (
                            <span className="ml-xs text-sm text-medium-grey">
                                ({state.cart.items.length})
                            </span>
                        )}
                    </h2>
                    <button
                        onClick={closeCart}
                        className="text-black hover:text-medium-grey transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Loading State */}
                {state.isLoading && (
                    <div className="flex items-center justify-center py-xl">
                        <div className="loading w-6 h-6 border border-lighter-grey border-t-black rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Error State */}
                {state.error && (
                    <div className="p-lg bg-lightest-grey border-l-2 border-black m-lg">
                        <p className="text-sm text-black">{state.error}</p>
                    </div>
                )}

                {/* Empty Cart */}
                {!state.isLoading && (!state.cart?.items || state.cart.items.length === 0) && (
                    <div className="flex-1 flex flex-col items-center justify-center p-lg text-center">
                        <div className="mb-lg">
                            <svg className="w-12 h-12 text-light-grey mx-auto mb-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-normal text-black mb-sm">
                            Your cart is empty
                        </h3>
                        <p className="text-sm text-medium-grey mb-lg">
                            Continue shopping to add items to your cart
                        </p>
                        <button
                            onClick={closeCart}
                            className="btn btn-primary"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}

                {/* Cart Items */}
                {!state.isLoading && state.cart?.items && state.cart.items.length > 0 && (
                    <>
                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto">
                            {state.cart.items.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="flex gap-md">
                                        {/* Product Image */}
                                        <div className="w-16 h-20 bg-lightest-grey flex-shrink-0">
                                            {item.thumbnail ? (
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    width={64}
                                                    height={80}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-light-grey text-xs">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-normal text-black mb-xs">
                                                {item.title}
                                            </h4>
                                            {item.variant.title && item.variant.title !== 'Default Title' && (
                                                <p className="text-xs text-medium-grey mb-xs">{item.variant.title}</p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-black">
                                                    {formatPrice(item.unit_price, state.cart.region.currency_code)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-xs">
                                                    <button
                                                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                                                        disabled={state.isLoading || item.quantity <= 1}
                                                        className="w-6 h-6 border border-lighter-grey flex items-center justify-center hover:border-black transition-colors disabled:opacity-50 text-xs"
                                                    >
                                                        −
                                                    </button>

                                                    <span className="w-8 text-center text-xs">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                                        disabled={state.isLoading}
                                                        className="w-6 h-6 border border-lighter-grey flex items-center justify-center hover:border-black transition-colors disabled:opacity-50 text-xs"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            disabled={state.isLoading}
                                            className="text-light-grey hover:text-black transition-colors disabled:opacity-50"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-lighter-grey bg-white p-lg">
                            {/* Price Summary */}
                            <div className="space-y-xs mb-lg">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-medium-grey">Subtotal</span>
                                    <span className="text-black">
                                        {formatPrice(state.cart.subtotal, state.cart.region.currency_code)}
                                    </span>
                                </div>

                                {state.cart.shipping_total > 0 && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-medium-grey">Shipping</span>
                                        <span className="text-black">
                                            {formatPrice(state.cart.shipping_total, state.cart.region.currency_code)}
                                        </span>
                                    </div>
                                )}

                                <div className="border-t border-lighter-grey pt-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-medium text-black">Total</span>
                                        <span className="text-base font-medium text-black">
                                            {getTotalPrice()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-xs">
                                <Link
                                    href="/cart"
                                    onClick={closeCart}
                                    className="btn btn-secondary w-full text-center"
                                >
                                    View Cart
                                </Link>
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="btn btn-primary w-full text-center"
                                >
                                    Checkout
                                </Link>
                            </div>

                            {/* Free Shipping Notice */}
                            {state.cart.subtotal < 5000 && (
                                <div className="mt-md pt-md border-t border-lighter-grey">
                                    <p className="text-xs text-medium-grey text-center">
                                        Free shipping on orders over {formatPrice(5000, state.cart.region.currency_code)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}