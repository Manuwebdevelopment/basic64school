// lib/supabase-server.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  
  return createSupabaseClient<Database, 'public'>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      cookieHelpers: {
        getCookies() {
          const cookiesList = cookieStore.getAll();
          return cookiesList.map(c => ({
            name: c.name,
            value: c.value,
            path: c.path || '/',
            sameSite: c.sameSite ? String(c.sameSite) : undefined,
            secure: c.secure,
            httpOnly: true,
            domain: c.domain || undefined,
            expires: c.maxAge ? new Date(Date.now() + c.maxAge * 1000) : undefined,
          }));
        },
        setCookies(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, ...options }) =>
              cookieStore.set(name, value, {
                ...options,
                httpOnly: true,
              })
            );
          } catch {
            // The `setCookies` method can be called asynchronously while
            // only a single request is made, so we can ignore the error
          }
        },
      },
    }
  );
}

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: number;
          created_at: string;
          is_premium: boolean;
        };
        Insert: {
          id: number;
          created_at?: string;
          is_premium?: boolean;
        };
        Update: {
          id?: number;
          created_at?: string;
          is_premium?: boolean;
        };
      };
      progress: {
        Row: {
          id: number;
          user_id: string;
          lesson_slug: string;
          completed: boolean;
        };
        Insert: {
          id?: number;
          user_id: string;
          lesson_slug: string;
          completed?: boolean;
        };
        Update: {
          id?: number;
          user_id?: string;
          lesson_slug?: string;
          completed?: boolean;
        };
      };
    };
  };
}
