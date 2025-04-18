import { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { fetchAPI, getTranslate } from 'helpers';
import { BLOG_LIST_API } from '../../constants';
import Link from 'next/link';
import AppContext from 'AppContext';
import { BlogType } from 'types';
import Blog from 'classes/blog';
import BlogList from '@/components/blog/BlogList';
import { motion } from 'motion/react';

const Blogs: NextPage = () => {
  const { user, lang } = useContext(AppContext);
  const [curBlogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogList = async () => {
    try {
      const {blogs, status} = await fetchAPI({
        url: BLOG_LIST_API,
        method: 'GET',
        body: {},
      });
      if (blogs) {
        const bs = blogs.map((b: BlogType) => new Blog(b));
        setBlogs(bs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  return (
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

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <BlogList blogs={curBlogs} />
      )}
    </div>
  );
};

export default Blogs;