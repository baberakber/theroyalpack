import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimitByIp, rateLimitConfigs } from '@/lib/rate-limit';

const nextAuth = NextAuth(authOptions);

async function handler(req: NextRequest) {
  // Apply rate limiting only to POST (login) requests
  if (req.method === 'POST') {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded
      ? forwarded.split(',')[0].trim()
      : req.headers.get('x-real-ip') || 'unknown';

    const { success, remaining } = await rateLimitByIp(
      ip,
      'auth-login',
      rateLimitConfigs.login
    );

    if (!success) {
      console.warn(
        `[AUTH] Rate limited login attempt from IP: ${ip} at ${new Date().toISOString()}`
      );
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Log login attempt (without sensitive data)
    console.info(
      `[AUTH] Login attempt from IP: ${ip}, remaining: ${remaining}, at ${new Date().toISOString()}`
    );
  }

  return nextAuth(req);
}

export { handler as GET, handler as POST };
