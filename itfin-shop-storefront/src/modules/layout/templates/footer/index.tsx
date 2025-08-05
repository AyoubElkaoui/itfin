import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@medusajs/ui"
import { Facebook, Instagram, Twitter, Envelope, Phone, MapPin } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="content-container">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ITFin Shop
                </h3>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  Jouw betrouwbare partner voor premium producten.
                  Ontdek kwaliteit en stijl in elke aankoop.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin size={18} className="text-blue-400" />
                  <span>Amsterdam, Nederland</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone size={18} className="text-blue-400" />
                  <span>+31 20 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Envelope size={18} className="text-blue-400" />
                  <span>info@itfinshop.nl</span>
                </div>
              </div>

              {/*/!* Social Media *!/*/}
              {/*<div className="flex space-x-4">*/}
              {/*  <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors duration-300">*/}
              {/*    <Facebook size={20} />*/}
              {/*  </a>*/}
              {/*  <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors duration-300">*/}
              {/*    <Instagram size={20} />*/}
              {/*  </a>*/}
              {/*  <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-blue-400 transition-colors duration-300">*/}
              {/*    <Twitter size={20} />*/}
              {/*  </a>*/}
              {/*</div>*/}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Snelle Links</h4>
              <ul className="space-y-3">
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Alle Producten
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/collections"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Collecties
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/about"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Over Ons
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/contact"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* Categories */}
            {productCategories && productCategories?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-6">Categorieën</h4>
                <ul className="space-y-3">
                  {productCategories?.slice(0, 6).map((category) => {
                    if (category.parent_category) return null

                    return (
                      <li key={category.id}>
                        <LocalizedClientLink
                          className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                          href={`/categories/${category.handle}`}
                        >
                          {category.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Klantenservice</h4>
              <ul className="space-y-3">
                <li>
                  <LocalizedClientLink
                    href="/help"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Veelgestelde Vragen
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/shipping"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Verzending & Retour
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/privacy"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Privacy Beleid
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/terms"
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    Algemene Voorwaarden
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">Blijf op de hoogte</h4>
              <p className="text-gray-300">
                Ontvang de nieuwste updates over onze producten en exclusieve aanbiedingen.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Voer je e-mailadres in"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300">
                Aanmelden
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Text className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} ITFin Shop. Alle rechten voorbehouden.
            </Text>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Wij accepteren:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-xs font-bold text-white">V</div>
                <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center text-xs font-bold text-white">M</div>
                <div className="w-8 h-5 bg-yellow-500 rounded flex items-center justify-center text-xs font-bold text-white">PP</div>
                <div className="w-8 h-5 bg-orange-600 rounded flex items-center justify-center text-xs font-bold text-white">iD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}