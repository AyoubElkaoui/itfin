import { Suspense } from "react"
import { ShoppingBag, User, MagnifyingGlass, Heart } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto duration-200 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full">

          {/* Logo */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              data-testid="nav-store-link"
            >
              ITFin Shop
            </LocalizedClientLink>
          </div>

          {/* Main Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <LocalizedClientLink
              href="/store"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              Alle Producten
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </LocalizedClientLink>

            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
                Categorieën
                <svg className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  <LocalizedClientLink href="/categories/kleding" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    Kleding
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/categories/accessoires" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    Accessoires
                  </LocalizedClientLink>
                  <LocalizedClientLink href="/categories/schoenen" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                    Schoenen
                  </LocalizedClientLink>
                </div>
              </div>
            </div>

            <LocalizedClientLink
              href="/collections"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              Collecties
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
            >
              Over Ons
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </LocalizedClientLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-all duration-200">
              <MagnifyingGlass size={20} />
            </button>

            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-all duration-200">
              <Heart size={20} />
            </button>

            {/* Account */}
            <LocalizedClientLink
              href="/account"
              className="hidden sm:flex p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-all duration-200"
              data-testid="nav-account-link"
            >
              <User size={20} />
            </LocalizedClientLink>

            {/* Cart */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors duration-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingBag size={20} />
                  <span className="font-medium">0</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}