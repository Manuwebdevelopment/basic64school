// lib/supabase-server.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function createClient() {
  return createSupabaseClient<Database, 'public'>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
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
