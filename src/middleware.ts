import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If the user is not signed in and the route requires auth, redirect to sign-in page
  const isAuthRoute = req.nextUrl.pathname.startsWith('/dashboard') || 
                      req.nextUrl.pathname.startsWith('/profile');
  
  if (!session && isAuthRoute) {
    const redirectUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is signed in and trying to access auth pages, redirect to dashboard
  const isNonAuthRoute = req.nextUrl.pathname.startsWith('/sign-in') || 
                        req.nextUrl.pathname.startsWith('/sign-up');
  
  if (session && isNonAuthRoute) {
    const redirectUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 