// components/RegionDebug.tsx - Debug component voor regio's
'use client'

import { useState, useEffect } from 'react'
import { medusaClient } from '@/lib/medusa'

interface Region {
    id: string
    name: string
    currency_code: string
    countries?: Array<{ iso_2: string; display_name: string }>
}

export default function RegionDebug() {
    const [regions, setRegions] = useState<Region[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadRegions() {
            try {
                setLoading(true)
                setError(null)

                console.log('🌍 Loading regions...')
                const regionData = await medusaClient.getRegions()

                console.log('📍 Regions loaded:', regionData)
                setRegions(regionData)

            } catch (err) {
                console.error('❌ Error loading regions:', err)
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        loadRegions()
    }, [])

    if (loading) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                    <span className="text-blue-700 text-sm">Loading regions...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                    <span className="text-2xl mr-3">❌</span>
                    <div>
                        <h3 className="font-medium text-red-800">Region Loading Error</h3>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🌍 Available Regions ({regions.length})
            </h3>

            {regions.length === 0 ? (
                <div className="text-center py-4">
                    <p className="text-gray-600">No regions found</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Make sure your Medusa backend has regions configured
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {regions.map((region) => (
                        <div key={region.id} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{region.name}</h4>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    {region.currency_code?.toUpperCase() || 'No Currency'}
                                </span>
                            </div>

                            <div className="text-sm text-gray-600 mb-2">
                                <strong>ID:</strong> {region.id}
                            </div>

                            {region.countries && region.countries.length > 0 ? (
                                <div className="text-sm text-gray-600">
                                    <strong>Countries:</strong>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {region.countries.map((country) => (
                                            <span
                                                key={country.iso_2}
                                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                title={country.display_name || country.iso_2}
                                            >
                                                {country.iso_2?.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-500">
                                    No countries configured
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Debug Info:</h4>
                <div className="bg-gray-100 rounded p-3 text-sm text-gray-700">
                    <pre>{JSON.stringify(regions, null, 2)}</pre>
                </div>
            </div>
        </div>
    )
}