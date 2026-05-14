import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Hämta alla projekt med valfri kategorifilter
export const getAll = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category && args.category !== "all") {
      return await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("category"), args.category))
        .collect();
    }
    return await ctx.db.query("projects").collect();
  },
});

// Hämta featured projects
export const getFeatured = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

// Hämta unika kategorier - DENNA MÅSTE FINNAS
export const getCategories = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    const categories = [...new Set(projects.map((p) => p.category))];
    return categories;
  },
});
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    technologies: v.array(v.string()),
    category: v.string(),
    imageUrl: v.string(),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      ...args,
      completedAt: Date.now(),
    });
  },
});
