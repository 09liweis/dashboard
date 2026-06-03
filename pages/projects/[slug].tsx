import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS, PROJECT_CATEGORIES, Project } from '../../data/projects';
import SEO from '@/components/SEO';
import { getBreadcrumbSchema } from '../../config/seo';

interface ProjectDetailPageProps {
  project: Project;
}

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  PROJECT_CATEGORIES.map((c) => [c.id, c.label])
);

const ProjectDetailPage: NextPage<ProjectDetailPageProps> = ({ project }) => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Resume', url: '/resume' },
    { name: project.name, url: `/projects/${project.slug}` },
  ];

  const jsonLd = [getBreadcrumbSchema(breadcrumbs)];

  return (
    <>
      <SEO
        title={`${project.name} | Project - Sam Li`}
        description={project.description}
        keywords={['project', ...project.technologies, project.category]}
        url={`/projects/${project.slug}`}
        type="article"
        jsonLd={jsonLd}
        canonical={`https://samliweisen.dev/projects/${project.slug}`}
      />

      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
        {/* Back navigation */}
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Resume
        </Link>

        <div>
          {/* Header */}
          <header className="mb-10 pb-8 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 border border-slate-200 capitalize">
                {CATEGORY_LABELS[project.category] || project.category}
              </span>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Site
                </a>
              )}
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-4">{project.name}</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{project.description}</p>
          </header>

          {project.screenshots && project.screenshots.length > 0 && (
            <section className="mb-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">
                Project Screenshots
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {project.screenshots.map((screenshot, index) => (
                  <figure
                    key={screenshot.src}
                    className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${
                      index === 0 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="bg-slate-100 p-2">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        width={1200}
                        height={760}
                        className="h-auto w-full rounded-xl border border-slate-200 bg-white"
                        priority={index === 0}
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-sm text-slate-600">
                      {screenshot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {project.longDescription && (
            <div className="mb-10 prose prose-slate max-w-none">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">
                About This Project
              </h2>
              <p className="text-slate-700 leading-relaxed text-base">{project.longDescription}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-10">
            {/* Technologies */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm font-medium bg-slate-900 text-white rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <svg
                      className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* CTA */}
          {project.url && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                View Live Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PROJECTS.map((project) => ({
    params: { slug: project.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<ProjectDetailPageProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: { project },
  };
};

export default ProjectDetailPage;
