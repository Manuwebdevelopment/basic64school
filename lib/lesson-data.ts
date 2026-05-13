/**
 * Lesson Data Helpers - Pure functions for parsing and processing lesson data.
 * This module has NO Node.js dependencies and can be safely imported on the client.
 */

import type { Lesson } from '../types/lesson';

export interface FrontMatter {
  title: string;
  level: number;
  lessonNumber: string;
  estimatedTime: string;
  prerequisites: string;
  concepts: string;
}

export function parseFrontMatter(content: string): FrontMatter | null {
  const metadataMatch = content.match(/^## Metadata[^]*?###/s);
  
  if (!metadataMatch) {
    return null;
  }

  const metadataBlock = metadataMatch[0];
  
  const frontmatter: FrontMatter = {
    title: '',
    level: 0,
    lessonNumber: '0',
    estimatedTime: '30 min',
    prerequisites: 'None',
    concepts: 'Basic concepts',
  };

  const lines = metadataBlock.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine === '## Metadata') continue;
    if (trimmedLine === '###') continue;
    
    const pipeIndex = trimmedLine.indexOf('|');
    if (pipeIndex === -1) continue;

    const keyPart = trimmedLine.substring(1, pipeIndex).trim();
    const valuePart = trimmedLine.substring(pipeIndex + 2).trim();

    if (keyPart.includes('**Level**')) {
      frontmatter.level = parseInt(valuePart.replace(/\*/g, '').trim(), 10);
    } else if (keyPart.includes('Lesson Number')) {
      frontmatter.lessonNumber = valuePart.replace(/\*/g, '').trim();
    } else if (keyPart.includes('Estimated Time')) {
      frontmatter.estimatedTime = valuePart.replace('*', '').trim();
    } else if (keyPart.includes('Prerequisites')) {
      frontmatter.prerequisites = valuePart.replace('*', '').trim();
    } else if (keyPart.includes('Concepts')) {
      frontmatter.concepts = valuePart.replace('*', '').trim();
    }
  }

  return frontmatter;
}

export function extractLessonContent(content: string, frontmatter: FrontMatter): string {
  const metadataEnd = content.indexOf('## C64 BASIC Examples') < 0 ? content.indexOf('###') : content.indexOf('## C64 BASIC Examples');
  if (metadataEnd === -1) {
    return content.substring(frontmatter.title.length + 2).trim();
  }
  
  const start = content.indexOf('## Theory');
  const end = content.indexOf('## Summary');
  
  if (start !== -1 && end !== -1) {
    return content.substring(start, end).trim();
  }
  
  return content.substring(start || 0).trim();
}

export function parseLesson(content: string, filePath: string): Lesson {
  const frontmatter = parseFrontMatter(content) || {
    title: '', level: 0, lessonNumber: '0',
    estimatedTime: '30 min', prerequisites: 'None', concepts: ''
  };
  const slug = getLessonSlug(filePath);
  return {
    ...frontmatter,
    id: slug,
    filePath,
    title: frontmatter.title || filePath,
    body: extractLessonContent(content, frontmatter),
  };
}

// --- Client-safe navigation helpers (no filesystem access) ---

export function getLessonBySlug(slug: string, allLessons: Lesson[]): Lesson | null {
  return allLessons.find(lesson => lesson.id === slug) || null;
}

export function getPreviousLesson(lessons: Lesson[], currentSlug: string): Lesson | null {
  const index = lessons.findIndex(l => l.id === currentSlug);
  if (index === -1 || index === 0) return null;
  return lessons[index - 1];
}

export function getNextLesson(lessons: Lesson[], currentSlug: string): Lesson | null {
  const index = lessons.findIndex(l => l.id === currentSlug);
  if (index === -1 || index === lessons.length - 1) return null;
  return lessons[index + 1];
}

export function getLevelLessons(lessons: Lesson[], level: number): Lesson[] {
  return lessons.filter(l => l.level === level);
}

export function getLessonSequence(lessons: Lesson[]): Lesson[] {
  return lessons;
}

export function getAllLessonsLevel(lessons: Lesson[], level: number): Lesson[] {
  return lessons.filter(lesson => lesson.level === level);
}

export function getLessonSlug(filePath: string): string {
  // Convert file path like data/lessons/1-basics/01-Hello-World.md to 1-basics/01-hello-world
  const parts = filePath.split('/');
  // Remove leading 'data', 'lessons' or similar root segments
  let relParts = parts;
  const idx = parts.findIndex(p => p === 'data' || p === 'lessons');
  if (idx >= 0) relParts = parts.slice(idx + 1);
  
  // Convert to slug: directory + filename without .md
  const relPath = relParts.map(p => p.replace('.md', '')).join('/');
  return relPath;
}
