import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { BlogType } from "../../../types";
import {
  getBlogPostingSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getSpeakableSchema,
  extractSections,
} from "../../../config/seo";
import { BLOG_POSTS } from "../../../data/blogs";
import { BlogContent } from "./BlogContent";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    id: post.url || post._id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const blogMeta = BLOG_POSTS.find(
    (post) => post._id === id || post.url === id
  );

  if (!blogMeta) {
    return { title: "Blog Post Not Found" };
  }

  // Load content from JSON file
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

  const getPlainText = (html: string, maxLength = 160) => {
    return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().substring(0, maxLength);
  };

  const description = blogMeta.excerpt || getPlainText(content) || "Technical article by Sam Li";

  return {
    title: `${blogMeta.title} | Blog - Sam Li`,
    description,
    keywords: ["blog post", "technical article", "web development", "programming", "static hosting", "cost optimization"],
    alternates: {
      canonical: `https://samliweisen.dev/blogs/${id}`,
    },
    openGraph: {
      type: "article",
      title: `${blogMeta.title} | Blog - Sam Li`,
      description,
      url: `https://samliweisen.dev/blogs/${id}`,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const blogMeta = BLOG_POSTS.find(
    (post) => post._id === id || post.url === id
  );

  if (!blogMeta) {
    notFound();
  }

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

  const getPlainText = (html: string, maxLength = 160) => {
    return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().substring(0, maxLength);
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blogs" },
    { name: blog.title || "Blog Post", url: `/blogs/${id}` },
  ];

  const sections = blog.content ? extractSections(blog.content) : [];
  const blogAbstract = blog.content ? getPlainText(blog.content, 300) : "";
  const geoAbout = [
    "Web Development",
    "Software Engineering",
    "Frontend Development",
    "Static Site Hosting",
    "Cost Optimization",
  ];

  const jsonLd = blog.title
    ? [
        getBlogPostingSchema({
          title: blog.title,
          content: blog.content,
          createdAt: blog.created_at || new Date().toISOString(),
          url: `/blogs/${id}`,
          abstract: blogAbstract,
          about: geoAbout.map((t) => ({ "@type": "Thing", name: t })),
          keywords: ["web development", "programming", "software engineering", "static hosting", ...sections],
        }),
        getBreadcrumbSchema(breadcrumbs),
        ...(sections.length > 0 ? [getFAQSchema(sections)] : []),
        getSpeakableSchema(`/blogs/${id}`, blog.title, blogAbstract),
      ]
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <BlogContent blog={blog} />
    </>
  );
}
