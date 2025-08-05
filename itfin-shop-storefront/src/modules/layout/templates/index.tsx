import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto duration-200 bg-white border-b border-gray-200">
        <nav className="content-container flex items-center justify-between w-full h-full">

          {/* Logo */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-gray-700"
              data-testid="nav-store-link"
            >
              ITFin Shop
            </LocalizedClientLink>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Home
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/store"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Shop
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Over Ons
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Contact
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/blog"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Blog
            </LocalizedClientLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            <LocalizedClientLink
              href="/account"
              className="hidden sm:block text-sm font-medium text-gray-700 hover:text-gray-900"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>

            {/* Cart */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Winkelwagen (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-700 hover:text-gray-900">
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