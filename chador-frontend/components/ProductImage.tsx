// components/ProductImage.tsx - Client component voor afbeeldingen
'use client'

import { useState } from 'react'

interface ProductImageProps {
    src: string
    alt: string
    className?: string
}

export default function ProductImage({ src, alt, className = "" }: ProductImageProps) {
    const [imageError, setImageError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    if (!src || imageError) {
        return (
            <div className={`w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100 ${className}`}>
                <div className="text-4xl mb-2">📷</div>
                <p className="text-sm text-center px-2">
                    {!src ? 'Geen afbeelding' : 'Afbeelding niet beschikbaar'}
                </p>
            </div>
        )
    }

    return (
        <div className={`w-full h-full bg-gray-100 relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false)
                    setImageError(true)
                }}
            />
        </div>
    )
}