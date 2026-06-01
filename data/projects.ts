export interface Project {
    name: string;
    description: string;
    technologies: string[];
    highlights: string[];
    url?: string;
    category: string;
  }
  
  export const PROJECTS: Project[] = [
    {
      name: "Hans Construction",
      description: "Construction company website. Built with SvelteKit for fast performance.",
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
      description: "Migrated from WordPress to Astro to improve performance and reduce hosting costs.",
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
      description: "Landscaping business website. Moved from Wix to Next.js with a project gallery and service area map.",
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
      description: "Multi-language website for legal information with contact form integration.",
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
      description: "Online novel platform with subscriptions and author management tools.",
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
  
  export const PROJECT_CATEGORIES = [
    { id: "all", label: "All" },
    { id: "client", label: "Client Work" },
    { id: "saas", label: "SaaS Products" },
    { id: "personal", label: "Personal" },
    { id: "api", label: "APIs" },
  ];
  