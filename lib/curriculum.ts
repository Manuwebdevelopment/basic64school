/**
 * Curriculum Index
 * Maps all lessons and tracks into a structured curriculum for the app
 */

import { readLessons } from './lesson-index';

export interface CurriculumLesson {
  id: string;
  title: string;
  level: number;
  lessonNumber: string;
  estimatedTime: string;
  concepts: string;
  prerequisites: string;
}

export interface CurriculumLevel {
  title: string;
  icon: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumTrack {
  name: string;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

const LEVELS: Record<number, CurriculumLevel> = {
  0: { title: 'Level 0: Welcome to the C64', icon: '🖥️', lessons: [] },
  1: { title: 'Level 1: BASIC Basics', icon: '📝', lessons: [] },
  2: { title: 'Level 2: Memory & Color', icon: '🎨', lessons: [] },
  3: { title: 'Level 3: Sprites', icon: '👾', lessons: [] },
  4: { title: 'Level 4: Sound & Input', icon: '🎵', lessons: [] },
  5: { title: 'Level 5: Effects & Data', icon: '✨', lessons: [] },
  6: { title: 'Level 6: Full Game Dev', icon: '🏆', lessons: [] },
};

const TRACKS: Record<string, CurriculumTrack> = {
  games: {
    name: 'games',
    title: 'Game Development Track',
    description: 'Build classic C64 games from scratch',
    lessons: [],
  },
  'creative-coding': {
    name: 'creative-coding',
    title: 'Creative Coding Track',
    description: 'Explore demoscene art, generative patterns, and visual effects',
    lessons: [],
  },
  'systems-tools': {
    name: 'systems-tools',
    title: 'Systems & Tools Track',
    description: 'Master memory, color, and hardware tricks',
    lessons: [],
  },
};

// Build curriculum from actual lesson data
export function buildCurriculum() {
  const lessons = readLessons();

  // Group lessons by level
  lessons.forEach((lesson) => {
    const levelData = LEVELS[lesson.level];
    if (levelData) {
      levelData.lessons.push({
        id: lesson.id,
        title: lesson.title,
        level: lesson.level,
        lessonNumber: lesson.lessonNumber,
        estimatedTime: lesson.estimatedTime,
        concepts: lesson.concepts,
        prerequisites: lesson.prerequisites,
      });
    }
  });

  // For tracks, assign lessons (simplified mapping)
  const trackLessonMap: Record<string, string[]> = {
    games: [
      '03-1-what-is-a-sprite',
      '03-2-defining-your-sprite',
      '03-3-positioning-your-sprite',
      '03-4-moving-sprites',
      '03-5-h-move-sprites',
      '03-6-sprites-vs-poke',
      '03-7-level-3-capstone',
      '06-1-state-machines',
      '06-2-scoring-systems',
      '06-3-difficulty-escalation',
      '06-4-polish-techniques',
      '06-5-capstone-full-game',
    ],
    'creative-coding': [
      '00-welcome',
      '01-welcome',
      '02-expressions',
      '03-input-print',
      '04-if-then-goto',
      '05-for-next',
      '06-arrays-dim',
      '07-strings',
      '08-gosub-return',
      '09-guess-the-number',
      '05-5-capstone-text-effects',
    ],
    'systems-tools': [
      '00-overview',
      '01-memory-map',
      '02-poke-screen',
      '03-color-ram',
      '04-petscii-codes',
      '05-text-ui',
      '03-1-what-is-a-sprite',
      '04-1-sid-basics',
      '04-2-playing-melodies',
      '04-3-keyboard-input',
      '04-4-joystick-input',
      '04-5-timing-and-fps',
    ],
  };

  const allLessons = Object.values(LEVELS).flatMap((l) => l.lessons);
  Object.entries(trackLessonMap).forEach(([trackName, lessonIds]) => {
    const track = TRACKS[trackName];
    if (track) {
      track.lessons = allLessons.filter((l) => lessonIds.includes(l.id));
    }
  });

  return { levels: LEVELS, tracks: TRACKS };
}

// Pre-built curriculum data (will be populated at runtime)
export const curriculum = buildCurriculum();
