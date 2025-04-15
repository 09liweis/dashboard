import { motion } from 'motion/react';
import Link from 'next/link';
import Blog from 'classes/blog';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-xs border border-gray-100 p-6 mb-4 hover:border-blue-500 transition-all"
    >
      <Link href={`/blogs/${blog.getId()}`}>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            {blog.getTitle()}
          </h2>
          <p className="text-gray-600 line-clamp-3">
            {blog.getShortContent()}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {blog.getCreatedAt()}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}