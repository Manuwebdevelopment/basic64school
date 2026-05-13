export interface Lesson {
  id: string;
  filePath: string;
  title: string;
  level: number;
  lessonNumber: string;
  estimatedTime: string;
  prerequisites: string;
  concepts: string;
  body: string;
}

export interface FrontMatter {
  title: string;
  level: number;
  lessonNumber: string;
  estimatedTime: string;
  prerequisites: string;
  concepts: string;
}
