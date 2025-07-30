// components/Navbar.tsx - Complete werkende Navbar
'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react'

export default function Navbar() {
    const { toggleCart, getTotalItems } = useCart()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const totalItems = getTotalItems()

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-content">
                        {/* Logo */}
                        <Link href="/" className="navbar-brand">
                            EleganteKleding
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="navbar-nav">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/products">Producten</Link></li>
                            <li><Link href="/about">Over Ons</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>

                        {/* Desktop Actions */}
                        <div className="navbar-actions">
                            {/* Search Button */}
                            <button
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                title="Zoeken"
                            >
                                <Search size={20} />
                            </button>

                            {/* Account Button */}
                            <button
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                title="Account"
                            >
                                <User size={20} />
                            </button>

                            {/* Cart Button */}
                            <button
                                onClick={toggleCart}
                                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                                title={`Winkelwagen (${totalItems} items)`}
                            >
                                <ShoppingBag size={20} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors ml-2"
                                title="Menu"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Mobile Menu */}
                    <div className="mobile-menu md:hidden z-50">
                        <div className="mobile-menu-header">
                            <Link
                                href="/"
                                className="navbar-brand"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                EleganteKleding
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <ul className="mobile-menu-nav">
                            <li>
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Producten
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Over Ons
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>

                        {/* Mobile Cart and Actions */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <button
                                onClick={() => {
                                    toggleCart()
                                    setIsMobileMenuOpen(false)
                                }}
                                className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded"
                            >
                                <div className="flex items-center gap-2">
                                    <ShoppingBag size={20} />
                                    <span>Winkelwagen</span>
                                </div>
                                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                                    {totalItems}
                                </span>
                            </button>

                            <div className="flex gap-2 mt-4">
                                <button className="flex-1 flex items-center justify-center gap-2 p-2 text-gray-600 hover:bg-gray-50 rounded">
                                    <Search size={18} />
                                    <span className="text-sm">Zoeken</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 p-2 text-gray-600 hover:bg-gray-50 rounded">
                                    <User size={18} />
                                    <span className="text-sm">Account</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}