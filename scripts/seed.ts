import { mutation } from "./_generated/server";

export const seed = mutation({
  handler: async (ctx) => {
    // Rensa befintliga projekt
    const existingProjects = await ctx.db.query("projects").collect();
    for (const project of existingProjects) {
      await ctx.db.delete(project._id);
    }

    // Rensa befintliga bloggar
    const existingBlogs = await ctx.db.query("blogs").collect();
    for (const blog of existingBlogs) {
      await ctx.db.delete(blog._id);
    }

    // Lägg till demo-projekt
    const projects = [
      {
        title: "AI-Powered Task Manager",
        slug: "ai-task-manager",
        description:
          "Smart task management app with AI-powered prioritization.",
        technologies: ["Next.js 15", "TypeScript", "Convex", "OpenAI API"],
        category: "fullstack",
        imageUrl:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600",
        githubUrl: "https://github.com/yourusername/ai-task-manager",
        liveUrl: "https://demo.com",
        featured: true,
        completedAt: Date.now(),
      },
      {
        title: "E-commerce Platform",
        slug: "ecommerce-platform",
        description: "Modern e-commerce platform with cart and checkout.",
        technologies: ["Next.js 14", "TypeScript", "Stripe", "PostgreSQL"],
        category: "webapp",
        imageUrl:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
        githubUrl: "https://github.com/yourusername/ecommerce-platform",
        liveUrl: "https://demo.com",
        featured: true,
        completedAt: Date.now(),
      },
      {
        title: "Real-time Dashboard",
        slug: "realtime-dashboard",
        description: "Analytics dashboard with live data updates.",
        technologies: ["Next.js", "Convex", "Chart.js", "Tailwind CSS"],
        category: "webapp",
        imageUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        githubUrl: "https://github.com/yourusername/realtime-dashboard",
        liveUrl: "https://demo.com",
        featured: true,
        completedAt: Date.now(),
      },
    ];

    for (const project of projects) {
      await ctx.db.insert("projects", project);
    }

    // Lägg till demo-bloggar
    const blogs = [
      {
        title: "Why Next.js 15 is a Game Changer",
        slug: "why-nextjs-15-game-changer",
        excerpt:
          "The new features in Next.js 15 including Turbopack and Server Actions make it the best framework for modern web apps.",
        content:
          "# Why Next.js 15 is a Game Changer\n\nNext.js 15 has arrived with groundbreaking features...",
        category: "Next.js",
        tags: ["Next.js", "React", "Performance"],
        coverImage:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
        publishedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        readTime: 5,
        isPublished: true,
      },
      {
        title: "Mastering TypeScript: Advanced Patterns",
        slug: "mastering-typescript-advanced-patterns",
        excerpt:
          "Take your TypeScript skills to the next level with advanced patterns.",
        content:
          "# Mastering TypeScript\n\nTypeScript has become the standard...",
        category: "TypeScript",
        tags: ["TypeScript", "Advanced", "Best Practices"],
        coverImage:
          "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
        publishedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
        readTime: 8,
        isPublished: true,
      },
    ];

    for (const blog of blogs) {
      await ctx.db.insert("blogs", blog);
    }

    return {
      success: true,
      projectsAdded: projects.length,
      blogsAdded: blogs.length,
    };
  },
});
