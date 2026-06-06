import Link from "next/link";
import { getBreadcrumbSchema } from "../../config/seo";
import { BLOG_POSTS } from "../../data/blogs";
import { PROJECTS, Project } from "../../data/projects";
import { BlogType } from "../../types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap | Sam Li",
  description: "A complete index of all pages on samliweisen.dev — projects, blog articles, and tools.",
  alternates: {
    canonical: "https://samliweisen.dev/sitemap",
  },
  robots: {
    index: false,
    follow: false,
  },
};

interface SitemapGroup {
  title: string;
  description: string;
  links: { label: string; url: string; description?: string }[];
}

export default function SitemapPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Sitemap", url: "/sitemap" },
  ];

  const jsonLd = [getBreadcrumbSchema(breadcrumbs)];

  const mainPages: SitemapGroup = {
    title: "Main Pages",
    description: "Primary navigation pages.",
    links: [
      { label: "Home", url: "/", description: "Portfolio landing page" },
      { label: "About / Resume", url: "/resume", description: "Professional resume, skills, and experience" },
      { label: "Cost Calculator", url: "/calculator", description: "Estimate your website project cost" },
      { label: "Blogs", url: "/blogs", description: "Technical articles and case studies" },
      { label: "FAQs", url: "/faq", description: "Frequently asked questions" },
    ],
  };

  const projectLinks = PROJECTS.filter((p): p is Project & { slug: string } => !!p.slug).map((p) => ({
    label: p.name,
    url: `/projects/${p.slug}`,
    description: p.description,
  }));

  const projectsGroup: SitemapGroup = {
    title: "Projects",
    description: `${projectLinks.length} portfolio projects across client work, SaaS, and personal builds.`,
    links: projectLinks,
  };

  const blogLinks = BLOG_POSTS.map((b: BlogType) => ({
    label: b.title as string,
    url: `/blogs/${b.url || b._id}`,
    description: b.excerpt as string | undefined,
  }));

  const blogsGroup: SitemapGroup = {
    title: "Blog Articles",
    description: `${blogLinks.length} technical articles and case studies.`,
    links: blogLinks,
  };

  const groups = [mainPages, projectsGroup, blogsGroup];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <div className="min-h-screen bg-white">
        <section className="border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">Sitemap</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">All Pages</h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl">A complete index of every page on this site.</p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 space-y-16">
            {groups.map((group) => (
              <div key={group.title}>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{group.title}</h2>
                  <p className="text-sm text-gray-500">{group.description}</p>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {group.links.map((link, i) => (
                    <Link key={link.url} href={link.url}>
                      <div
                        className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
                          i !== 0 ? "border-t border-gray-100" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {link.label}
                          </span>
                          {link.description && (
                            <span className="block text-xs text-gray-400 mt-0.5 truncate">{link.description}</span>
                          )}
                        </div>
                        <span className="flex-shrink-0 text-xs font-mono text-gray-400 group-hover:text-gray-600 transition-colors hidden sm:block">
                          {link.url}
                        </span>
                        <svg className="flex-shrink-0 w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
