import { motion } from 'motion/react';
import Link from 'next/link';
import Blog from 'classes/blog';

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

const CATEGORIES = ['Web Development', 'Cost Optimization', 'Static Hosting'];

export default function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const category = CATEGORIES[index % CATEGORIES.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40 sm:p-8"
    >
      <Link href={`/blogs/${blog.getUrl()}`} className="block space-y-5">
        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {category}
          </span>
          <span className="text-slate-400">·</span>
          <time className="text-slate-500" dateTime={blog.getUrl()}>
            {blog.getFormattedDate()}
          </time>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">{blog.getReadingTime()}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-3xl">
          {blog.getTitle()}
        </h2>

        {/* Description */}
        <p className="text-base leading-relaxed text-slate-600 line-clamp-3">
          {blog.getDescription()}
        </p>

        {/* Bottom Row: Tags + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              Web Dev
            </span>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              Performance
            </span>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              Tutorial
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
            Read article
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>

      {/* Subtle gradient accent bar on hover */}
      <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 rounded-r bg-gradient-to-b from-blue-500 to-indigo-500 transition-transform duration-300 group-hover:scale-y-100" />
    </motion.article>
  );
}