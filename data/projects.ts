export interface Project {
  slug?: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  highlights: string[];
  url?: string;
  category: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "hans-construction",
    name: "Hans Construction",
    description: "Construction company website. Built with SvelteKit for fast performance.",
    longDescription: "Hans Construction needed a professional web presence that could showcase their portfolio of commercial and residential projects to attract new clients in the Greater Toronto Area. The existing site was slow, hard to update, and failing to generate leads. I rebuilt it from the ground up using SvelteKit's static site generation — every page is pre-rendered as pure HTML, so visitors see content instantly regardless of their device or connection speed. The project portfolio section lets potential clients browse completed jobs by category, and the integrated contact form feeds directly into the team's inbox. I also invested in local SEO — structured data, location-specific landing pages, and Google Business Profile optimizations — which helped organic traffic grow steadily in the months after launch.",
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
    slug: "aivio-digital",
    name: "Aivio Digital",
    description: "Migrated from WordPress to Astro to improve performance and reduce hosting costs.",
    longDescription: "Aivio Digital was spending $78/month on managed WordPress hosting, premium plugins, and security scanning for a site that was essentially a static brochure. Page load times hovered around 2.8 seconds on mobile, and plugin updates were a constant maintenance burden. I migrated the entire site to Astro — a framework designed specifically for content-heavy sites that ships zero JavaScript by default. Blog posts moved from a MySQL database to Markdown files with Zod schema validation, catching missing metadata at build time rather than silently at runtime. Seven WordPress plugins were eliminated because the problems they solved — caching, security scanning, image optimization, SEO management — simply do not exist on a static site. The result: hosting costs dropped to $0/month on Netlify's free tier, Google PageSpeed climbed from 58 to 97 on mobile, and average page load time fell from 2.8 seconds to 0.4 seconds.",
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
    slug: "realtor-service-platform",
    name: "Realtor Service Platform",
    description: "Real estate service marketplace with payment processing.",
    longDescription: "This marketplace connects property owners with real estate service providers — home inspectors, stagers, photographers, and appraisers — across Canada. Property owners can browse by service type, compare providers, and book with confirmed pricing. Providers get a dashboard showing incoming requests, their availability calendar, and a live view of earnings. The platform uses Supabase for authentication and the database, with row-level security enforcing that providers can only see their own bookings and clients can only see their own history. Real-time booking status updates are powered by Supabase's subscription feature — when a provider accepts a request, the client sees the confirmation within seconds without refreshing. Stripe handles all payment processing and weekly provider payouts, keeping the platform free from PCI compliance complexity. The first year saw over $150,000 in transaction volume processed with a 4.6-star average rating from both sides of the marketplace.",
    technologies: ["SvelteKit", "Tailwind CSS", "Stripe", "Supabase"],
    highlights: ["Stripe payments", "User accounts", "Service booking"],
    url: "https://realtorservice.ca",
    category: "client",
  },
  {
    slug: "hans-steel-canada",
    name: "Hans Steel Canada",
    description: "Corporate website for a steel manufacturing company.",
    longDescription: "Hans Steel was paying over $300/month to run a WordPress site that never changed — a collection of static product pages, a gallery, and a contact form. Emergency fixes, plugin updates, and bandwidth overages kept pushing the bill higher. I migrated the site to Next.js with static site generation deployed on Netlify. Every page is now pre-built HTML served from Netlify's edge network, eliminating database queries, PHP processing, and bandwidth overages entirely. Product photos went through Next.js's built-in image optimization, shrinking the homepage payload from 8 MB to under 800 KB. The contact form moved to Netlify Forms at no additional cost. The result was immediate: hosting cost dropped from $300+/month to $0, page load time fell from 4.2 seconds to 0.9 seconds, and the Lighthouse score jumped from 45 to 98. The sales team now spends time selling steel instead of managing a website.",
    technologies: ["Next.js", "Tailwind CSS", "Netlify"],
    highlights: ["Product showcase", "Corporate rebrand", "SEO improvements"],
    url: "https://hanssteel.com",
    category: "client",
  },
  {
    slug: "kaifei-landscaping",
    name: "Kaifei Landscaping",
    description: "Landscaping business website. Moved from Wix to Next.js with a project gallery and service area map.",
    longDescription: "Kaifei Landscaping had outgrown their Wix site — it was slow to load, looked generic, and offered no way to showcase the quality of their completed projects. I rebuilt the site in Next.js with a focus on two things: visual impact and local search visibility. The project gallery lets visitors browse completed landscaping jobs filtered by type (patios, gardens, driveways), with full-resolution before-and-after photos. An interactive Mapbox service-area map shows exactly which neighbourhoods Kaifei serves, making it immediately clear to potential customers whether they qualify. The performance difference versus Wix was significant: Lighthouse performance score went from 42 to 94, and mobile load time dropped from over 5 seconds to under 1 second. Combined with structured data markup for local businesses and neighbourhood-specific landing pages, organic traffic from Google roughly doubled in the first six months.",
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
    slug: "surewin",
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
    slug: "juzi-book-house",
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
    slug: 'landlord-master',
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
    slug: 'what-sam-watched',
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
    slug: 'rich-sam-morty',
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
