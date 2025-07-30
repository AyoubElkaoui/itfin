// components/Navbar.tsx - Clean Navigation
'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function Navbar() {
    const { toggleCart, getTotalItems } = useCart()
    const totalItems = getTotalItems()

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link href="/" className="navbar-brand">
                        EleganteKleding
                    </Link>

                    {/* Navigation Links */}
                    <ul className="navbar-nav">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Producten</Link></li>
                        <li><Link href="/categories">Categorieën</Link></li>
                        <li><Link href="/about">Over Ons</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>

                    {/* Cart Button */}
                    <button
                        onClick={toggleCart}
                        className="btn btn-secondary"
                        style={{ position: 'relative' }}
                    >
                        Winkelwagen ({totalItems})
                    </button>
                </div>
            </div>
        </nav>
    )
}