import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto duration-200 bg-chador-warm-white/95 backdrop-blur-md border-b border-chador-soft-beige shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Mobile Menu & Search */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full lg:hidden">
              <SideMenu regions={regions} />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <LocalizedClientLink
                href="/collections"
                className="chador-nav-link text-sm"
                data-testid="nav-collections-link"
              >
                Collecties
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/store"
                className="chador-nav-link text-sm"
                data-testid="nav-store-link"
              >
                Alle Producten
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/about"
                className="chador-nav-link text-sm"
                data-testid="nav-about-link"
              >
                Over Ons
              </LocalizedClientLink>
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="group flex items-center"
              data-testid="nav-store-link"
            >
              <div className="flex flex-col items-center">
                {/* Logo Icon */}
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-8 h-8 text-chador-gold"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <div className="w-px h-6 bg-chador-taupe mx-2"></div>
                  <div className="text-center">
                    <span className="chador-heading text-xl font-medium tracking-wider text-chador-black group-hover:text-chador-gold transition-colors duration-200">
                      CHADOR
                    </span>
                    <div className="text-xs text-chador-brown tracking-[0.2em] -mt-1">
                      COLLECTION
                    </div>
                  </div>
                </div>
              </div>
            </LocalizedClientLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* Desktop Account & Search */}
            <div className="hidden lg:flex items-center gap-x-6 h-full">
              <button className="chador-nav-link text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Zoeken
              </button>

              <LocalizedClientLink
                href="/account"
                className="chador-nav-link text-sm flex items-center gap-2"
                data-testid="nav-account-link"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </LocalizedClientLink>
            </div>

            {/* Cart Button */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="chador-nav-link flex items-center gap-2 text-sm"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
                  </svg>
                  <span className="hidden sm:inline">Winkelwagen (0)</span>
                  <span className="sm:hidden">0</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>

        {/* Enhanced Border Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chador-gold to-transparent opacity-30"></div>
      </header>
    </div>
  )
}