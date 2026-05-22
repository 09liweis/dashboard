import { useContext } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getTranslate } from 'helpers';
import Link from 'next/link';
import AppContext from 'AppContext';
import { BlogType } from 'types';
import Blog from 'classes/blog';
import BlogList from '@/components/blog/BlogList';
import SEO from '@/components/SEO';
import { getBreadcrumbSchema, GEO_META, SITE_CONFIG } from '../../config/seo';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../../data/blogs';

interface BlogsPageProps {
  blogs: BlogType[];
}

const Blogs: NextPage<BlogsPageProps> = ({ blogs }) => {
  const { user, lang } = useContext(AppContext);
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
      // GEO: blog post list signals to AI that this is a regularly updated resource
      blogPost: blogs.map((b) => ({
        '@type': 'BlogPosting',
        headline: b.title,
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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Blog Posts
          </h1>
          {user._id && (
            <Link href="/blogs/new">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                {getTranslate(lang, 'addNew')}
              </motion.span>
            </Link>
          )}
        </div>
        <BlogList blogs={curBlogs} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BlogsPageProps> = async () => {
  return {
    props: {
      blogs: BLOG_POSTS,
    },
  };
};

export default Blogs;
