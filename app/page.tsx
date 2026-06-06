import Home from "@/components/screens/Home";
import { getPersonSchema, getWebsiteSchema, getProfessionalServiceSchema } from "../config/seo";
import { BLOG_POSTS } from "../data/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sam Li - Full Stack Developer | React, Vue.js, Node.js Expert",
  description:
    "Full Stack Developer with 10+ years of experience building scalable web applications. Specialized in React, Vue.js, Node.js, TypeScript, and modern web technologies. Based in Toronto, Canada.",
  keywords: [
    "portfolio",
    "Toronto developer",
    "Canada developer",
    "hire developer",
    "web development services",
  ],
  alternates: {
    canonical: "https://samliweisen.dev",
  },
  openGraph: {
    title: "Sam Li - Full Stack Developer | React, Vue.js, Node.js Expert",
    description:
      "Full Stack Developer with 10+ years of experience building scalable web applications.",
    url: "https://samliweisen.dev",
  },
};

export const revalidate = 60;

export default function HomePage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const latestBlogs = sorted.slice(0, 3);

  const jsonLd = [
    getPersonSchema(),
    getWebsiteSchema(),
    getProfessionalServiceSchema(),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Home latestBlogs={latestBlogs} />
    </>
  );
}
