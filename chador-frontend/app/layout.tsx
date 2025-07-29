// app/layout.tsx - Professionele root layout
import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'
import CartSidebar from '@/components/CartSidebar'

export const metadata: Metadata = {
    title: 'Chador Collection - Premium Islamitische Mode',
    description: 'Premium islamitische kleding waar traditie en moderne elegantie samenkomen',
    keywords: 'chador, hijab, islamitische kleding, modest fashion, premium kwaliteit',
    authors: [{ name: 'Chador Collection' }],
    viewport: 'width=device-width, initial-scale=1',
    openGraph: {
        title: 'Chador Collection - Premium Islamitische Mode',
        description: 'Elegantie in Eenvoud - Ontdek onze exclusieve collectie',
        type: 'website',
        locale: 'nl_NL',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="nl" className="scroll-smooth">
        <body className="bg-chador-warm-white text-chador-black antialiased">
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