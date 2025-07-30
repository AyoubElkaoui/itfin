// contexts/CartContext.tsx - Professional Cart Context
'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { medusaClient, Cart, formatPrice } from '@/lib/medusa'

interface CartState {
    cart: Cart | null
    isLoading: boolean
    isOpen: boolean
    error: string | null
}

type CartAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_CART'; payload: Cart | null }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'TOGGLE_CART' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' }

const initialState: CartState = {
    cart: null,
    isLoading: false,
    isOpen: false,
    error: null,
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload }

        case 'SET_CART':
            return { ...state, cart: action.payload, error: null }

        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false }

        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen }

        case 'OPEN_CART':
            return { ...state, isOpen: true }

        case 'CLOSE_CART':
            return { ...state, isOpen: false }

        default:
            return state
    }
}

interface CartContextType {
    state: CartState
    addToCart: (variantId: string, quantity?: number) => Promise<void>
    updateCartItem: (lineItemId: string, quantity: number) => Promise<void>
    removeFromCart: (lineItemId: string) => Promise<void>
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void
    getTotalItems: () => number
    getTotalPrice: () => string
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    // Initialize cart
    useEffect(() => {
        initializeCart()
    }, [])

    const initializeCart = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true })

        try {
            // Check for existing cart in localStorage
            const existingCartId = localStorage.getItem('medusa_cart_id')
            let cart: Cart | null = null

            if (existingCartId) {
                // Try to retrieve existing cart
                try {
                    cart = await medusaClient.getCart(existingCartId)
                } catch (error) {
                    console.warn('Failed to retrieve existing cart, will create new one:', error)
                    localStorage.removeItem('medusa_cart_id')
                }
            }

            if (!cart) {
                // Create new cart if none exists
                try {
                    cart = await medusaClient.createCart()
                    if (cart) {
                        localStorage.setItem('medusa_cart_id', cart.id)
                    }
                } catch (error) {
                    console.warn('Failed to create cart - backend might not be running:', error)
                    // Don't throw error, just continue without cart for now
                }
            }

            dispatch({ type: 'SET_CART', payload: cart })
        } catch (error) {
            console.warn('Cart initialization failed - continuing without cart:', error)
            dispatch({ type: 'SET_ERROR', payload: 'Winkelwagen niet beschikbaar (backend niet bereikbaar)' })
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [])

    const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
        if (!state.cart) {
            // Try to create cart if it doesn't exist
            try {
                dispatch({ type: 'SET_LOADING', payload: true })
                const newCart = await medusaClient.createCart()
                if (newCart) {
                    dispatch({ type: 'SET_CART', payload: newCart })
                    localStorage.setItem('medusa_cart_id', newCart.id)
                } else {
                    throw new Error('Could not create cart')
                }
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: 'Kan geen winkelwagen maken - controleer backend connectie' })
                dispatch({ type: 'SET_LOADING', payload: false })
                return
            }
        }

        dispatch({ type: 'SET_LOADING', payload: true })

        try {
            const cartId = state.cart?.id
            if (!cartId) {
                throw new Error('No cart available')
            }

            const updatedCart = await medusaClient.addToCart(cartId, variantId, quantity)
            dispatch({ type: 'SET_CART', payload: updatedCart })
            dispatch({ type: 'OPEN_CART' })
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Kon item niet toevoegen aan winkelwagen' })
            console.error('Add to cart failed:', error)
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [state.cart])

    const updateCartItem = useCallback(async (lineItemId: string, quantity: number) => {
        if (!state.cart) return

        dispatch({ type: 'SET_LOADING', payload: true })

        try {
            if (quantity === 0) {
                await removeFromCart(lineItemId)
            } else {
                const updatedCart = await medusaClient.updateCartItem(state.cart.id, lineItemId, quantity)
                dispatch({ type: 'SET_CART', payload: updatedCart })
            }
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to update cart item' })
            console.error('Update cart item failed:', error)
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [state.cart])

    const removeFromCart = useCallback(async (lineItemId: string) => {
        if (!state.cart) return

        dispatch({ type: 'SET_LOADING', payload: true })

        try {
            const updatedCart = await medusaClient.removeFromCart(state.cart.id, lineItemId)
            dispatch({ type: 'SET_CART', payload: updatedCart })
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' })
            console.error('Remove from cart failed:', error)
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [state.cart])

    const toggleCart = useCallback(() => {
        dispatch({ type: 'TOGGLE_CART' })
    }, [])

    const openCart = useCallback(() => {
        dispatch({ type: 'OPEN_CART' })
    }, [])

    const closeCart = useCallback(() => {
        dispatch({ type: 'CLOSE_CART' })
    }, [])

    const getTotalItems = useCallback(() => {
        return state.cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0
    }, [state.cart])

    const getTotalPrice = useCallback(() => {
        if (!state.cart) return formatPrice(0)
        return formatPrice(state.cart.total, state.cart.region.currency_code)
    }, [state.cart])

    const value: CartContextType = {
        state,
        addToCart,
        updateCartItem,
        removeFromCart,
        toggleCart,
        openCart,
        closeCart,
        getTotalItems,
        getTotalPrice,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}