import { Metadata } from "next"; // ← Lägg till denna import
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projekt | Min Portfolio",
  description:
    "Utvalda projekt byggda med Next.js, TypeScript och modern teknik",
};

export default async function ProjectsPage() {
  const projects = await fetchQuery(api.projects.getAll, { category: "all" });
  const categories = await fetchQuery(api.projects.getCategories);

  return (
    <ProjectsClient initialProjects={projects} initialCategories={categories} />
  );
}
