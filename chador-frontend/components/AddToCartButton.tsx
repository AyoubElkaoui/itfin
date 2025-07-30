// components/AddToCartButton.tsx - Professional Add to Cart Button
'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'

interface AddToCartButtonProps {
    variantId: string
    quantity?: number
    disabled?: boolean
    className?: string
    children?: React.ReactNode
}

export default function AddToCartButton({
                                            variantId,
                                            quantity = 1,
                                            disabled = false,
                                            className = "",
                                            children = "Toevoegen aan winkelwagen"
                                        }: AddToCartButtonProps) {
    const { addToCart, state } = useCart()
    const [isSuccess, setIsSuccess] = useState(false)

    const handleAddToCart = async () => {
        try {
            setIsSuccess(false)
            await addToCart(variantId, quantity)

            // Show success state briefly
            setIsSuccess(true)
            setTimeout(() => setIsSuccess(false), 2000)
        } catch (error) {
            console.error('Failed to add to cart:', error)
        }
    }

    const isLoading = state.isLoading
    const isDisabled = disabled || isLoading || !variantId

    const baseClasses = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"

    const variantClasses = isSuccess
        ? "bg-green-600 text-white hover:bg-green-700"
        : isDisabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-amber-600 text-white hover:bg-amber-700 transform hover:-translate-y-0.5 hover:shadow-lg"

    return (
        <button
            onClick={handleAddToCart}
            disabled={isDisabled}
            className={`${baseClasses} ${variantClasses} ${className}`}
        >
            <div className="flex items-center space-x-2">
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Toevoegen...</span>
                    </>
                ) : isSuccess ? (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Toegevoegd!</span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                        </svg>
                        <span>{children}</span>
                    </>
                )}
            </div>
        </button>
    )
}