// app/products/[handle]/not-found.tsx
import Link from 'next/link'

export default function ProductNotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center max-w-md">
                <div className="text-8xl mb-6">🔍</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Product niet gevonden
                </h1>
                <p className="text-gray-600 mb-8">
                    Het product dat je zoekt bestaat niet of is niet meer beschikbaar.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Terug naar homepage
                    </Link>
                    <Link
                        href="/products"
                        className="block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-amber-500 transition-colors"
                    >
                        Bekijk alle producten
                    </Link>
                </div>
            </div>
        </div>
    )
}