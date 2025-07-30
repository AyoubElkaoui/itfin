// app/layout.tsx - Professional Root Layout
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import CartSidebar from '@/components/CartSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Elegante Kleding - Premium Fashion Online',
    description: 'Ontdek onze exclusieve collectie van hoogwaardige kleding. Stijl en comfort perfect gecombineerd.',
    keywords: 'kleding, fashion, premium, online winkel, stijl, kwaliteit',
    authors: [{ name: 'Elegante Kleding' }],
    openGraph: {
        title: 'Elegante Kleding - Premium Fashion Online',
        description: 'Ontdek onze exclusieve collectie van hoogwaardige kleding',
        type: 'website',
        locale: 'nl_NL',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export function generateViewport() {
    return {
        width: 'device-width',
        initialScale: 1,
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="nl" className="scroll-smooth">
        <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <CartProvider>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
            </div>
            <CartSidebar />
        </CartProvider>
        </body>
        </html>
    )
}