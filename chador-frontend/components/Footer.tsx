// components/Footer.tsx - Clean Footer
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="grid-3">
                    {/* Company Info */}
                    <div>
                        <h3>EleganteKleding</h3>
                        <p>Premium kleding voor elke gelegenheid. Kwaliteit en stijl gecombineerd.</p>
                        <div className="mt-4">
                            <p>📍 Amsterdam, Nederland</p>
                            <p>📞 +31 20 123 4567</p>
                            <p>✉️ info@elegantekleding.nl</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3>Snelle Links</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li className="mb-4"><Link href="/">Home</Link></li>
                            <li className="mb-4"><Link href="/products">Alle Producten</Link></li>
                            <li className="mb-4"><Link href="/categories">Categorieën</Link></li>
                            <li className="mb-4"><Link href="/about">Over Ons</Link></li>
                            <li className="mb-4"><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3>Klantenservice</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li className="mb-4"><Link href="/shipping">Verzending</Link></li>
                            <li className="mb-4"><Link href="/returns">Retour</Link></li>
                            <li className="mb-4"><Link href="/size-guide">Maattabel</Link></li>
                            <li className="mb-4"><Link href="/faq">Veelgestelde Vragen</Link></li>
                            <li className="mb-4"><Link href="/privacy">Privacy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{
                    borderTop: '1px solid #333',
                    marginTop: '40px',
                    paddingTop: '20px',
                    textAlign: 'center'
                }}>
                    <p>&copy; 2024 EleganteKleding. Alle rechten voorbehouden.</p>
                </div>
            </div>
        </footer>
    )
}