// components/Footer.tsx - Minimale Professionele Footer
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                {/* Main Footer Content */}
                <div className="grid grid-4 gap-xl mb-xl">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="navbar-brand text-white block mb-md">
                            Elegante Kleding
                        </Link>
                        <p className="text-sm text-light-grey leading-relaxed">
                            Premium fashion for the discerning individual.
                            Timeless design meets exceptional quality.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3>Navigation</h3>
                        <ul className="space-y-xs">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/products">Shop</Link></li>
                            <li><Link href="/about">About</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3>Customer Care</h3>
                        <ul className="space-y-xs">
                            <li><Link href="/shipping">Shipping</Link></li>
                            <li><Link href="/returns">Returns</Link></li>
                            <li><Link href="/size-guide">Size Guide</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3>Legal</h3>
                        <ul className="space-y-xs">
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/cookies">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="border-t border-dark-grey pt-lg mb-lg">
                    <div className="grid grid-2 gap-xl">
                        <div>
                            <h3 className="mb-sm">Contact</h3>
                            <div className="space-y-xs text-sm text-light-grey">
                                <p>Amsterdam, Netherlands</p>
                                <p>+31 20 123 4567</p>
                                <p>info@elegantekleding.nl</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-sm">Newsletter</h3>
                            <form className="flex gap-xs">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="flex-1 px-sm py-xs bg-charcoal border border-dark-grey text-white text-sm placeholder-light-grey focus:outline-none focus:border-white"
                                />
                                <button
                                    type="submit"
                                    className="px-sm py-xs bg-white text-black text-sm font-medium hover:bg-light-grey transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-sm">
                        <p>&copy; 2024 Elegante Kleding. All rights reserved.</p>
                        <div className="flex gap-lg">
                            <Link href="/privacy">Privacy</Link>
                            <Link href="/terms">Terms</Link>
                            <Link href="/cookies">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}