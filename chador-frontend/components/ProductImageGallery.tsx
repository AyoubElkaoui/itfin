// components/ProductImageGallery.tsx - Professional Image Gallery
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ProductImage } from '@/lib/medusa'

interface ProductImageGalleryProps {
    images: ProductImage[]
    thumbnail?: string
    title: string
}

export default function ProductImageGallery({
                                                images,
                                                thumbnail,
                                                title
                                            }: ProductImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    // Combineer thumbnail en images
    const allImages = [
        ...(thumbnail ? [{ id: 'thumbnail', url: thumbnail }] : []),
        ...images
    ].filter(img => img && img.url)

    if (allImages.length === 0) {
        return (
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4">📷</div>
                    <p className="text-lg">Geen afbeelding beschikbaar</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group">
                <Image
                    src={allImages[selectedImageIndex].url}
                    alt={`${title} - afbeelding ${selectedImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={selectedImageIndex === 0}
                />

                {/* Image Navigation Arrows */}
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedImageIndex(
                                selectedImageIndex === 0 ? allImages.length - 1 : selectedImageIndex - 1
                            )}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setSelectedImageIndex(
                                selectedImageIndex === allImages.length - 1 ? 0 : selectedImageIndex + 1
                            )}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {allImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded-full">
                        {selectedImageIndex + 1} / {allImages.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {allImages.map((image, index) => (
                        <button
                            key={image.id || index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImageIndex === index
                                    ? 'border-amber-500 ring-2 ring-amber-200'
                                    : 'border-gray-200 hover:border-amber-300'
                            }`}
                        >
                            <Image
                                src={image.url}
                                alt={`${title} - thumbnail ${index + 1}`}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Dots (alternative navigation) */}
            {allImages.length > 1 && allImages.length <= 5 && (
                <div className="flex justify-center space-x-2">
                    {allImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                selectedImageIndex === index
                                    ? 'bg-amber-600'
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Ga naar afbeelding ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}