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
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 px-6 py-20 text-center"
      >
        <div className="inline-flex items-center justify-center rounded-2xl bg-slate-100 p-5 ring-1 ring-slate-200/60">
          <svg
            className="h-10 w-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
            />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-slate-900">No blog posts yet</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
          Check back soon for technical articles and insights on web development and software engineering.
        </p>
      </motion.div>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <div className="space-y-8">
      {/* Featured post — full width */}
      <BlogCard blog={featured} index={0} featured />

      {/* Remaining posts — 2-column grid */}
      {rest.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((blog, index) => (
            <BlogCard key={blog.getId()} blog={blog} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
