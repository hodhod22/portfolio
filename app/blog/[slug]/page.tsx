import { Metadata } from "next"; // ← Lägg till denna import
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import { FiClock, FiCalendar, FiTag, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const blog = await fetchQuery(api.blog.getBySlug, { slug: params.slug });

    if (!blog) {
      return {
        title: "Blogginlägg ej hittat",
      };
    }

    return {
      title: `${blog.title} | Min Portfolio`,
      description: blog.excerpt,
    };
  } catch {
    return {
      title: "Blogginlägg ej hittat",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const blog = await fetchQuery(api.blog.getBySlug, { slug: params.slug });

    if (!blog) {
      notFound();
    }

    const date = new Date(blog.publishedAt).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <FiArrowLeft />
          Tillbaka till bloggen
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              {blog.readTime} min läsning
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center gap-1"
              >
                <FiTag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {blog.coverImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <article className="prose prose-lg dark:prose-invert max-w-none">
          {blog.content.split("\n").map((paragraph: string, index: number) => {
            if (paragraph.startsWith("# ")) {
              return <h1 key={index}>{paragraph.substring(2)}</h1>;
            }
            if (paragraph.startsWith("## ")) {
              return <h2 key={index}>{paragraph.substring(3)}</h2>;
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={index}>{paragraph.substring(4)}</h3>;
            }
            if (paragraph.trim() === "") {
              return <br key={index} />;
            }
            if (paragraph.startsWith("```")) {
              return (
                <pre
                  key={index}
                  className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto"
                >
                  <code>{paragraph.replace(/```/g, "")}</code>
                </pre>
              );
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}
