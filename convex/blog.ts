import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getAllPublished = query({
  handler: async (ctx) => {
    const blogs = await ctx.db
      .query("blogs")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .order("desc")
      .collect();
    return blogs;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blogs")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
    return blog;
  },
});
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    category: v.string(),
    tags: v.array(v.string()),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const readTime = Math.ceil(args.content.split(" ").length / 200);

    return await ctx.db.insert("blogs", {
      ...args,
      readTime,
      publishedAt: now,
    });
  },
});