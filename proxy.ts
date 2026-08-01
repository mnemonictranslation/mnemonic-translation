import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

function withSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  // Updated CSP to allow Supabase
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co"
  );

  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=()');

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin, /api, and static files (anything with a file extension, e.g.
  // /images/logo.png, /patterns/autumn.svg) are not localized - skip i18n
  // routing for them so it doesn't rewrite asset paths with a locale prefix.
  const isStaticFile = /\.[^/]+$/.test(pathname);
  const isLocalized = !pathname.startsWith('/admin') && !pathname.startsWith('/api') && !isStaticFile;

  const response = isLocalized ? handleI18nRouting(request) : NextResponse.next();

  return withSecurityHeaders(response);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
