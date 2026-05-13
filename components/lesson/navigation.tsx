"use client";

import { useRouter } from 'next/navigation';
import { getPreviousLesson, getNextLesson, getLevelLessons, parseFrontMatter } from '../../lib/lesson-data';
import type { Lesson } from '../../types/lesson';
import styles from './navigation.module.css';

interface LessonNavProps {
  currentLesson: Lesson;
  allLessons: Lesson[];
}

const C64_FRAME = [
  '  ######  C64 BASIC LESSONS    ######',
  '  #                                   #',
  '  #                                   #',
  '# ######  NAVIGATION PANEL    ######',
  '# #                                   #',
  '# ######  NAVIGATION PANEL    ######',
];

export function LessonNavigation({ currentLesson, allLessons }: LessonNavProps) {
  const router = useRouter();
  
  const prevLesson = getPreviousLesson(allLessons, currentLesson.id);
  const nextLesson = getNextLesson(allLessons, currentLesson.id);
  
  return (
    <div className="c64-navigation" style={{ fontFamily: '"C64", "Courier New", monospace' }}>
      <div className="c64-nav-border">
        
        {/* Previous Lesson */}
        <div className="c64-nav-arrow-left">
          <div className="c64-arrow-left">←</div>
          <div className="c64-nav-content">
            <div className="c64-nav-label">PREVIOUS LESSON</div>
            {prevLesson ? (
              <a 
                href={`/lessons/${prevLesson.id}`}
                className="c64-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/lessons/${prevLesson.id}`);
                }}
              >
                <div className="c64-nav-title">{prevLesson.title}</div>
                <div className="c64-nav-level">Level {prevLesson.level}</div>
              </a>
            ) : (
              <div className="c64-nav-empty">No previous lesson</div>
            )}
          </div>
        </div>
        
        {/* Next Lesson */}
        <div className="c64-nav-arrow-right">
          <div className="c64-nav-content">
            {nextLesson ? (
              <a 
                href={`/lessons/${nextLesson.id}`}
                className="c64-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/lessons/${nextLesson.id}`);
                }}
              >
                <div className="c64-nav-title">{nextLesson.title}</div>
                <div className="c64-nav-level">Level {nextLesson.level}</div>
              </a>
            ) : (
              <div className="c64-nav-empty">No next lesson</div>
            )}
          </div>
          <div className="c64-arrow-right">→</div>
        </div>
        
      </div>
    </div>
  );
}

export function LevelNavigation({ currentLesson }: { currentLesson: LessonNavProps['currentLesson'] }) {
  return (
    <div className="c64-level-nav" style={{ fontFamily: '"C64", monospace' }}>
      <div className="c64-level-header">
        <span className="c64-level-icon">🎯</span>
        <span className="c64-level-title">LEVEL {currentLesson.level}</span>
      </div>
      <div className="c64-level-progress">
        <span className="c64-progress-text">
          Current: {currentLesson.title}
        </span>
      </div>
    </div>
  );
}
