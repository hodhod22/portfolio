import { v } from "convex/values";
import { query } from "./_generated/server";
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
