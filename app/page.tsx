import { Metadata } from "next"; // ← Lägg till denna import
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import DemoApp from "@/components/DemoApp";
import Contact from "@/components/Contact";
import CVButton from "@/components/CVButton";
import ProjectCard from "@/components/ProjectCard";
import { Doc } from "@/convex/_generated/dataModel";

export const metadata: Metadata = {
  title: "Min Portfolio | Frontend-utvecklare",
  description:
    "Portfolio för en frontend-utvecklare specialiserad på Next.js, TypeScript och modern webbutveckling.",
};

export default async function Home() {
  const featuredProjects = await fetchQuery(api.projects.getFeatured);

  return (
    <>
      <Hero />

      <section className="text-center py-12 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4">
          <CVButton />
        </div>
      </section>

      <TechStack />

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Utvalda Projekt
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Några av mina bästa arbeten - se hela galleriet för mer
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project: Doc<"projects">) => (
              <ProjectCard
                key={project._id}
                project={project}
                viewMode="grid"
              />
            ))}
          </div>
        </div>
      </section>

      <DemoApp />
      <Contact />
    </>
  );
}
