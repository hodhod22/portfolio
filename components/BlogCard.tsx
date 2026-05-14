// components/BlogCard.tsx
import Link from "next/link";
import { Blog } from "@/lib/types";
import { FiClock, FiCalendar, FiTag } from "react-icons/fi";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const date = new Date(blog.publishedAt).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${blog.slug}`}>
      <article className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="h-48 bg-linear-to-br from-blue-500 to-purple-500 overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <FiCalendar className="w-3 h-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="w-3 h-3" />
              {blog.readTime} min läsning
            </span>
          </div>

          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {blog.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
            {blog.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-1"
              >
                <FiTag className="w-2 h-2" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
