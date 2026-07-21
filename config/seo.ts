// SEO Configuration and Utilities
// Includes Generative Engine Optimization (GEO) for AI-powered search

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

export const GEO_META = {
  placeName: 'Toronto',
  region: 'CA-ON',
  position: '43.6532;-79.3832',
};

// ─── Generative Engine Optimization (GEO) Utilities ───────────────────────

/**
 * Strip HTML tags and extract a clean description.
 * Used for generating AI-friendly plain-text summaries.
 */
export const stripHtml = (html: string, maxLength = 320): string => {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, maxLength);
};

/**
 * Extract headings (h2, h3) from HTML content to generate an outline / FAQ structure
 * that AI crawlers can use to understand content hierarchy.
 */
export const extractSections = (html: string): string[] => {
  const headingRegex = /<(h2|h3)[^>]*>(.*?)<\/\1>/gi;
  const sections: string[] = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    sections.push(match[2].replace(/<[^>]*>/g, '').trim());
  }
  return sections;
};

/**
 * Generate a question-based FAQ from article section headings.
 * AI search engines heavily favor FAQ-structured content for generating answers.
 */
export const getFAQSchema = (questions: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((q) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `See article section: ${q}`,
    },
  })),
});

/**
 * Generate HowTo schema from section headings. GEO signal: instruction-style content
 * ranks higher in AI-generated overviews.
 */
export const getHowToSchema = (steps: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Guide',
  step: steps.map((step, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: step,
  })),
});

/**
 * Generate Speakable schema for voice search / AI assistant optimization.
 * Highlights the most important parts of the article that AI assistants should read aloud.
 */
export const getSpeakableSchema = (url: string, headline: string, summary: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: `${SITE_CONFIG.siteUrl}${url}`,
  speakable: {
    '@type': 'SpeakableSpecification',
    headline: headline,
    summary: summary,
  },
});

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
  isAccessibleForFree: true,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  // GEO: signals to AI crawlers that the site welcomes indexing for generative models
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_CONFIG.siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
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
  isAccessibleForFree: true,
});

// JSON-LD Schema for Blog Posting (GEO enhanced)
export const getBlogPostingSchema = (blog: {
  title: string;
  content: string;
  createdAt: string;
  url: string;
  abstract?: string;
  about?: Array<{ '@type': string; name: string }>;
  keywords?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: blog.title,
  articleBody: blog.content,
  datePublished: blog.createdAt,
  dateModified: blog.createdAt,
  // GEO: AI-friendly abstract / summary
  abstract: blog.abstract || stripHtml(blog.content),
  description: blog.abstract || stripHtml(blog.content),
  // GEO: semantic topic tags help AI understand content relationships
  about: blog.about || [
    { '@type': 'Thing', name: 'Web Development' },
    { '@type': 'Thing', name: 'Software Engineering' },
  ],
  keywords: blog.keywords?.join(', ') || 'web development, programming, software engineering',
  // GEO: signals content is free to access
  isAccessibleForFree: true,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  acquireLicensePage: `${SITE_CONFIG.siteUrl}${blog.url}`,
  // GEO: citation metadata for AI answer generation
  citation: [
    {
      '@type': 'CreativeWork',
      name: blog.title,
      url: `${SITE_CONFIG.siteUrl}${blog.url}`,
    },
  ],
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
  // GEO: inLanguage helps AI determine what languages to serve the content in
  inLanguage: 'en-US',
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

// ─── GEO Page-Level Metadata Generator ────────────────────────────────────

export interface GeoPageMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  /** GEO: AI-friendly plain-text summary (no HTML) */
  aiSummary?: string;
  /** GEO: section headings for FAQ/HowTo schema generation */
  sections?: string[];
  /** GEO: page abstract for AI crawlers */
  abstract?: string;
  /** GEO: topic tags for semantic relationship mapping */
  about?: string[];
}

// Generate page metadata
export const getPageMetadata = (page: GeoPageMeta) => {
  const title = page.title 
    ? `${page.title} | ${SITE_CONFIG.siteName}`
    : SITE_CONFIG.siteName;
  
  const description = page.description || SITE_CONFIG.description;
  const keywords = [...SITE_CONFIG.keywords, ...(page.keywords || [])].join(', ');
  const image = page.image || '';
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
    // GEO: AI search metadata
    geo: {
      aiSummary: page.aiSummary || description,
      sections: page.sections || [],
      abstract: page.abstract || description,
      about: page.about || [],
    },
  };
};

