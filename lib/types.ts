// lib/types.ts
import { Id } from "@/convex/_generated/dataModel";

// Projekt-typ
export interface Project {
  _id: Id<"projects">;
  _creationTime: number;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  completedAt: number;
}

// Blogg-typ
export interface Blog {
  _id: Id<"blogs">;
  _creationTime: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  publishedAt: number;
  readTime: number;
  tags: string[];
  isPublished: boolean;
}

// Chat-meddelande-typ
export interface Message {
  _id: Id<"messages">;
  _creationTime: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: number;
}
