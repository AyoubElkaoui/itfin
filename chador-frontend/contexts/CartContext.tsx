// contexts/CartContext.tsx - Gefixte Cart Context
'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { medusaClient, Cart, formatPrice } from '@/lib/medusa'

interface CartState {
    cart: Cart | null
    isLoading: boolean
    isOpen: boolean
    error: string | null
    totalItems: number
    totalPrice: number
    lastAddedItem: string | null
}

type CartAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_CART'; payload: Cart | null }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'TOGGLE_CART' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'SET_LAST_ADDED_ITEM'; payload: string | null }

const initialState: CartState = {
    cart: null,
    isLoading: false,
    isOpen: false,
    error: null,
    totalItems: 0,
    totalPrice: 0,
    lastAddedItem: null,
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload }

        case 'SET_CART':
            const cart = action.payload
            return {
                ...state,
                cart,
                error: null,
                totalItems: cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0,
                totalPrice: cart?.total ?? 0,
            }

        case 'SET_ERROR':
            return { ...state, error: action.payload, isLoading: false }

        case 'TOGGLE_CART':
            return { ...state, isOpen: !state.isOpen }

        case 'OPEN_CART':
            return { ...state, isOpen: true }

        case 'CLOSE_CART':
            return { ...state, isOpen: false }

        case 'SET_LAST_ADDED_ITEM':
            return { ...state, lastAddedItem: action.payload }

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

    // Initialize cart met betere error handling
    useEffect(() => {
        initializeCart()
    }, [])

    const initializeCart = useCallback(async () => {
        console.log('🛒 Initializing cart...')
        dispatch({ type: 'SET_LOADING', payload: true })

        try {
            // Check backend health first
            const isHealthy = await medusaClient.healthCheck()
            if (!isHealthy) {
                console.warn('⚠️ Backend not healthy, skipping cart initialization')
                dispatch({ type: 'SET_ERROR', payload: 'Backend niet bereikbaar' })
                dispatch({ type: 'SET_LOADING', payload: false })
                return
            }

            // Check for existing cart in localStorage
            const existingCartId = localStorage.getItem('medusa_cart_id')
            let cart: Cart | null = null

            if (existingCartId) {
                try {
                    console.log('🔍 Trying to retrieve existing cart:', existingCartId)
                    cart = await medusaClient.getCart(existingCartId)
                    console.log('✅ Retrieved existing cart')
                } catch (error) {
                    console.warn('❌ Failed to retrieve existing cart, creating new one:', error)
                    localStorage.removeItem('medusa_cart_id')
                }
            }

            if (!cart) {
                console.log('🆕 Creating new cart...')
                cart = await medusaClient.createCart()
                if (cart) {
                    localStorage.setItem('medusa_cart_id', cart.id)
                    console.log('✅ Created new cart:', cart.id)
                }
            }

            dispatch({ type: 'SET_CART', payload: cart })
        } catch (error) {
            console.error('❌ Cart initialization failed:', error)
            dispatch({ type: 'SET_ERROR', payload: 'Winkelwagen laden mislukt' })
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [])

    const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
        console.log('🛒 Adding to cart:', { variantId, quantity })

        if (!state.cart) {
            console.log('🆕 No cart exists, creating one...')
            await initializeCart()
            if (!state.cart) {
                dispatch({ type: 'SET_ERROR', payload: 'Kan winkelwagen niet maken' })
                return
            }
        }

        dispatch({ type: 'SET_LOADING', payload: true })

        try {
            const updatedCart = await medusaClient.addToCart(state.cart.id, variantId, quantity)

            if (updatedCart) {
                console.log('✅ Added to cart successfully')
                dispatch({ type: 'SET_CART', payload: updatedCart })
                dispatch({ type: 'SET_LAST_ADDED_ITEM', payload: variantId })
                dispatch({ type: 'OPEN_CART' })

                // Clear last added item after 3 seconds
                setTimeout(() => {
                    dispatch({ type: 'SET_LAST_ADDED_ITEM', payload: null })
                }, 3000)
            }
        } catch (error) {
            console.error('❌ Add to cart failed:', error)
            dispatch({ type: 'SET_ERROR', payload: 'Kon item niet toevoegen aan winkelwagen' })
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [state.cart, initializeCart])

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
            console.error('❌ Update cart item failed:', error)
            dispatch({ type: 'SET_ERROR', payload: 'Kon item niet updaten' })
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
            console.error('❌ Remove from cart failed:', error)
            dispatch({ type: 'SET_ERROR', payload: 'Kon item niet verwijderen' })
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
        return state.totalItems
    }, [state.totalItems])

    const getTotalPrice = useCallback(() => {
        if (!state.cart) return formatPrice(0)
        return formatPrice(state.cart.total, state.cart.region?.currency_code || 'EUR')
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

// Export formatPrice for convenience
export { formatPrice }