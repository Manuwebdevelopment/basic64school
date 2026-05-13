// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(new URL('/login?error=session_exchange', request.url));
  }

  // Redirect back to home after successful OAuth
  return NextResponse.redirect(new URL('/', request.url));
}
