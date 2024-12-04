import { motion } from 'motion/react';
import Blog from 'classes/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <svg 
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" 
          />
        </svg>
        <h3 className="text-xl font-medium text-gray-900">No blogs found</h3>
        <p className="text-gray-500">Start writing your first blog post!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.getId()} blog={blog} />
      ))}
    </div>
  );
}