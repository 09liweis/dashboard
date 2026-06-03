import type { NextPage, GetStaticProps } from 'next';
import { BlogType } from 'types';
import Blog from 'classes/blog';
import BlogList from '@/components/blog/BlogList';
import SEO from '@/components/SEO';
import { getBreadcrumbSchema, GEO_META, SITE_CONFIG } from '../../config/seo';
import { BLOG_POSTS } from '../../data/blogs';

interface BlogsPageProps {
  blogs: BlogType[];
}

const Blogs: NextPage<BlogsPageProps> = ({ blogs }) => {
  const curBlogs = blogs.map((b) => new Blog(b));

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blogs' },
  ];

  const jsonLd = [
    getBreadcrumbSchema(breadcrumbs),
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Sam Li Blog',
      description: 'Technical articles and insights about web development, programming, and software engineering',
      url: 'https://samliweisen.dev/blogs',
      isAccessibleForFree: true,
      license: 'https://creativecommons.org/licenses/by/4.0/',
      inLanguage: 'en-US',
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.siteUrl,
      },
      publisher: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
      },
      blogPost: blogs.map((b) => ({
        '@type': 'BlogPosting',
        headline: b.title,
        description: b.excerpt || '',
        url: `${SITE_CONFIG.siteUrl}/blogs/${b.url || b._id}`,
        datePublished: b.created_at,
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.author,
        },
      })),
    },
  ];

  return (
    <>
      <SEO
        title="Blog - Technical Articles & Insights | Sam Li"
        description="Read technical articles and insights about web development, React, Vue.js, Node.js, TypeScript, and modern software engineering practices."
        keywords={[
          'blog',
          'technical articles',
          'web development tutorials',
          'programming insights',
          'React tutorials',
          'Vue.js tutorials',
          'Node.js tutorials',
          'static site hosting',
          'budget web development',
          'CRM integration',
        ]}
        url="/blogs"
        type="blog"
        jsonLd={jsonLd}
        canonical="https://samliweisen.dev/blogs"
        geoPlaceName={GEO_META.placeName}
        geoRegion={GEO_META.region}
        geoPosition={GEO_META.position}
        aiSummary="Technical blog covering web development, static hosting strategies, budget-friendly website building, and CRM integration. Written by Sam Li, a Full Stack Developer with 10+ years of experience."
        sections={[
          'Static Website Hosting',
          'Budget Development',
          'CRM Integration',
          'Web Development Best Practices',
          'Cost Optimization',
        ]}
        abstract="A regularly updated technical blog by Sam Li, sharing practical insights on web development, from budget-friendly static site deployment to full-scale CRM integration and application scaling strategies."
        about={[
          'Web Development',
          'Static Hosting',
          'Software Engineering',
          'Cost Optimization',
          'CRM Systems',
        ]}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 lg:py-20">
        {/* ─── Hero Section ───────────────────────────────────────────── */}
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Blog
                </span>
                <span className="text-sm text-slate-400">
                  {curBlogs.length} article{curBlogs.length !== 1 ? 's' : ''}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Articles &amp; Insights
              </h1>
              <p className="text-base leading-relaxed text-slate-500 sm:text-lg">
                Practical guides on web development, cost-effective architecture, and scaling strategies — drawn from real project experience.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                {['Web Dev', 'Performance', 'Architecture', 'Tutorials'].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="mt-8 h-px bg-slate-200" />
        </header>

        {/* ─── Blog List ──────────────────────────────────────────────── */}
        <BlogList blogs={curBlogs} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogsPageProps> = async () => {
  return {
    props: {
      blogs: BLOG_POSTS,
    },
  };
};

export default Blogs;
