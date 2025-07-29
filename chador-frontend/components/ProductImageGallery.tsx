// components/ProductImageGallery.tsx
'use client'

import { useState } from 'react'

interface Image {
    url: string
}

interface ProductImageGalleryProps {
    images: Image[]
    thumbnail: string
    title: string
}

export default function ProductImageGallery({ images, thumbnail, title }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0)

    // Combineer thumbnail en images
    const allImages = [
        { url: thumbnail },
        ...images
    ].filter(img => img && img.url)

    if (allImages.length === 0) {
        return (
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4">📷</div>
                    <p>Geen afbeelding beschikbaar</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={allImages[selectedImage].url}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/placeholder-image.png' // Je kunt een placeholder toevoegen
                    }}
                />
            </div>

            {/* Thumbnail Grid */}
            {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {allImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImage === index
                                    ? 'border-amber-500 ring-2 ring-amber-200'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image.url}
                                alt={`${title} - afbeelding ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.style.display = 'none'
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Counter */}
            {allImages.length > 1 && (
                <div className="text-center text-sm text-gray-500">
                    Afbeelding {selectedImage + 1} van {allImages.length}
                </div>
            )}
        </div>
    )
}