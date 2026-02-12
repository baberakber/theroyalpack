import { NextRequest } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum requests per window
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

// In-memory rate limit store
// Note: This resets on server restart. For production, consider using Redis (e.g., @upstash/ratelimit)
const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up expired entries periodically to prevent memory leaks
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

/**
 * Simple in-memory rate limiter
 *
 * @param request - NextRequest object
 * @param options - Rate limit configuration
 * @returns RateLimitResult with success status and remaining requests
 */
export async function rateLimit(
  request: NextRequest,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  // Run cleanup
  cleanup();

  // Get client identifier (IP address)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() :
             request.headers.get('x-real-ip') ||
             'unknown';

  // Create a unique key combining IP and endpoint
  const endpoint = request.nextUrl.pathname;
  const key = `${ip}:${endpoint}`;

  const now = Date.now();
  const record = rateLimitMap.get(key);

  // First request or window expired
  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    rateLimitMap.set(key, newRecord);
    return {
      success: true,
      remaining: options.max - 1,
      resetTime: newRecord.resetTime,
    };
  }

  // Check if limit exceeded
  if (record.count >= options.max) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  // Increment count
  record.count++;
  return {
    success: true,
    remaining: options.max - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Rate limit by a raw IP string (for use outside NextRequest, e.g. NextAuth)
 */
export async function rateLimitByIp(
  ip: string,
  endpoint: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  cleanup();

  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    rateLimitMap.set(key, newRecord);
    return {
      success: true,
      remaining: options.max - 1,
      resetTime: newRecord.resetTime,
    };
  }

  if (record.count >= options.max) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return {
    success: true,
    remaining: options.max - record.count,
    resetTime: record.resetTime,
  };
}

// Rate limit configurations for different endpoints
export const rateLimitConfigs = {
  quote: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 requests per hour
  },
  sample: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests per hour
  },
  contact: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 requests per hour
  },
  login: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per 15 minutes
  },
} as const;
