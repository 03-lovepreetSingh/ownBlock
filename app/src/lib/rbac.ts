import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { errorResponse } from '@/lib/api-response';

export interface TokenWithRole {
  id: string;
  email: string;
  role?: string;
  [key: string]: any;
}

/**
 * Check if user has required role
 */
export function hasRole(token: TokenWithRole | null, requiredRole: string): boolean {
  if (!token) return false;
  return token.role === requiredRole;
}

/**
 * Check if user has any of the required roles
 */
export function hasAnyRole(token: TokenWithRole | null, roles: string[]): boolean {
  if (!token) return false;
  return roles.includes(token.role || '');
}

/**
 * Middleware helper to check authentication and roles
 */
export async function checkAuthAndRole(
  request: NextRequest,
  requiredRole?: string
): Promise<{ token: TokenWithRole | null; response: NextResponse | null }> {
  const token = await getToken({ req: request }) as TokenWithRole | null;
  
  if (!token) {
    return {
      token: null,
      response: NextResponse.json(errorResponse('Authentication required'), { status: 401 })
    };
  }
  
  if (requiredRole && !hasRole(token, requiredRole)) {
    return {
      token: null,
      response: NextResponse.json(errorResponse('Insufficient permissions'), { status: 403 })
    };
  }
  
  return { token, response: null };
}

/**
 * Role-based route protection
 */
export function protectRoute(requiredRole?: string) {
  return async (request: NextRequest) => {
    const { token, response } = await checkAuthAndRole(request, requiredRole);
    
    if (response) {
      return response;
    }
    
    // Add user info to headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', token!.id);
    requestHeaders.set('x-user-email', token!.email);
    if (token!.role) {
      requestHeaders.set('x-user-role', token!.role);
    }
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  };
}

/**
 * Admin-only route protection
 */
export const adminOnly = protectRoute('admin');

/**
 * User-only route protection (authenticated users)
 */
export const authenticatedOnly = protectRoute();