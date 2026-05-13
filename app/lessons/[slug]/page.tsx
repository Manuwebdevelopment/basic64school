import { getLessonBySlug, readLessons } from "@/lib/lesson-index";
import { renderLessonContent, parseLesson } from "@/components/lesson/renderer";
import { LessonNavigation } from "@/components/lesson/navigation";
import { TryItButton } from "@/components/lesson/TryItButton";
import MarkLessonComplete from "@/components/lesson/CompleteLesson";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { notFound } from "next/navigation";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

async function getLessonPage(slug: string) {
  const allLessons = readLessons();
  const lesson = getLessonBySlug(slug, allLessons);
  
  if (!lesson) {
    return { lesson: null };
  }

  const rawContent = fs.readFileSync(lesson.filePath, "utf-8");
  const parsed = parseLesson(rawContent, lesson.filePath);
  const renderedBody = renderLessonContent(parsed.body);

  const prevLesson = allLessons.find(
    (l, i) => i > 0 && allLessons[i - 1].id === slug
  );
  const nextLesson = allLessons.find(
    (l, i) => i < allLessons.length - 1 && allLessons[i + 1].id === slug
  );

  return { 
    lesson: { ...lesson, body: renderedBody, content: rawContent }, 
    prevLesson, 
    nextLesson,
    allLessons 
  };
}

export function generateStaticParams() {
  const lessons = readLessons();
  return lessons.map((lesson) => ({
    slug: lesson.id,
  }));
}

export async function generateMetadata({ params }: LessonPageProps): Promise<{
  title: string;
  description: string;
}> {
  const { slug } = await params;
  const allLessons = readLessons();
  const lesson = getLessonBySlug(slug, allLessons);
  const title = lesson 
    ? `${lesson.title} — Basic64 School`
    : "Lesson Not Found — Basic64 School";
  
  return {
    title,
    description: lesson 
      ? `Level ${lesson.level}: ${lesson.concepts}. Learn C64 BASIC step by step.`
      : "The requested lesson could not be found.",
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const { lesson, prevLesson, nextLesson, allLessons } = await getLessonPage(slug);

  if (!lesson) {
    notFound();
  }

  // Auth check for levels 3-6
  const isPremiumContent = lesson.level >= 3;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const currentUser = session?.user;

  if (isPremiumContent && !currentUser) {
    return (
      <div className="c64-lesson-page">
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <h1 style={{ fontFamily: "'Press Start 2P', monospace", color: "#ffd700", fontSize: "1rem" }}>
            &#128274; PREMIUM CONTENT
          </h1>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: "1.3rem", color: "#00ff00", marginTop: "1.5rem" }}>
            This lesson is available to Premium subscribers.
          </p>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: "1.2rem", color: "#888" }}>
            Login or upgrade to unlock all 42 lessons (Levels 3-6) for just $25.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/login" className="btn c64-green-btn" style={{ marginTop: "1rem", display: "inline-block" }}>
              &#x2795; LOGIN
            </Link>
            <Link href="/premium" className="btn c64-green-btn" style={{ marginTop: "1rem", display: "inline-block", marginLeft: "1rem" }}>
              &#9650; UPGRADE TO PREMIUM
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="c64-lesson-page">
      {isPremiumContent ? (
        // Premium gate screen
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <h1 style={{ fontFamily: "'Press Start 2P', monospace", color: "#ffd700", fontSize: "1rem" }}>
            &#128274; PREMIUM CONTENT
          </h1>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: "1.3rem", color: "#00ff00", marginTop: "1.5rem" }}>
            This lesson is available to Premium subscribers.
          </p>
          <p style={{ fontFamily: "'VT323', monospace", fontSize: "1.2rem", color: "#888" }}>
            Upgrade to unlock all 42 lessons (Levels 0-6) for just $25.
          </p>
          <Link href="/premium" className="btn c64-green-btn" style={{ marginTop: "2rem", display: "inline-block" }}>
            &#9650; UPGRADE TO PREMIUM
          </Link>
        </div>
      ) : (
        // Normal lesson content
        <>
          {/* Top bar */}
          <div className="c64-lesson-topbar">
            <Link href="/syllabus" className="c64-lesson-back-link">
              ← Back to Syllabus
            </Link>
            <span className="c64-lesson-level-badge">Level {lesson.level}</span>
            <span className="c64-lesson-meta">
              Lesson {lesson.lessonNumber} · {lesson.estimatedTime}
            </span>
          </div>

          {/* Title */}
          <div className="c64-lesson-header">
            <h1 className="c64-lesson-title">
              <span className="c64-lesson-number">{lesson.lessonNumber}.</span>{" "}
              {lesson.title}
            </h1>
            <div className="c64-lesson-concepts">
              Key concepts: {lesson.concepts}
            </div>
          </div>

          {/* Content */}
          <div 
            className="c64-lesson-body" 
            dangerouslySetInnerHTML={{ __html: lesson.body }} 
          />

          {/* Try-It Button */}
          <div className="c64-lesson-tryit">
            <TryItButton code={lesson.content?.substring(0, 500) || ""} />
          </div>

          {/* Navigation */}
          {prevLesson || nextLesson ? (
            <div className="c64-lesson-nav">
              <LessonNavigation
                currentLesson={lesson}
                allLessons={allLessons}
              />
            </div>
          ) : null}

          {/* Footer hint */}
          <div className="c64-lesson-footer">
            <div className="c64-lesson-c64-art">
{`  +-----READY-----+
  |               |
  | > _           |
  +---------------+`}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
