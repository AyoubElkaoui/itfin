import { NextRequest, NextResponse } from "next/server"

/**
 * Eenvoudige middleware die alle landcodes weghaalt
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip voor statische bestanden en API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Als URL begint met een landcode (2 letters), redirect naar URL zonder landcode
  const countryCodePattern = /^\/[a-z]{2}(\/|$)/i
  if (countryCodePattern.test(pathname)) {
    const newPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const url = request.nextUrl.clone()
    url.pathname = newPathname
    return NextResponse.redirect(url, 301)
  }

  // Cache ID cookie instellen
  const response = NextResponse.next()
  const cacheId = request.cookies.get("_medusa_cache_id")?.value || crypto.randomUUID()

  if (!request.cookies.get("_medusa_cache_id")) {
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: 60 * 60 * 24,
    })
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}