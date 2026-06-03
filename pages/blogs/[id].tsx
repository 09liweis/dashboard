import { useState } from "react";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { BlogType } from "types";
import SEO from "@/components/SEO";
import {
  getBlogPostingSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getSpeakableSchema,
  GEO_META,
  extractSections,
  stripHtml,
} from "../../config/seo";
import { BLOG_POSTS } from "../../data/blogs";
import fs from "fs";
import path from "path";

interface BlogDetailPageProps {
  blog: BlogType;
  blogId: string;
  isNew: boolean;
}

const emptyBlog: BlogType = {
  _id: "new",
  title: "",
  content: "",
  url: "",
  initialLoad: "1",
};

const BlogDetail: NextPage<BlogDetailPageProps> = ({
  blog: initialBlog,
  blogId,
  isNew,
}) => {
  const [blog, setBlog] = useState(initialBlog || emptyBlog);

  const formatDisplayHTML = (html: string) => {
    let formatedHTML = html
      .replaceAll(
        "<h2>",
        '<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-3 scroll-mt-20">'
      )
      .replaceAll(
        "<h3>",
        '<h3 class="text-xl font-semibold text-slate-800 mt-8 mb-2 scroll-mt-20">'
      )
      .replaceAll("<p>", '<p class="text-base leading-7 text-slate-600 mb-5">')
      .replaceAll("<ul>", '<ul class="my-4 ml-6 list-disc space-y-2">')
      .replaceAll("<ol>", '<ol class="my-4 ml-6 list-decimal space-y-2">')
      .replaceAll("<li>", '<li class="text-base leading-7 text-slate-600">')
      .replaceAll(
        "<blockquote>",
        '<blockquote class="my-6 pl-4 border-l-4 border-slate-400 italic text-slate-600">'
      )
      .replaceAll(
        "<code>",
        '<code class="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-sm font-mono rounded">'
      )
      .replaceAll("<strong>", '<strong class="font-semibold text-slate-900">')
      .replaceAll("<img", '<img class="rounded-lg my-6 w-full"');
    return formatedHTML;
  };

  const getPlainText = (html: string, maxLength = 160) => {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, maxLength);
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
    { name: blog.title || "Blog Post", url: `/blogs/${blogId}` },
  ];

  // GEO: extract sections and generate AI-friendly summary
  const sections = blog.content ? extractSections(blog.content) : [];
  const aiSummary = blog.content ? stripHtml(blog.content, 320) : "";
  const blogAbstract = blog.content ? getPlainText(blog.content, 300) : "";
  const geoAbout = [
    "Web Development",
    "Software Engineering",
    "Frontend Development",
    "Static Site Hosting",
    "Cost Optimization",
  ];

  const jsonLd =
    !isNew && blog.title
      ? [
          getBlogPostingSchema({
            title: blog.title,
            content: blog.content,
            createdAt: blog.created_at || new Date().toISOString(),
            url: `/blogs/${blogId}`,
            abstract: blogAbstract,
            about: geoAbout.map((t) => ({ "@type": "Thing", name: t })),
            keywords: [
              "web development",
              "programming",
              "software engineering",
              "static hosting",
              ...sections,
            ],
          }),
          getBreadcrumbSchema(breadcrumbs),
          ...(sections.length > 0 ? [getFAQSchema(sections)] : []),
          getSpeakableSchema(`/blogs/${blogId}`, blog.title, blogAbstract),
        ]
      : [];

  return (
    <>
      {!isNew && blog.title && (
        <SEO
          title={`${blog.title} | Blog - Sam Li`}
          description={
            blog.excerpt ||
            getPlainText(blog.content) ||
            "Technical article by Sam Li"
          }
          keywords={[
            "blog post",
            "technical article",
            "web development",
            "programming",
            "static hosting",
            "cost optimization",
          ]}
          url={`/blogs/${blogId}`}
          type="article"
          jsonLd={jsonLd}
          canonical={`https://samliweisen.dev/blogs/${blogId}`}
          geoPlaceName={GEO_META.placeName}
          geoRegion={GEO_META.region}
          geoPosition={GEO_META.position}
          aiSummary={aiSummary}
          sections={sections}
          abstract={blogAbstract}
          about={geoAbout}
        />
      )}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        {/* Back navigation */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-8"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to articles
        </Link>

        <div className="grid gap-10 xl:grid-cols-blog-layout">
          <article>
            {/* Header */}
            <header className="mb-8 pb-6 border-b border-slate-200">
              {blog.created_at && (
                <time
                  className="text-sm text-slate-500"
                  dateTime={blog.created_at}
                >
                  {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                    new Date(blog.created_at)
                  )}
                </time>
              )}
              <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                {blog.title}
              </h1>
              {blog.excerpt && (
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
              {blog.projectName && blog.projectUrl && (
                <p className="mt-4 text-sm text-slate-600">
                  Project: <a
                    href={blog.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-slate-900 hover:text-blue-600"
                  >
                    {blog.projectName}
                  </a>
                </p>
              )}
              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                  Web Development
                </span>
                <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                  Cost Optimization
                </span>
                <span className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                  Static Hosting
                </span>
              </div>
            </header>

            {/* Content */}
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: formatDisplayHTML(blog.content),
              }}
            />
          </article>

          {blog.projectName && blog.projectUrl && (
            <aside className="hidden xl:block">
              <div className="sticky top-24 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide-lg text-slate-500">
                  Related project
                </p>
                <h2 className="mt-4 text-xl font-semibold text-slate-900">
                  {blog.projectName}
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  This blog post is tied to a live project. Visit the project site anytime from this panel.
                </p>
                <a
                  href={blog.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  View project
                </a>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = BLOG_POSTS.map((post) => ({
    params: { id: post.url || post._id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  BlogDetailPageProps
> = async ({ params }) => {
  const rawId = params?.id;
  const blogId =
    typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";

  const blogMeta = BLOG_POSTS.find(
    (post) => post._id === blogId || post.url === blogId
  );

  if (!blogMeta) {
    return {
      notFound: true,
    };
  }

  // Load content from separate JSON file named after the blog url
  let content = "";
  try {
    const jsonPath = path.join(
      process.cwd(),
      "data",
      "blogs",
      `${blogMeta.url}.json`
    );
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    content = jsonData.content || "";
  } catch {
    content = "";
  }

  const blog: BlogType = { ...blogMeta, content };

  return {
    props: {
      blog,
      blogId,
      isNew: false,
    },
  };
};

export default BlogDetail;
