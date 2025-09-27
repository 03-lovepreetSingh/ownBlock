import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum requests per window
  keyGenerator?: (request: NextRequest) => string;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  keyGenerator: (request) => {
    // Use IP address as default key
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : (request.headers.get('x-real-ip') || 'unknown');
    return ip;
  },
};

/**
 * Rate limiting middleware
 */
export function rateLimit(config: Partial<RateLimitConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const key = finalConfig.keyGenerator!(request);
    const now = Date.now();
    
    // Clean up expired entries
    for (const [storeKey, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(storeKey);
      }
    }
    
    const entry = rateLimitStore.get(key);
    
    if (!entry || entry.resetTime < now) {
      // Create new entry
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + finalConfig.windowMs,
      });
      return null;
    }
    
    if (entry.count >= finalConfig.max) {
      // Rate limit exceeded
      return NextResponse.json(
        { 
          error: 'Too many requests',
          retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((entry.resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': finalConfig.max.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(entry.resetTime).toISOString(),
          },
        }
      );
    }
    
    // Increment counter
    entry.count++;
    
    // Add rate limit headers to response
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', finalConfig.max.toString());
    response.headers.set('X-RateLimit-Remaining', (finalConfig.max - entry.count).toString());
    response.headers.set('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());
    
    return response;
  };
}

/**
 * Stricter rate limit for sensitive operations
 */
export const strictRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 requests per 5 minutes
});

/**
 * Authentication-specific rate limit
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  keyGenerator: (request) => {
    // Use IP + user agent for auth attempts
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : (request.headers.get('x-real-ip') || 'unknown');
    const userAgent = request.headers.get('user-agent') || 'unknown';
    return `${ip}:${userAgent}`;
  },
});