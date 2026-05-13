"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { saveProgress } from '@/lib/progress';
import styles from './CompleteLesson.module.css';

interface CompleteLessonProps {
  lessonSlug: string;
  alreadyCompleted?: boolean;
}

export default function CompleteLesson({ lessonSlug, alreadyCompleted = false }: CompleteLessonProps) {
  const { user, isPremium } = useAuth();
  const [completed, setCompleted] = useState(alreadyCompleted);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);
    const ok = await saveProgress(user.id, lessonSlug);
    if (ok) setCompleted(true);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${completed ? styles.done : ''}`}
        onClick={handleComplete}
        disabled={completed || loading || !user}
      >
        {loading
          ? 'Saving...'
          : completed
            ? '&#10003; Lesson Complete'
            : !user
              ? 'Login to save progress'
              : '&#9733; Mark Lesson Complete'
        }
      </button>
    </div>
  );
}