// JSON-LD Schema for Organization
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sam Li - Full Stack Development',
  url: SITE_CONFIG.siteUrl,
  logo: `${SITE_CONFIG.siteUrl}/favicon.ico`,
  description: SITE_CONFIG.description,
  founder: {
    '@type': 'Person',
    name: 'Sam Li',
    email: SITE_CONFIG.email,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-647-WEISEN-CODE',
    contactType: 'Customer Service',
    email: SITE_CONFIG.email,
  },
  sameAs: [
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.github,
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Canada',
  },
  knowsAbout: [
    'Full Stack Development',
    'Web Development',
    'API Development',
    'Database Design',
    'Cloud Architecture',
  ],
});

// JSON-LD Schema for LocalBusiness (Geographic targeting for Toronto)
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_CONFIG.siteUrl}#local-business`,
  name: 'Sam Li - Web Developer Services',
  description: 'Full Stack Web Development Services in Toronto',
  url: SITE_CONFIG.siteUrl,
  telephone: '+1-647-WEISEN-CODE',
  email: SITE_CONFIG.email,
  image: `${SITE_CONFIG.siteUrl}/favicon.ico`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Toronto',
    addressLocality: 'Toronto',
    addressRegion: 'ON',
    postalCode: 'M5V 3A8',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '43.6532',
    longitude: '-79.3832',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Toronto',
    },
    {
      '@type': 'State',
      name: 'Ontario',
    },
    {
      '@type': 'Country',
      name: 'Canada',
    },
  ],
  sameAs: [
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.github,
  ],
});

// JSON-LD Schema for Creative Work (Project/Portfolio)
export const getCreativeWorkSchema = (project: {
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.name,
  description: project.description,
  url: project.url || `${SITE_CONFIG.siteUrl}/projects/${project.name}`,
  creator: {
    '@type': 'Person',
    name: 'Sam Li',
  },
  author: {
    '@type': 'Person',
    name: 'Sam Li',
  },
  keywords: project.technologies?.join(', ') || 'web development',
  isAccessibleForFree: true,
});

// JSON-LD Schema for Collection Page (Portfolio/Projects)
export const getCollectionSchema = (items: Array<{
  name: string;
  description: string;
  url?: string;
}>) => ({
  '@context': 'https://schema.org',
  '@type': 'Collection',
  name: 'Portfolio Projects',
  description: 'Collection of web development projects and case studies',
  url: `${SITE_CONFIG.siteUrl}/projects`,
  hasPart: items.map((item) => ({
    '@type': 'CreativeWork',
    name: item.name,
    description: item.description,
    url: item.url || `${SITE_CONFIG.siteUrl}/projects/${item.name}`,
  })),
});

// JSON-LD Schema for Article (Blog Post - Enhanced)
export const getArticleSchema = (article: {
  title: string;
  description: string;
  content?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  author?: string;
  keywords?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: article.title,
  description: article.description,
  ...(article.image && { image: article.image }),
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Person',
    name: article.author || SITE_CONFIG.author,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.siteName,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.siteUrl}/favicon.ico`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_CONFIG.siteUrl}${article.url}`,
  },
  articleBody: article.content || article.description,
  keywords: article.keywords?.join(', ') || 'web development',
  wordCount: article.content?.split(/\s+/).length || 500,
  isAccessibleForFree: true,
});

// JSON-LD Schema for FAQPage
export const getFAQPageSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

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
};
