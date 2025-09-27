import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = [
  '/api/users/me',
  '/api/investments',
  '/api/order-book',
  '/api/dividend-payments/me',
];

const adminRoutes = [
  { path: '/api/properties', methods: ['POST'] }, // Only POST requires admin
  { path: '/api/kyc', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
  { path: '/api/dividends', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
  { path: '/api/dividend-payments', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
];

const publicRoutes = [
  { path: '/api/properties', methods: ['GET'] }, // GET properties is public
  '/api/properties/', // Individual property endpoints are public
  '/api/property-tokens/',
];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const method = request.method;
  
  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (typeof route === 'string') {
      return pathname.startsWith(route);
    }
    return pathname === route.path && route.methods.includes(method);
  });
  
  // Allow public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if route is admin
  const isAdminRoute = adminRoutes.some(route => {
    if (typeof route === 'string') {
      return pathname.startsWith(route);
    }
    return pathname.startsWith(route.path) && route.methods.includes(method);
  });
  
  // Handle protected routes
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
  }
  
  // Handle admin routes
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user is admin (role stored in token)
    if (token.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
};