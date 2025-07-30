// app/page.tsx - Server-side layout zonder interactivity
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HomePage from '@/components/HomePage'

export default function Page() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <HomePage />
            <Footer />
        </div>
    )
}