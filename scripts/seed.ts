// scripts/seed.ts
// VIKTIGT: Importera från convex-mappen, inte från ./_generated/server
import { fetchMutation } from "convex/nextjs";
import { api } from "../convex/_generated/api";

// Demo-projekt
const projects = [
  {
    title: "AI-Powered Task Manager",
    slug: "ai-task-manager",
    description: "Smart task management app with AI-powered prioritization.",
    longDescription:
      "A full-stack task management application that uses AI to automatically prioritize tasks.",
    technologies: ["Next.js 15", "TypeScript", "Convex", "OpenAI API"],
    category: "fullstack",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600",
    githubUrl: "https://github.com/yourusername/ai-task-manager",
    liveUrl: "https://demo.com",
    featured: true,
    completedAt: Date.now(),
  },
  {
    title: "E-commerce Platform",
    slug: "ecommerce-platform",
    description: "Modern e-commerce platform with cart and checkout.",
    longDescription:
      "Complete e-commerce solution with product catalog and Stripe integration.",
    technologies: ["Next.js 14", "TypeScript", "Stripe", "PostgreSQL"],
    category: "webapp",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://demo.com",
    featured: true,
    completedAt: Date.now(),
  },
  {
    title: "Real-time Dashboard",
    slug: "realtime-dashboard",
    description: "Analytics dashboard with live data updates.",
    longDescription:
      "Real-time analytics dashboard for monitoring business metrics.",
    technologies: ["Next.js", "Convex", "Chart.js", "Tailwind CSS"],
    category: "webapp",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    githubUrl: "https://github.com/yourusername/realtime-dashboard",
    liveUrl: "https://demo.com",
    featured: true,
    completedAt: Date.now(),
  },
];

// Demo-bloggar
const blogs = [
  {
    title: "Why Next.js 15 is a Game Changer",
    slug: "why-nextjs-15-game-changer",
    excerpt:
      "The new features in Next.js 15 including Turbopack and Server Actions make it the best framework.",
    content: `# Why Next.js 15 is a Game Changer

Next.js 15 has arrived with groundbreaking features that every frontend developer should know about.

## 🚀 Turbopack (Stable)

The biggest news is that Turbopack is now stable for development. This Rust-based bundler is **700x faster** than Webpack.

## ⚡ Server Actions (Stable)

Server Actions allow you to mutate data directly from client components without creating API routes.

\`\`\`typescript
// app/actions.ts
'use server'
 
export async function createPost(formData: FormData) {
  const title = formData.get('title')
  await db.post.create({ data: { title } })
}
\`\`\`

## 🎯 What This Means for Developers

If you haven't tried Next.js 15 yet, now is the perfect time to start!`,
    category: "Next.js",
    tags: ["Next.js", "React", "Performance"],
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    publishedAt: Date.now(),
    readTime: 5,
    isPublished: true,
  },
  {
    title: "Mastering TypeScript: Advanced Patterns",
    slug: "mastering-typescript-advanced-patterns",
    excerpt:
      "Take your TypeScript skills to the next level with advanced patterns.",
    content: `# Mastering TypeScript: Advanced Patterns

TypeScript has become the standard for modern web development.

## 🔧 Conditional Types

Conditional types allow you to create types that depend on other types.

\`\`\`typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>;  // true
type B = IsArray<number>;     // false
\`\`\`

## 🛡️ Type Guards

Create custom type guards for complex type checking.

\`\`\`typescript
interface Cat { meow: () => void }
interface Dog { bark: () => void }

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}
\`\`\`

Master these patterns and your TypeScript code will be more robust!`,
    category: "TypeScript",
    tags: ["TypeScript", "Advanced", "Best Practices"],
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    publishedAt: Date.now(),
    readTime: 8,
    isPublished: true,
  },
];

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Lägg till projekt
    console.log("📦 Adding projects...");
    for (const project of projects) {
      try {
        // Använd rätt mutation - kontrollera vad som finns i din Convex-backend
        const result = await fetchMutation(api.projects.add, project);
        console.log(`✅ Added project: ${project.title}`, result);
      } catch (err) {
        console.error(`❌ Failed to add project ${project.title}:`, err);
      }
    }

    // Lägg till bloggar
    console.log("📝 Adding blogs...");
    for (const blog of blogs) {
      try {
        const result = await fetchMutation(api.blog.add, blog);
        console.log(`✅ Added blog: ${blog.title}`, result);
      } catch (err) {
        console.error(`❌ Failed to add blog ${blog.title}:`, err);
      }
    }

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}

// Kör seed-funktionen
seed();
