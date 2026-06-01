import { useState } from "react";
import { PROJECTS, PROJECT_CATEGORIES } from "../../data/projects";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = PROJECT_CATEGORIES;

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Projects</h2>
        <p className="text-slate-600">
          Some things I&apos;ve built or helped build.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedCategory === category.id
                ? "bg-primary text-white"
                : "bg-white text-slate-700 border border-slate-300 hover:border-slate-400"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <article
            key={project.name}
            className="border-b border-slate-200 pb-6 last:border-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <h3 className="text-lg font-semibold text-slate-900">
                {project.name}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-slate-500 hover:text-slate-700"
                  >
                    <svg
                      className="w-4 h-4 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </h3>
              <div className="text-sm text-slate-600 sm:text-right">
                <span className="capitalize">{project.category}</span>
              </div>
            </div>

            <p className="text-slate-700 mb-3">{project.description}</p>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.highlights.length > 0 && (
              <div className="text-sm text-slate-600">
                <span className="font-medium text-slate-700">
                  Key features:{" "}
                </span>
                {project.highlights.join(" • ")}
              </div>
            )}
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-slate-600 text-center py-8">
          No projects in this category yet.
        </p>
      )}
    </section>
  );
}
