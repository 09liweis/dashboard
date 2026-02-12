// SEO Configuration and Utilities

export const SITE_CONFIG = {
  siteName: 'Sam Li - Full Stack Developer',
  siteUrl: 'https://samliweisen.dev',
  description: 'Full Stack Developer with 10+ years of experience in React, Vue.js, Node.js, and modern web technologies. Specializing in scalable web applications.',
  author: 'Sam Li',
  email: 'weisen.li@hotmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/samliweisen/',
    github: 'https://github.com/09liweis',
  },
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Vue.js Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'Web Development',
    'Software Engineer',
    'JavaScript Developer',
    'Toronto Developer',
    'Canada Developer',
  ],
};

// JSON-LD Schema for Person (Professional Profile)
export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sam Li',
  alternateName: 'Weisen Li',
  url: SITE_CONFIG.siteUrl,
  email: SITE_CONFIG.email,
  jobTitle: 'Senior Full Stack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'OLG',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  sameAs: [
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.github,
  ],
  knowsAbout: [
    'React',
    'Vue.js',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'MongoDB',
    'PostgreSQL',
    'Web Development',
    'Software Engineering',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'University of Toronto',
  },
});

// JSON-LD Schema for Website
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_CONFIG.siteName,
  url: SITE_CONFIG.siteUrl,
  description: SITE_CONFIG.description,
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.author,
  },
  inLanguage: 'en-US',
});

// JSON-LD Schema for Professional Service
export const getProfessionalServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Sam Li - Full Stack Development Services',
  url: SITE_CONFIG.siteUrl,
  description: 'Professional web development services including full-stack development, API development, database architecture, and performance optimization.',
  provider: {
    '@type': 'Person',
    name: 'Sam Li',
    email: SITE_CONFIG.email,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Canada',
  },
  serviceType: [
    'Full Stack Development',
    'Web Application Development',
    'API Development',
    'Database Architecture',
    'Performance Optimization',
  ],
});

// JSON-LD Schema for Blog Posting
export const getBlogPostingSchema = (blog: {
  title: string;
  content: string;
  createdAt: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: blog.title,
  articleBody: blog.content,
  datePublished: blog.createdAt,
  author: {
    '@type': 'Person',
    name: SITE_CONFIG.author,
    url: SITE_CONFIG.siteUrl,
  },
  publisher: {
    '@type': 'Person',
    name: SITE_CONFIG.author,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_CONFIG.siteUrl}${blog.url}`,
  },
});

// JSON-LD Schema for BreadcrumbList
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_CONFIG.siteUrl}${item.url}`,
  })),
});

// Generate page metadata
export const getPageMetadata = (page: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}) => {
  const title = page.title 
    ? `${page.title} | ${SITE_CONFIG.siteName}`
    : SITE_CONFIG.siteName;
  
  const description = page.description || SITE_CONFIG.description;
  const keywords = [...SITE_CONFIG.keywords, ...(page.keywords || [])].join(', ');
  const image = page.image || `${SITE_CONFIG.siteUrl}/og-image.png`;
  const url = `${SITE_CONFIG.siteUrl}${page.url || ''}`;
  const type = page.type || 'website';

  return {
    title,
    description,
    keywords,
    image,
    url,
    type,
    // Open Graph
    og: {
      title,
      description,
      image,
      url,
      type,
      siteName: SITE_CONFIG.siteName,
    },
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      image,
      creator: '@samliweisen',
    },
  };
};

// Page-specific metadata
export const PAGE_METADATA = {
  home: {
    title: 'Full Stack Developer | Sam Li',
    description: 'Full Stack Developer with 10+ years of experience building scalable web applications with React, Vue.js, Node.js, and modern technologies.',
    keywords: ['portfolio', 'full stack developer', 'web developer'],
  },
  resume: {
    title: 'Resume & Experience',
    description: 'Professional resume and work experience of Sam Li - Senior Full Stack Developer with expertise in React, Vue.js, Node.js, and cloud technologies.',
    keywords: ['resume', 'cv', 'experience', 'skills'],
  },
  blogs: {
    title: 'Blog Posts',
    description: 'Technical articles and insights about web development, programming, and software engineering.',
    keywords: ['blog', 'articles', 'tutorials', 'web development'],
  },
  todos: {
    title: 'Todo Manager',
    description: 'Personal task management and productivity tool.',
    keywords: ['todo', 'task manager', 'productivity'],
  },
  expenses: {
    title: 'Expense Tracker',
    description: 'Track and manage personal expenses with detailed analytics.',
    keywords: ['expense tracker', 'finance', 'budget'],
  },
  knowledges: {
    title: 'Knowledge Base',
    description: 'Curated collection of programming knowledge, concepts, and best practices.',
    keywords: ['knowledge base', 'programming', 'learning'],
  },
};
