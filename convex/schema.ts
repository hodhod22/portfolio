import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Blogg-tabell
  blogs: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    category: v.string(),
    publishedAt: v.number(),
    readTime: v.number(),
    tags: v.array(v.string()),
    isPublished: v.boolean(),
  }),

  // Projekt-tabell
  projects: defineTable({
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    technologies: v.array(v.string()),
    category: v.string(),
    imageUrl: v.string(),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    featured: v.boolean(),
    completedAt: v.number(),
  }),

  // Chat/Messages-tabell - DETTA SAKNADES
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    createdAt: v.number(),
  }),
});
