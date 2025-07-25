import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-chador-cream border-t border-chador-soft-beige">
      <div className="content-container">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <LocalizedClientLink
                href="/"
                className="inline-block mb-6 group"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-10 h-10 text-chador-gold"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <div>
                    <span className="chador-heading text-2xl font-medium tracking-wider text-chador-black group-hover:text-chador-gold transition-colors duration-200">
                      CHADOR
                    </span>
                    <div className="text-xs text-chador-brown tracking-[0.2em] -mt-1">
                      COLLECTION
                    </div>
                  </div>
                </div>
              </LocalizedClientLink>

              <p className="chador-body text-chador-brown mb-6 max-w-sm">
                Premium islamitische kleding waar traditie en moderne elegantie samenkomen.
                Ontworpen met respect voor cultuur en stijl.
              </p>

              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-chador-soft-beige hover:bg-chador-gold rounded-full flex items-center justify-center transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-chador-brown group-hover:text-chador-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-chador-soft-beige hover:bg-chador-gold rounded-full flex items-center justify-center transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-chador-brown group-hover:text-chador-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.342-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001.017 0z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-chador-soft-beige hover:bg-chador-gold rounded-full flex items-center justify-center transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-chador-brown group-hover:text-chador-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-chador-soft-beige hover:bg-chador-gold rounded-full flex items-center justify-center transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-chador-brown group-hover:text-chador-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Categories */}
            {productCategories && productCategories?.length > 0 && (
              <div className="lg:col-span-1">
                <h3 className="chador-heading text-lg mb-6 text-chador-black">
                  Categorieën
                </h3>
                <ul className="space-y-3" data-testid="footer-categories">
                  {productCategories?.slice(0, 8).map((c) => {
                    if (c.parent_category) {
                      return null
                    }

                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="chador-nav-link text-sm py-1 block"
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {c.category_children && c.category_children.length > 0 && (
                          <ul className="ml-4 mt-2 space-y-2">
                            {c.category_children.slice(0, 3).map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  className="text-sm text-chador-brown hover:text-chador-gold transition-colors duration-200"
                                  href={`/categories/${child.handle}`}
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections */}
            {collections && collections.length > 0 && (
              <div className="lg:col-span-1">
                <h3 className="chador-heading text-lg mb-6 text-chador-black">
                  Collecties
                </h3>
                <ul className="space-y-3">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="chador-nav-link text-sm py-1 block"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Customer Service */}
            <div className="lg:col-span-1">
              <h3 className="chador-heading text-lg mb-6 text-chador-black">
                Klantenservice
              </h3>
              <ul className="space-y-3">
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="chador-nav-link text-sm py-1 block"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/shipping"
                    className="chador-nav-link text-sm py-1 block"
                  >
                    Verzending
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/returns"
                    className="chador-nav-link text-sm py-1 block"
                  >
                    Retourneren
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/size-guide"
                    className="chador-nav-link text-sm py-1 block"
                  >
                    Maatgids
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/faq"
                    className="chador-nav-link text-sm py-1 block"
                  >
                    Veelgestelde Vragen
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/privacy"
                    className="chador-nav-link text-sm py-1 block"
                  >
                    Privacy Beleid
                  </LocalizedClientLink>
                </li>
              </ul>

              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="chador-heading text-base mb-3 text-chador-black">
                  Nieuwsbrief
                </h4>
                <p className="text-sm text-chador-brown mb-4">
                  Ontvang updates over nieuwe collecties en exclusieve aanbiedingen.
                </p>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Uw email adres"
                    className="chador-input flex-1 rounded-r-none text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-chador-gold hover:bg-opacity-90 text-chador-black px-4 py-3 rounded-r-md transition-colors duration-200 font-medium text-sm"
                  >
                    Aanmelden
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-chador-soft-beige py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              <Text className="text-sm text-chador-brown">
                © {new Date().getFullYear()} Chador Collection. Alle rechten voorbehouden.
              </Text>
              <div className="flex items-center gap-4">
                <LocalizedClientLink
                  href="/terms"
                  className="text-sm text-chador-brown hover:text-chador-gold transition-colors duration-200"
                >
                  Algemene Voorwaarden
                </LocalizedClientLink>
                <span className="text-chador-taupe">•</span>
                <LocalizedClientLink
                  href="/privacy"
                  className="text-sm text-chador-brown hover:text-chador-gold transition-colors duration-200"
                >
                  Privacy
                </LocalizedClientLink>
                <span className="text-chador-taupe">•</span>
                <LocalizedClientLink
                  href="/cookies"
                  className="text-sm text-chador-brown hover:text-chador-gold transition-colors duration-200"
                >
                  Cookies
                </LocalizedClientLink>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-chador-brown mr-2">Wij accepteren:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-chador-soft-beige rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-chador-brown">iDEAL</span>
                </div>
                <div className="w-8 h-5 bg-chador-soft-beige rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-chador-brown">VISA</span>
                </div>
                <div className="w-8 h-5 bg-chador-soft-beige rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-chador-brown">MC</span>
                </div>
                <div className="w-8 h-5 bg-chador-soft-beige rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-chador-brown">PP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}