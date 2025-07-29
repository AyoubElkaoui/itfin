// components/CartHeaderButton.tsx - Professional cart header button
'use client'

import { useCart, formatPrice } from '@/contexts/CartContext'
import { useEffect, useState } from 'react'

export default function CartHeaderButton() {
    const { state, toggleCart } = useCart()
    const [isAnimating, setIsAnimating] = useState(false)

    // Animate when items are added
    useEffect(() => {
        if (state.lastAddedItem) {
            setIsAnimating(true)
            const timer = setTimeout(() => setIsAnimating(false), 600)
            return () => clearTimeout(timer)
        }
    }, [state.lastAddedItem])

    return (
        <button
            onClick={toggleCart}
            className={`relative group flex items-center space-x-3 bg-chador-gold hover:bg-chador-gold/90 text-chador-black px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 ${
                isAnimating ? 'scale-110' : ''
            }`}
            aria-label={`Winkelwagen openen. ${state.totalItems} items`}
        >
            {/* Cart Icon */}
            <div className="relative">
                <svg
                    className={`w-5 h-5 transition-transform ${isAnimating ? 'animate-bounce' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6"
                    />
                </svg>

                {/* Badge */}
                {state.totalItems > 0 && (
                    <span
                        className={`absolute -top-2 -right-2 bg-chador-black text-chador-warm-white text-xs font-bold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center transition-all duration-300 ${
                            isAnimating ? 'animate-pulse scale-110' : ''
                        }`}
                    >
            {state.totalItems > 99 ? '99+' : state.totalItems}
          </span>
                )}
            </div>

            {/* Text */}
            <div className="hidden sm:flex flex-col items-start">
        <span className="text-sm font-semibold leading-none">
          Winkelwagen
        </span>
                {state.totalItems > 0 && (
                    <span className="text-xs opacity-90 leading-none mt-0.5">
            {formatPrice(state.totalPrice)}
          </span>
                )}
            </div>

            {/* Mobile text */}
            <span className="sm:hidden text-sm font-semibold">
        {state.totalItems}
      </span>

            {/* Hover effect */}
            <div className="absolute inset-0 bg-chador-black opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300" />
        </button>
    )
}