// contexts/CartContext.tsx - Professional cart context
'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

// Types
export interface CartItem {
    id: string
    productId: string
    variantId: string
    productTitle: string
    variantTitle: string
    price: number
    currency: string
    quantity: number
    thumbnail?: string
    maxQuantity?: number
    handle?: string
}

export interface CartState {
    items: CartItem[]
    isOpen: boolean
    isLoading: boolean
    totalItems: number
    totalPrice: number
    lastAddedItem?: CartItem
}

// Actions
type CartAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id'> }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] }
    | { type: 'SET_LAST_ADDED'; payload: CartItem }

// Initial state
const initialState: CartState = {
    items: [],
    isOpen: false,
    isLoading: false,
    totalItems: 0,
    totalPrice: 0,
}

// Reducer with better error handling
function cartReducer(state: CartState, action: CartAction): CartState {
    try {
        switch (action.type) {
            case 'SET_LOADING':
                return {
                    ...state,
                    isLoading: action.payload
                }

            case 'ADD_ITEM': {
                const existingItemIndex = state.items.findIndex(
                    item => item.variantId === action.payload.variantId
                )

                let newItems: CartItem[]
                let lastAddedItem: CartItem

                if (existingItemIndex >= 0) {
                    // Update existing item quantity
                    newItems = state.items.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    )
                    lastAddedItem = newItems[existingItemIndex]
                } else {
                    // Add new item
                    lastAddedItem = {
                        ...action.payload,
                        id: `${action.payload.variantId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                    }
                    newItems = [...state.items, lastAddedItem]
                }

                const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
                const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

                return {
                    ...state,
                    items: newItems,
                    totalItems,
                    totalPrice,
                    lastAddedItem,
                    isOpen: true,
                    isLoading: false
                }
            }

            case 'REMOVE_ITEM': {
                const newItems = state.items.filter(item => item.id !== action.payload)
                const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
                const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

                return {
                    ...state,
                    items: newItems,
                    totalItems,
                    totalPrice
                }
            }

            case 'UPDATE_QUANTITY': {
                const newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: Math.max(0, action.payload.quantity) }
                        : item
                ).filter(item => item.quantity > 0)

                const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
                const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

                return {
                    ...state,
                    items: newItems,
                    totalItems,
                    totalPrice
                }
            }

            case 'CLEAR_CART':
                return {
                    ...state,
                    items: [],
                    totalItems: 0,
                    totalPrice: 0,
                    lastAddedItem: undefined
                }

            case 'TOGGLE_CART':
                return {
                    ...state,
                    isOpen: !state.isOpen
                }

            case 'OPEN_CART':
                return {
                    ...state,
                    isOpen: true
                }

            case 'CLOSE_CART':
                return {
                    ...state,
                    isOpen: false
                }

            case 'LOAD_CART': {
                const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0)
                const totalPrice = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0)

                return {
                    ...state,
                    items: action.payload,
                    totalItems,
                    totalPrice,
                    isLoading: false
                }
            }

            case 'SET_LAST_ADDED':
                return {
                    ...state,
                    lastAddedItem: action.payload
                }

            default:
                console.warn('Unknown action type:', action)
                return state
        }
    } catch (error) {
        console.error('Cart reducer error:', error)
        return {
            ...state,
            isLoading: false
        }
    }
}

// Context
interface CartContextType {
    state: CartState
    dispatch: React.Dispatch<CartAction>
    addItem: (item: Omit<CartItem, 'id'>) => Promise<void>
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void
    getCartCount: () => number
    getCartTotal: () => number
    isInCart: (variantId: string) => boolean
}

const CartContext = createContext<CartContextType | null>(null)

// Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    // Load cart from localStorage on mount
    useEffect(() => {
        let isMounted = true

        const loadCart = async () => {
            try {
                dispatch({ type: 'SET_LOADING', payload: true })

                const savedCart = localStorage.getItem('chador-cart')
                if (savedCart && isMounted) {
                    const cartItems = JSON.parse(savedCart)
                    if (Array.isArray(cartItems)) {
                        dispatch({ type: 'LOAD_CART', payload: cartItems })
                    }
                }
            } catch (error) {
                console.error('Error loading cart from localStorage:', error)
            } finally {
                if (isMounted) {
                    dispatch({ type: 'SET_LOADING', payload: false })
                }
            }
        }

        loadCart()

        return () => {
            isMounted = false
        }
    }, [])

    // Save cart to localStorage whenever items change
    useEffect(() => {
        try {
            localStorage.setItem('chador-cart', JSON.stringify(state.items))
        } catch (error) {
            console.error('Error saving cart to localStorage:', error)
        }
    }, [state.items])

    // Helper functions
    const addItem = useCallback(async (item: Omit<CartItem, 'id'>) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true })

            // Validate item
            if (!item.variantId || !item.productId || !item.productTitle || item.price <= 0) {
                throw new Error('Invalid item data')
            }

            // Simulate API call (vervang later met echte Medusa API)
            await new Promise(resolve => setTimeout(resolve, 300))

            dispatch({ type: 'ADD_ITEM', payload: item })

            // Log for debugging
            console.log('Item added to cart:', item)

        } catch (error) {
            console.error('Error adding item to cart:', error)
            dispatch({ type: 'SET_LOADING', payload: false })
            throw error
        }
    }, [])

    const removeItem = useCallback((id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id })
    }, [])

    const updateQuantity = useCallback((id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }, [])

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' })
    }, [])

    const toggleCart = useCallback(() => {
        dispatch({ type: 'TOGGLE_CART' })
    }, [])

    const openCart = useCallback(() => {
        dispatch({ type: 'OPEN_CART' })
    }, [])

    const closeCart = useCallback(() => {
        dispatch({ type: 'CLOSE_CART' })
    }, [])

    const getCartCount = useCallback(() => {
        return state.totalItems
    }, [state.totalItems])

    const getCartTotal = useCallback(() => {
        return state.totalPrice
    }, [state.totalPrice])

    const isInCart = useCallback((variantId: string) => {
        return state.items.some(item => item.variantId === variantId)
    }, [state.items])

    const contextValue: CartContextType = {
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getCartCount,
        getCartTotal,
        isInCart
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

// Hook to use cart
export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

// Helper functions
export function formatPrice(amount: number, currency: string = 'EUR'): string {
    try {
        return new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: currency,
        }).format(amount / 100)
    } catch (error) {
        console.error('Error formatting price:', error)
        return `€${(amount / 100).toFixed(2)}`
    }
}

export function calculateCartTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export function getCartItemCount(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0)
}