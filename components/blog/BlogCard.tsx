import Link from "next/link";
import Blog from "classes/blog";

interface BlogCardProps {
  blog: Blog;
  index?: number;
  featured?: boolean;
}

const CATEGORIES = [
  "Web Development",
  "Cost Optimization",
  "Static Hosting",
  "Platform Engineering",
];

export default function BlogCard({
  blog,
  index = 0,
  featured = false,
}: BlogCardProps) {
  const category = CATEGORIES[index % CATEGORIES.length];

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50">
        <Link
          href={`/blogs/${blog.getUrl()}`}
          className="flex flex-col lg:flex-row"
        >
          {/* Featured image area */}
          <div className="relative flex-shrink-0 overflow-hidden bg-slate-100 lg:w-1/2">
            <div className="flex h-56 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-8 lg:h-full lg:min-h-card">
              <div className="space-y-4 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Featured
                </span>
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl transition-colors duration-200">
                  {blog.getTitle()}
                </h2>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-300 line-clamp-2">
                  {blog.getExcerpt()}
                </p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 lg:bottom-6 lg:left-6 lg:right-6">
              <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                {category}
              </span>
            </div>
          </div>

          {/* Content area */}
          <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <time
                  className="font-medium text-slate-900"
                  dateTime={blog.getUrl()}
                >
                  {blog.getFormattedDate()}
                </time>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-slate-500">{blog.getReadingTime()}</span>
              </div>

              <p className="text-base leading-relaxed text-slate-600 line-clamp-4 lg:line-clamp-5">
                {blog.getExcerpt()}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200/50">
                  Web Dev
                </span>
                <span className="rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200/50">
                  Performance
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 transition-all duration-200 group-hover:text-blue-600">
                Read article
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/40">
      <Link href={`/blogs/${blog.getUrl()}`} className="block p-6 sm:p-7">
        {/* Top row: Category + Meta */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 ring-1 ring-inset ring-slate-200/50">
            {category}
          </span>
          <span className="text-xs text-slate-400">
            {blog.getReadingTime()}
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-2xl line-clamp-2">
          {blog.getTitle()}
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-2">
          {blog.getExcerpt()}
        </p>

        {/* Bottom row */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <time
            className="text-xs font-medium text-slate-400"
            dateTime={blog.getUrl()}
          >
            {blog.getFormattedDate()}
          </time>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition-all duration-200 group-hover:text-blue-600">
            Read
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
