import Blog from "classes/blog";
import BlogList from "@/components/blog/BlogList";
import { getBreadcrumbSchema, SITE_CONFIG } from "../../config/seo";
import { BLOG_POSTS } from "../../data/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Technical Articles & Insights | Sam Li",
  description:
    "Read technical articles and insights about web development, React, Vue.js, Node.js, TypeScript, and modern software engineering practices.",
  keywords: [
    "blog",
    "technical articles",
    "web development tutorials",
    "programming insights",
    "React tutorials",
    "Vue.js tutorials",
    "Node.js tutorials",
    "static site hosting",
    "budget web development",
    "CRM integration",
  ],
  alternates: {
    canonical: "https://samliweisen.dev/blogs",
  },
};

export default function BlogsPage() {
  const curBlogs = BLOG_POSTS.map((b) => new Blog(b));

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
  ];

  const jsonLd = [
    getBreadcrumbSchema(breadcrumbs),
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Sam Li Blog",
      description:
        "Technical articles and insights about web development, programming, and software engineering",
      url: "https://samliweisen.dev/blogs",
      isAccessibleForFree: true,
      license: "https://creativecommons.org/licenses/by/4.0/",
      inLanguage: "en-US",
      author: {
        "@type": "Person",
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.siteUrl,
      },
      publisher: {
        "@type": "Person",
        name: SITE_CONFIG.author,
      },
      blogPost: BLOG_POSTS.map((b) => ({
        "@type": "BlogPosting",
        headline: b.title,
        description: b.excerpt || "",
        url: `${SITE_CONFIG.siteUrl}/blogs/${b.url || b._id}`,
        datePublished: b.created_at,
        author: {
          "@type": "Person",
          name: SITE_CONFIG.author,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 lg:py-20">
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Blog
                </span>
                <span className="text-sm text-slate-400">
                  {curBlogs.length} article{curBlogs.length !== 1 ? "s" : ""}
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
                {["Web Dev", "Performance", "Architecture", "Tutorials"].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 h-px bg-slate-200" />
        </header>
        <BlogList blogs={curBlogs} />
      </div>
    </>
  );
}
