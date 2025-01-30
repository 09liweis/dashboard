interface Project {
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  url?: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      name: "Express API Server",
      description: "RESTful API server with authentication, rate limiting, and comprehensive documentation",
      technologies: ["Express.js", "MongoDB", "JWT", "Node.js", "TypeScript"],
      features: [
        "Implemented JWT-based authentication and role-based access control",
        "Built RESTful endpoints with input validation and error handling",
        "Integrated MongoDB with Mongoose for data modeling and validation",
        "Added rate limiting and security middleware for API protection"
      ]
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
      url: "https://samliweisen.dev"
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
      url: "https://ricksammorty.vercel.app"
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
      url: "https://what-sam-watched.vercel.app"
    },
    {
      name: "Cheap Foodcourt Finder",
      description: "Application to find affordable food options in the area",
      technologies: ["Nuxtjs", "Google Maps API", "Node.js", "Express", "MongoDB"],
      features: [
        "Search for nearby foodcourts based on budget",
        "View ratings and reviews of food options"
      ],
      url: "https://cheap-foodcourt-finder.vercel.app/"
    },
    {
      name: "Note 2 Study",
      description: "Mobile application for efficient note-taking and spaced repetition learning",
      technologies: ["React Native", "Supabase", "TypeScript"],
      features: [
        "Implemented spaced repetition algorithm for optimized learning",
        "Built real-time note synchronization with Supabase",
        "Created offline-first architecture with local storage",
      ]
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
              {project.url && (
                <a 
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            <p className="text-gray-600 mb-3">{project.description}</p>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 text-sm rounded-md text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {project.features.map((feature, idx) => (
                <li key={idx} className="text-sm">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}