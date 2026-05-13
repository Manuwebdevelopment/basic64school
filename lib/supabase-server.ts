// lib/supabase-server.ts
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createClient(): Promise<SupabaseClient> {
  const cookieStore = await cookies();
  
  return createClient<Database, 'public'>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method can be called asynchronously while
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
