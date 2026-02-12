import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip i18n middleware for API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login' || pathname === '/admin/login/') {
      return NextResponse.next();
    }

    // Check for NextAuth session token cookie
    // In production with HTTPS, the cookie name is prefixed with __Secure-
    const sessionToken =
      request.cookies.get('__Secure-next-auth.session-token')?.value ||
      request.cookies.get('next-auth.session-token')?.value;

    if (!sessionToken) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // Apply i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except static files and _next
    '/((?!_next|.*\\..*).*)',
  ],
};
