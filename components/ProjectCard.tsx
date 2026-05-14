import { Project } from "@/lib/types";
import { FiGithub, FiExternalLink, FiCalendar } from "react-icons/fi";

interface ProjectCardProps {
  project: Project;
  viewMode: "grid" | "list";
}

export default function ProjectCard({ project, viewMode }: ProjectCardProps) {
  const date = new Date(project.completedAt).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
  });

  if (viewMode === "list") {
    return (
      <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg p-6">
        <div className="md:w-48 h-32 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg overflow-hidden shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="h-48 bg-linear-to-br from-blue-500 to-purple-500 overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
              >
                <FiExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <FiCalendar className="w-3 h-3" />
            {date}
          </span>
        </div>
      </div>
    </div>
  );
}
