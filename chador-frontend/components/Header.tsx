// components/Header.tsx - Professional Header
'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useState, useEffect } from 'react'

export default function Header() {
    const { state, toggleCart, getTotalItems } = useCart()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const totalItems = getTotalItems()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                    {/* Logo */}
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link href="/" className="group">
                            <span className="sr-only">Elegante Kleding</span>
                            <div className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                                Elegante<span className="text-amber-600">Kleding</span>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 -my-2 md:hidden">
                        <button
                            type="button"
                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-10">
                        <Link href="/" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Home
                        </Link>
                        <Link href="/products" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Alle Producten
                        </Link>
                        <Link href="/categories" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Categorieën
                        </Link>
                        <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">
                            Over Ons
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
                        {/* Search */}
                        <button className="text-gray-400 hover:text-gray-500 transition-colors">
                            <span className="sr-only">Zoeken</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Account */}
                        <button className="text-gray-400 hover:text-gray-500 transition-colors">
                            <span className="sr-only">Account</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>

                        {/* Cart */}
                        <button
                            onClick={toggleCart}
                            className="relative text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <span className="sr-only">Winkelwagen</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center justify-between">
                                    <div className="text-xl font-bold text-gray-900">
                                        Elegante<span className="text-amber-600">Kleding</span>
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">
                                        <Link
                                            href="/"
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            href="/products"
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Alle Producten
                                        </Link>
                                        <Link
                                            href="/categories"
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Categorieën
                                        </Link>
                                        <Link
                                            href="/about"
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Over Ons
                                        </Link>
                                    </nav>
                                </div>
                            </div>
                            <div className="py-6 px-5 space-y-6">
                                <button
                                    onClick={() => {
                                        toggleCart()
                                        setIsMobileMenuOpen(false)
                                    }}
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700"
                                >
                                    Winkelwagen ({totalItems})
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}