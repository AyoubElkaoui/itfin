// components/ProductVariantSelector.tsx - Complete Professional Variant Selector
'use client'

import { useState, useCallback, useMemo } from 'react'
import { Product, ProductVariant, formatPrice, getVariantPrice } from '@/lib/medusa'
import AddToCartButton from './AddToCartButton'

interface ProductVariantSelectorProps {
    product: Product
    defaultVariantId?: string
}

// Helper type for variant options
interface VariantOption {
    name: string
    values: string[]
}

export default function ProductVariantSelector({
                                                   product,
                                                   defaultVariantId
                                               }: ProductVariantSelectorProps) {
    const [selectedVariantId, setSelectedVariantId] = useState(
        defaultVariantId || product.variants?.[0]?.id || ''
    )
    const [quantity, setQuantity] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

    // Find selected variant
    const selectedVariant = useMemo(() =>
            product.variants?.find(v => v.id === selectedVariantId) || null,
        [product.variants, selectedVariantId]
    )

    const selectedPrice = useMemo(() =>
            selectedVariant ? getVariantPrice(selectedVariant) : 0,
        [selectedVariant]
    )

    // Parse variant options from titles
    const variantOptions = useMemo((): VariantOption[] => {
        if (!product.variants || product.variants.length === 0) return []

        const optionsMap = new Map<string, Set<string>>()

        product.variants.forEach(variant => {
            if (variant.title && variant.title !== 'Default Title') {
                // Split variant title by common separators
                const parts = variant.title.split(/[\/\-\|,]/).map(p => p.trim())

                parts.forEach((part, index) => {
                    const optionName = index === 0 ? 'Maat' : index === 1 ? 'Kleur' : `Optie ${index + 1}`

                    if (!optionsMap.has(optionName)) {
                        optionsMap.set(optionName, new Set())
                    }
                    optionsMap.get(optionName)?.add(part)
                })
            }
        })

        return Array.from(optionsMap.entries()).map(([name, values]) => ({
            name,
            values: Array.from(values).sort()
        }))
    }, [product.variants])

    // Check if variant has meaningful options
    const hasOptions = variantOptions.length > 0 && product.variants.length > 1

    // Find variant by selected options
    const findVariantByOptions = useCallback((options: Record<string, string>) => {
        return product.variants.find(variant => {
            if (!variant.title || variant.title === 'Default Title') return false

            const parts = variant.title.split(/[\/\-\|,]/).map(p => p.trim())

            return Object.entries(options).every(([optionName, value]) => {
                const index = optionName === 'Maat' ? 0 : optionName === 'Kleur' ? 1 : parseInt(optionName.replace('Optie ', '')) - 1
                return parts[index] === value
            })
        })
    }, [product.variants])

    // Handle option selection
    const handleOptionChange = useCallback((optionName: string, value: string) => {
        const newSelectedOptions = { ...selectedOptions, [optionName]: value }
        setSelectedOptions(newSelectedOptions)

        const variant = findVariantByOptions(newSelectedOptions)
        if (variant) {
            setSelectedVariantId(variant.id)
        }
    }, [selectedOptions, findVariantByOptions])

    // Initialize selected options from default variant
    useMemo(() => {
        if (selectedVariant && selectedVariant.title && selectedVariant.title !== 'Default Title') {
            const parts = selectedVariant.title.split(/[\/\-\|,]/).map(p => p.trim())
            const newOptions: Record<string, string> = {}

            parts.forEach((part, index) => {
                const optionName = index === 0 ? 'Maat' : index === 1 ? 'Kleur' : `Optie ${index + 1}`
                newOptions[optionName] = part
            })

            setSelectedOptions(newOptions)
        }
    }, [selectedVariant])

    // Quantity handlers
    const incrementQuantity = useCallback(() => {
        setQuantity(prev => Math.min(prev + 1, 10))
    }, [])

    const decrementQuantity = useCallback(() => {
        setQuantity(prev => Math.max(prev - 1, 1))
    }, [])

    // Check if variant is available
    const isVariantAvailable = useCallback((variant: ProductVariant) => {
        return (variant.inventory_quantity ?? 0) > 0
    }, [])

    return (
        <div className="space-y-6">
            {/* Variant Options Selection */}
            {hasOptions && (
                <div className="space-y-4">
                    {variantOptions.map((option) => (
                        <div key={option.name}>
                            <h3 className="text-lg font-semibold mb-3">{option.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {option.values.map((value) => {
                                    const testOptions = { ...selectedOptions, [option.name]: value }
                                    const testVariant = findVariantByOptions(testOptions)
                                    const isSelected = selectedOptions[option.name] === value
                                    const isAvailable = testVariant ? isVariantAvailable(testVariant) : false
                                    const isDisabled = !testVariant || !isAvailable

                                    return (
                                        <button
                                            key={value}
                                            onClick={() => handleOptionChange(option.name, value)}
                                            disabled={isDisabled}
                                            className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                                                isSelected
                                                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                                                    : isDisabled
                                                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                                        : 'border-gray-300 text-gray-700 hover:border-amber-400 hover:bg-amber-50'
                                            }`}
                                        >
                                            {value}
                                            {isDisabled && (
                                                <span className="block text-xs text-red-500 mt-1">
                          Uitverkocht
                        </span>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Simple Variant Selection (for products without parsed options) */}
            {!hasOptions && product.variants.length > 1 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Kies je variant</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {product.variants.map((variant) => {
                            const price = getVariantPrice(variant)
                            const isSelected = variant.id === selectedVariantId
                            const isAvailable = isVariantAvailable(variant)

                            return (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariantId(variant.id)}
                                    disabled={!isAvailable}
                                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                                        isSelected
                                            ? 'border-amber-500 bg-amber-50'
                                            : isAvailable
                                                ? 'border-gray-200 hover:border-amber-300'
                                                : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                                    }`}
                                >
                                    <div className="font-medium text-gray-900">
                                        {variant.title || 'Default'}
                                    </div>
                                    {variant.sku && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            SKU: {variant.sku}
                                        </div>
                                    )}
                                    <div className="text-sm font-semibold text-amber-600 mt-2">
                                        {formatPrice(price)}
                                    </div>
                                    {!isAvailable && (
                                        <div className="text-xs text-red-500 mt-1">
                                            Niet op voorraad
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Quantity Selector */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Aantal:
                </label>
                <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden w-32">
                    <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors border-r border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    </button>
                    <div className="flex-1 text-center py-3 font-semibold">
                        {quantity}
                    </div>
                    <button
                        onClick={incrementQuantity}
                        disabled={quantity >= 10}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors border-l border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="button"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Maximum 10 stuks per bestelling</p>
            </div>

            {/* Price Summary */}
            {selectedVariant && (
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-gray-900">
                                {product.title}
                            </h4>
                            {selectedVariant.title && selectedVariant.title !== 'Default Title' && (
                                <p className="text-sm text-gray-600">
                                    {selectedVariant.title}
                                </p>
                            )}
                            {selectedVariant.sku && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Artikelnummer: {selectedVariant.sku}
                                </p>
                            )}
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-amber-600">
                                {formatPrice(selectedPrice * quantity)}
                            </div>
                            {quantity > 1 && (
                                <div className="text-sm text-gray-500">
                                    {formatPrice(selectedPrice)} per stuk
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Add to Cart Section */}
            <div className="pt-4 space-y-4">
                <AddToCartButton
                    variantId={selectedVariantId}
                    quantity={quantity}
                    disabled={!selectedVariant || !isVariantAvailable(selectedVariant)}
                    className="w-full text-lg py-4"
                >
                    {!selectedVariant
                        ? 'Selecteer variant'
                        : !isVariantAvailable(selectedVariant)
                            ? 'Niet op voorraad'
                            : `Toevoegen aan winkelwagen - ${formatPrice(selectedPrice * quantity)}`
                    }
                </AddToCartButton>

                {/* Stock Information */}
                {selectedVariant && (
                    <div className="text-center">
                        {isVariantAvailable(selectedVariant) ? (
                            <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>
                  Op voorraad ({selectedVariant.inventory_quantity || 0} beschikbaar)
                </span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2 text-sm text-red-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span>Momenteel niet op voorraad</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Size Guide Link */}
                {variantOptions.some(opt => opt.name === 'Maat') && (
                    <div className="text-center">
                        <button className="text-sm text-amber-600 hover:text-amber-700 underline">
                            📏 Bekijk maattabel
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}