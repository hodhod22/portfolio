"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/types";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projects = useQuery(api.projects.getAll, {
    category: selectedCategory,
  });
  const categories = useQuery(api.projects.getCategories);
  const featured = useQuery(api.projects.getFeatured);

  if (projects === undefined || categories === undefined) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Laddar projekt...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mina Projekt
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Här är ett urval av projekt jag byggt med Next.js, TypeScript och
          modern teknik
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Alla
        </button>
        {categories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid/List */}
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400">
            Inga projekt i denna kategori ännu.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {projects.map((project: Project) => (
            <ProjectCard
              key={project._id}
              project={project}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Featured count - endast för utveckling */}
      {featured && (
        <div className="mt-8 text-center text-sm text-gray-500">
          ⭐ Utvalda projekt: {featured.length}
        </div>
      )}
    </div>
  );
}
