import { useState } from "react";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  highlights: string[];
  url?: string;
  category: string;
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const PROJECTS: Project[] = [
    {
      name: "Hans Construction",
      description:
        "Construction company website. Built with SvelteKit for fast performance.",
      technologies: ["SvelteKit", "Tailwind CSS", "Vercel"],
      highlights: [
        "Static site generation for speed",
        "Project portfolio",
        "SEO work for local leads",
      ],
      url: "https://hanscons.com",
      category: "client",
    },
    {
      name: "Aivio Digital",
      description:
        "Migrated from WordPress to Astro to improve performance and reduce hosting costs.",
      technologies: ["Astro", "Tailwind CSS", "Vercel"],
      highlights: [
        "Removed WordPress dependency",
        "Faster page loads",
        "Low-cost hosting",
      ],
      url: "https://aivio-digital.com",
      category: "client",
    },
    {
      name: "Realtor Service Platform",
      description: "Real estate service marketplace with payment processing.",
      technologies: ["SvelteKit", "Tailwind CSS", "Stripe", "Supabase"],
      highlights: ["Stripe payments", "User accounts", "Service booking"],
      url: "https://realtorservice.ca",
      category: "client",
    },
    {
      name: "Hans Steel Canada",
      description: "Corporate website for a steel manufacturing company.",
      technologies: ["Next.js", "Tailwind CSS", "Netlify"],
      highlights: ["Product showcase", "Corporate rebrand", "SEO improvements"],
      url: "https://hanssteel.com",
      category: "client",
    },
    {
      name: "Kaifei Landscaping",
      description:
        "Landscaping business website. Moved from Wix to Next.js with a project gallery and service area map.",
      technologies: ["Next.js", "Tailwind CSS", "Mapbox"],
      highlights: [
        "Performance upgrade from Wix",
        "Project gallery",
        "Local SEO",
      ],
      url: "https://kaifeilandscaping.com",
      category: "client",
    },
    {
      name: "Surewin",
      description:
        "Multi-language website for legal information with contact form integration.",
      technologies: ["Nuxt.js", "Tailwind CSS", "Vercel"],
      highlights: [
        "Multi-language support",
        "Contact form integration",
        "SEO for multiple locales",
      ],
      url: "https://surewin.ca",
      category: "client",
    },
    {
      name: "Juzi Book House",
      description:
        "Online novel platform with subscriptions and author management tools.",
      technologies: ["SvelteKit", "Supabase", "Stripe"],
      highlights: [
        "Author dashboard",
        "Subscription payments",
        "Reader engagement features",
      ],
      url: "https://juzibookhouse.com",
      category: "saas",
    },
    {
      name: "Landlord Master",
      description: "Property management platform for landlords.",
      technologies: ["Next.js", "MongoDB", "Stripe"],
      highlights: [
        "Property listings",
        "Tenant management",
        "Payment processing",
      ],
      url: "https://landlordmaster.com",
      category: "saas",
    },
    {
      name: "Movie Progress Tracker",
      description: "Track movies watched with stats and visualizations.",
      technologies: ["Nuxt 3", "Vue.js", "PostgreSQL"],
      highlights: [
        "Progress tracking",
        "Analytics dashboard",
        "API integrations",
      ],
      url: "https://what-sam-watched.vercel.app",
      category: "personal",
    },
    {
      name: "Rick and Morty Explorer",
      description: "Explore characters and episodes from the show.",
      technologies: ["SvelteKit", "GraphQL", "Tailwind CSS"],
      highlights: ["GraphQL queries", "Search and filter", "Paginated results"],
      url: "https://ricksammorty.netlify.app",
      category: "personal",
    },
    {
      name: "Express API Server",
      description: "REST API with auth and rate limiting.",
      technologies: ["Express.js", "MongoDB", "TypeScript"],
      highlights: ["JWT authentication", "Input validation", "Rate limiting"],
      category: "api",
    },
    {
      name: "Portfolio & Dashboard",
      description: "This site. Personal portfolio with expense tracking.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      highlights: ["Expense tracking", "Responsive design", "Blog system"],
      url: "https://samliweisen.dev",
      category: "personal",
    },
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "client", label: "Client Work" },
    { id: "saas", label: "SaaS Products" },
    { id: "personal", label: "Personal" },
    { id: "api", label: "APIs" },
  ];

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
              <div>
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
              </div>
              <div className="text-sm text-slate-600 sm:text-right">
                <span className="capitalize">{project.category}</span>
              </div>
            </div>

            <p className="text-slate-700 mb-3">{project.description}</p>

            <div className="mb-3">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
