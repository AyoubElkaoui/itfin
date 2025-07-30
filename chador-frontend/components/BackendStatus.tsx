// components/BackendStatus.tsx - Simplified backend status
'use client'

import { useState, useEffect } from 'react'
import { medusaClient } from '@/lib/medusa'

export default function BackendStatus() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null)

    useEffect(() => {
        checkStatus()
    }, [])

    const checkStatus = async () => {
        try {
            const healthy = await medusaClient.healthCheck()
            setIsConnected(healthy)
        } catch (error) {
            // Silently fail - we'll show demo mode
            setIsConnected(false)
        }
    }

    if (isConnected === null) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                    <span className="text-blue-700 text-sm">Verbinding controleren...</span>
                </div>
            </div>
        )
    }

    if (!isConnected) {
        return (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">⚠️</span>
                        <div>
                            <h3 className="font-medium text-orange-800">Demo Modus</h3>
                            <p className="text-orange-700 text-sm">
                                Medusa backend niet bereikbaar. Demo producten worden getoond.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={checkStatus}
                        className="text-orange-600 hover:text-orange-800 text-sm underline"
                    >
                        Opnieuw proberen
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
                <span className="text-2xl mr-3">✅</span>
                <div>
                    <h3 className="font-medium text-green-800">Backend Verbonden</h3>
                    <p className="text-green-700 text-sm">Medusa backend is actief</p>
                </div>
            </div>
        </div>
    )
}