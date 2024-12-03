interface Project {
  name: string;
  description: string;
  technologies: string[];
  features: string[];
}

export default function Projects() {
  const projects: Project[] = [
    {
      name: "Next.js Portfolio & Dashboard",
      description: "Full-stack web application for personal portfolio and expense tracking",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      features: [
        "Built responsive UI with Tailwind CSS",
        "Implemented GraphQL server with Mongoose",
        "Created expense tracking with Chart.js visualization",
        "Integrated real-time updates with WebSocket"
      ]
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
      ]
    }
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-blue-500 transition-all">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.name}</h3>
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