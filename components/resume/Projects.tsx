import { motion } from 'motion/react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  url?: string;
  icon?: string;
}

export default function Projects() {
  const PROJECTS: Project[] = [
    {
      name: "Express API Server",
      description: "RESTful API server with authentication, rate limiting, and comprehensive documentation",
      technologies: ["Express.js", "MongoDB", "JWT", "Node.js", "TypeScript"],
      features: [
        "Implemented JWT-based authentication and role-based access control",
        "Built RESTful endpoints with input validation and error handling",
        "Integrated MongoDB with Mongoose for data modeling and validation",
        "Added rate limiting and security middleware for API protection"
      ],
      icon: "🚀"
    },
    {
      name: "Next.js Portfolio & Dashboard",
      description: "Full-stack web application for personal portfolio and expense tracking",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      features: [
        "Built responsive UI with Tailwind CSS",
        "Implemented GraphQL server with Mongoose",
        "Created expense tracking with Chart.js visualization",
        "Integrated real-time updates with WebSocket"
      ],
      url: "https://samliweisen.dev",
      icon: "💼"
    },
    {
      name: "Rick and Morty Explorer",
      description: "Interactive web application to explore Rick and Morty universe characters and episodes",
      technologies: ["SvelteKit", "GraphQL", "TailwindCSS", "Rick and Morty API"],
      features: [
        "Implemented GraphQL queries for efficient data fetching",
        "Built responsive and interactive UI with SvelteKit",
        "Created dynamic character search and filtering",
        "Integrated pagination for large datasets"
      ],
      url: "https://ricksammorty.vercel.app",
      icon: "🌌"
    },
    {
      name: "Movie Progress Tracker",
      description: "Web application to track and analyze movie watching progress",
      technologies: ["Nuxt 3", "Vue.js", "FastAPI", "PostgreSQL"],
      features: [
        "Developed movie progress tracking system",
        "Integrated with IMDB and Cineplex APIs",
        "Implemented user authentication and watchlist management",
        "Created detailed analytics dashboard"
      ],
      url: "https://what-sam-watched.vercel.app",
      icon: "🎬"
    }
  ];

  return (
    <motion.section
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-gray-200">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 hover:border-blue-500 transition-all overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{project.icon}</span>
                <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
              </div>
              {project.url && (
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
            </div>

            <p className="text-gray-600 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map(tech => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-blue-500 hover:shadow-sm transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 + (idx * 0.1) }}
                  className="flex items-start gap-2 text-gray-700 text-sm"
                >
                  <span className="text-blue-600 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}