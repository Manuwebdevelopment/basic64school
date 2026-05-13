// lib/progress.ts
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

export async function saveProgress(userId: string, lessonSlug: string): Promise<boolean> {
  const { error } = await supabase
    .from('progress')
    .upsert(
      { user_id: userId, lesson_slug: lessonSlug, completed: true },
      { onConflict: 'user_id,lesson_slug' }
    );
  return !error;
}

export async function getProgress(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('progress')
    .select('lesson_slug')
    .eq('user_id', userId)
    .eq('completed', true);
  if (error) return [];
  return data.map(r => r.lesson_slug);
}
