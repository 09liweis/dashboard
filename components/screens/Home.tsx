import Link from "next/link";
import Projects from "@/components/resume/Projects";
import Blog from "classes/blog";
import BlogList from "@/components/blog/BlogList";
import { BlogType } from "types";

const skills = [
  { name: "React", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "TypeScript", category: "Language" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Python", category: "Language" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "15+", label: "Technologies Mastered" },
];

const services = [
  {
    title: "Legacy CMS to Modern Stack Migration",
    description:
      "Reduce hosting costs by up to 80% by migrating WordPress or Wix sites to high-performance static architectures built with Next.js or Astro.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    title: "Full-Stack Web Application Development",
    description:
      "End-to-end development of scalable applications using React, Next.js, and Node.js — from internal dashboards and SaaS platforms to consumer-facing products.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Performance & Core Web Vitals Optimization",
    description:
      "Diagnose and resolve front-end bottlenecks through image optimization, code splitting, and caching strategies to achieve sub-second load times.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "API Development & Third-Party Integration",
    description:
      "Design and implement secure REST APIs alongside seamless integrations with payment processors, authentication providers, and cloud services.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
  },
];

interface HomeProps {
  latestBlogs: BlogType[];
}

export default function Home({ latestBlogs }: HomeProps) {
  const curBlogs = latestBlogs.map((b) => new Blog(b));
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-20">
          <div className="max-w-3xl">
            {/* Status badge */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm font-medium text-emerald-800 p-2">
                  Available for new projects
                </span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50">
                <span className="text-2xl font-extrabold text-amber-700">
                  $0
                </span>
                <span className="text-sm font-medium text-amber-800">
                  Monthly Hosting Fee
                </span>
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-4 lh-tight">
              Sam Li
            </h1>

            {/* Role */}
            <p className="text-xl md:text-2xl font-semibold text-gray-500 mb-6">
              Senior Full Stack Developer
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-10">
              I design and build high-performance web applications across the
              full stack — from database architecture and REST APIs to polished,
              accessible front-end interfaces. With over a decade of experience
              delivering production software, I help teams ship faster and
              systems run leaner.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/resume">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors cursor-pointer">
                  View My Work
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
              <a href="mailto:weisen.li@hotmail.com">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                  Get in Touch
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 -z-10 bg-grid-pattern" />
      </section>

      {/* ─── Stats ─────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              How I Can Help
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-gray-200 rounded-xl overflow-hidden">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 md:p-10 group hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white mb-5">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technologies ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              Tech Stack
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Core Technologies
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group flex items-center gap-3 px-5 py-3 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all cursor-default"
              >
                <span className="text-base font-semibold text-gray-900">
                  {skill.name}
                </span>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Selected Work
            </h2>
          </div>
          <Projects />
        </div>
      </section>

      {/* ─── Latest Blog Posts ──────────────────────────────────────────── */}
      {curBlogs.length > 0 && (
        <section className="py-20 md:py-28 bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 mb-3">
                  Blog
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  Latest Articles
                </h2>
              </div>
              <Link href="/blogs">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                  View all
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
            <BlogList blogs={curBlogs} />
          </div>
        </section>
      )}

      {/* ─── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Whether you&apos;re looking to modernize an existing system,
              reduce infrastructure costs, or bring a new product to market —
              I&apos;d welcome the opportunity to discuss how I can contribute.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:weisen.li@hotmail.com">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
                  Get a Free Quote
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
              <Link href="/blogs">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-semibold border border-gray-700 hover:border-gray-500 hover:text-white transition-colors cursor-pointer">
                  View Case Studies
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
