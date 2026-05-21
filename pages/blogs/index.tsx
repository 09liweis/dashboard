import { useContext } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { getTranslate } from 'helpers';
import Link from 'next/link';
import AppContext from 'AppContext';
import { BlogType } from 'types';
import Blog from 'classes/blog';
import BlogList from '@/components/blog/BlogList';
import SEO from '@/components/SEO';
import { getBreadcrumbSchema } from '../../config/seo';
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
      author: {
        '@type': 'Person',
        name: 'Sam Li',
      },
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
        ]}
        url="/blogs"
        type="blog"
        jsonLd={jsonLd}
        canonical="https://samliweisen.dev/blogs"
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
