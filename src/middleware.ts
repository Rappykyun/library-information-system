import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from './lib/session';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  // Public routes
  if (request.nextUrl.pathname === '/login') {
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL('/books', request.url));
    }
    return response;
  }

  // Protect all other routes
  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based access control
  const pathname = request.nextUrl.pathname;

  // Catalog access: only procurement and librarian
  if (pathname.startsWith('/catalog')) {
    if (session.role !== 'procurement' && session.role !== 'librarian') {
      return NextResponse.redirect(new URL('/books', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};

