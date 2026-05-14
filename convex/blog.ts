import { v } from "convex/values";
import { query } from "./_generated/server";

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
