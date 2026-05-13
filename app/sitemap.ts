import type { MetadataRoute } from "next";

import { readLessons } from "@/lib/lesson-index";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://basic64school.com";
  const lessons = readLessons();

  const lessonPages: MetadataRoute.Sitemap = lessons.map((lesson) => ({
    url: `${baseUrl}/lessons/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/syllabus`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/game`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.6 },
    ...lessonPages,
  ];
}
