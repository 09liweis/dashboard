import { motion } from 'motion/react';
import { useState } from 'react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  highlights: string[];
  url?: string;
  category: string;
  gradient: string;
  bgGradient: string;
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const PROJECTS: Project[] = [
    {
      name: "Canadian Mobile Welding",
      description: "Professional welding services website with service showcase and contact integration",
      technologies: ["Next.js", "shadcn/ui", "Netlify"],
      highlights: [
        "Modern service website with professional aesthetic",
        "Responsive showcase and portfolio sections",
        "Automated contact form notifications"
      ],
      url: "https://canadian-mobile-welding.netlify.app",
      category: "client",
      gradient: "from-gray-600 to-gray-800",
      bgGradient: "from-gray-50 to-gray-100"
    },
    {
      name: "Realtor Service Platform",
      description: "Full-stack real estate service platform with payment processing and property management",
      technologies: ["SvelteKit", "Tailwind CSS", "Stripe", "Supabase"],
      highlights: [
        "Secure Stripe payment integration",
        "Real estate service marketplace",
        "User authentication with Supabase",
        "Service booking with notifications"
      ],
      url: "https://realtorservice.ca",
      category: "client",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      name: "Hans Steel Canada",
      description: "Corporate rebranding website for steel manufacturing company",
      technologies: ["Next.js", "Tailwind CSS", "Netlify"],
      highlights: [
        "Complete corporate rebranding",
        "Product showcase sections",
        "SEO optimized"
      ],
      url: "https://hanssteel.com",
      category: "client",
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-50 to-red-50"
    },
    {
      name: "Landlord Master",
      description: "Property management platform for landlords and tenants",
      technologies: ["Next.js", "MongoDB", "Stripe API"],
      highlights: [
        "Property listing management",
        "Tenant screening automation",
        "Secure payment processing",
        "Role-based access control"
      ],
      url: "https://landlordmaster.com",
      category: "saas",
      gradient: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50"
    },
    {
      name: "Movie Progress Tracker",
      description: "Track and analyze movie watching progress with detailed analytics",
      technologies: ["Nuxt 3", "Vue.js", "FastAPI", "PostgreSQL"],
      highlights: [
        "Movie progress tracking",
        "IMDB and Cineplex API integration",
        "Analytics dashboard"
      ],
      url: "https://what-sam-watched.vercel.app",
      category: "personal",
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      name: "Rick and Morty Explorer",
      description: "Interactive character and episode explorer",
      technologies: ["SvelteKit", "GraphQL", "Tailwind CSS"],
      highlights: [
        "GraphQL data fetching",
        "Dynamic search and filtering",
        "Pagination for large datasets"
      ],
      url: "https://ricksammorty.netlify.app",
      category: "personal",
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      name: "Express API Server",
      description: "RESTful API with authentication and rate limiting",
      technologies: ["Express.js", "MongoDB", "JWT", "TypeScript"],
      highlights: [
        "JWT authentication & RBAC",
        "Input validation & error handling",
        "Rate limiting & security middleware"
      ],
      category: "api",
      gradient: "from-sky-600 to-blue-600",
      bgGradient: "from-sky-50 to-blue-50"
    },
    {
      name: "Portfolio & Dashboard",
      description: "Personal portfolio with expense tracking",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      highlights: [
        "Responsive UI design",
        "Expense tracking with visualizations",
        "Real-time updates"
      ],
      url: "https://samliweisen.dev",
      category: "personal",
      gradient: "from-rose-600 to-pink-600",
      bgGradient: "from-rose-50 to-pink-50"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', count: PROJECTS.length },
    { id: 'client', label: 'Client Work', count: PROJECTS.filter(p => p.category === 'client').length },
    { id: 'saas', label: 'SaaS', count: PROJECTS.filter(p => p.category === 'saas').length },
    { id: 'personal', label: 'Personal', count: PROJECTS.filter(p => p.category === 'personal').length },
    { id: 'api', label: 'API', count: PROJECTS.filter(p => p.category === 'api').length }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
          Featured Projects
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A selection of projects showcasing full-stack development, API design, and modern web technologies
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-5 py-2.5 rounded-xl font-medium transition-all relative ${
              selectedCategory === category.id
                ? 'bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {category.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white/20'
                  : 'bg-gray-100'
              }`}>
                {category.count}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.name}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setHoveredProject(project.name)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

            <div className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl overflow-hidden">
              <div className={`h-2 w-full bg-linear-to-r ${project.gradient}`}></div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {project.url && (
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      className={`ml-4 w-10 h-10 rounded-xl bg-linear-to-br ${project.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIdx) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 + techIdx * 0.02 }}
                      className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 + (idx * 0.05) }}
                      className="flex items-start gap-2 text-gray-700 text-sm"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${project.gradient} mt-1.5 flex-shrink-0`}></div>
                      <span>{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: hoveredProject === project.name ? '4px' : '0px'
                }}
                className={`w-full bg-linear-to-r ${project.gradient}`}
              />
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-gray-700 font-medium">{PROJECTS.length} projects delivered</span>
        </div>
      </motion.div>
    </motion.section>
  );
}