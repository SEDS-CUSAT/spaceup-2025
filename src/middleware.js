import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-this';

export async function middleware(request) {
  // Only run on admin routes
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/admin')) {
    
    // Allow login endpoint
    if (request.nextUrl.pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // If API request, return 401
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // If page request, return 401 or redirect (but for a SPA/React page usually we handle it in frontend, 
      // however strict security implies redirection. Let's just return 401/Login UI if it's the admin page?)
      // Actually, if we are loading /admin, and no token, we probably want to let the Page load 
      // so the Client Component can show the Login Form.
      // BUT the user asked for "verify the token, if any issue ... instant log out". 
      // A common pattern is: Allow /admin (the page) to load (it will check auth via API), 
      // but PROTECT all /api/admin/* except login.
      // OR, redirect to /admin/login (if we had a separate login page).
      // Since /admin *IS* the login page (conditionally), we should probably ALLOW /admin to render
      // but protect /api/admin routes rigidly.
      
      // Let's refine the logic:
      // Secure the DATA/API.
      // The frontend /admin checks if it can fetch data.
      return NextResponse.next();
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware auth error:', error);
      
      // Token invalid/expired
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
      
      // If it's a page visit with bad token, we could redirect or just delete cookie
      const response = NextResponse.next();
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
