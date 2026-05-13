/**
 * Lesson Index - Server-side only file system access for reading lessons.
 * This module MUST NOT be imported from client components ("use client").
 */

import { parseFrontMatter, extractLessonContent, getLessonBySlug, parseLesson } from './lesson-data';
import type { Lesson } from '../types/lesson';

// Runtime fs import (dynamic) to avoid bundling in client bundles
const fs = await import('node:fs');
const path = await import('node:path');
const url = await import('node:url');

function getLessonsPath(): string {
  const dir = path.default.dirname(url.default.fileURLToPath(import.meta.url));
  return path.default.join(dir, '../../data/lessons');
}

export function readLessons(): Lesson[] {
  const lessonsPath = getLessonsPath();
  
  if (!fs.default.existsSync(lessonsPath)) {
    return [];
  }

  const lessonFiles: string[] = [];
  
  const levelDirs = fs.default.readdirSync(lessonsPath);
  
  for (const levelDir of levelDirs) {
    const levelPath = path.default.join(lessonsPath, levelDir);
    
    if (!fs.default.existsSync(levelPath)) continue;
    if (levelDir.startsWith('.') || levelDir === 'README') continue;
    
    const lessonFilesInLevel = fs.default.readdirSync(levelPath);
    
    for (const file of lessonFilesInLevel) {
      const filePath = path.default.join(levelPath, file);
      const isDirectory = fs.default.statSync(filePath).isDirectory();
      
      if (isDirectory && file.startsWith('03-') && file.endsWith('-')) {
        const childFiles = fs.default.readdirSync(filePath);
        for (const childFile of childFiles) {
          if (childFile.endsWith('.md')) {
            lessonFiles.push(path.default.join(lessonsPath, levelDir, file, childFile));
          }
        }
      } else if (file.endsWith('.md')) {
        lessonFiles.push(filePath);
      }
    }
  }

  const lessons: Lesson[] = [];
  
  for (const filePath of lessonFiles) {
    try {
      const content = fs.default.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontMatter(content);
      
      if (!frontmatter) {
        console.error(`Could not parse frontmatter for: ${filePath}`);
        continue;
      }

      const slug = getLessonSlug(filePath);
      
      lessons.push({
        ...frontmatter,
        id: slug,
        filePath,
        title: frontmatter.title || path.default.basename(filePath, '.md'),
        body: extractLessonContent(content, frontmatter),
      });
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
    }
  }

  lessons.sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    const aNum = parseInt(a.lessonNumber.padStart(3, '0'), 10);
    const bNum = parseInt(b.lessonNumber.padStart(3, '0'), 10);
    if (aNum !== bNum) return aNum - bNum;
    return a.filePath.localeCompare(b.filePath);
  });

  return lessons;
}

export function getLessonSlug(filePath: string): string {
  const lessonsPath = getLessonsPath();
  const relPath = path.default.relative(lessonsPath, filePath).replace(/\\/g, '/').replace(/\.md$/, '');
  return relPath;
}

// Re-export for compatibility with server components that import from lesson-index
export { getLessonBySlug, parseLesson, parseFrontMatter, extractLessonContent } from './lesson-data';

