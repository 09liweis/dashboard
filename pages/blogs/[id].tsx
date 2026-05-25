import { useState, useEffect, useContext } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { fetchAPI, getTranslate } from 'helpers';
import { BLOG_LIST_API } from '../../constants';
import { useRouter } from 'next/router';
import AppContext from 'AppContext';
import useDebounce from 'hooks/useDebounce';
import { BlogType } from 'types';
import SEO from '@/components/SEO';
import { getBlogPostingSchema, getBreadcrumbSchema, getFAQSchema, getSpeakableSchema, GEO_META, extractSections, stripHtml } from '../../config/seo';
import { BLOG_POSTS } from '../../data/blogs';

interface BlogDetailPageProps {
  blog: BlogType;
  blogId: string;
  isNew: boolean;
}

const emptyBlog: BlogType = {
  _id: 'new',
  title: '',
  content: '',
  url: '',
  initialLoad: '1',
};

const BlogDetail: NextPage<BlogDetailPageProps> = ({ blog: initialBlog, blogId, isNew }) => {
  const router = useRouter();
  const { user, lang } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(initialBlog || emptyBlog);

  const debounceUpdateContent = useDebounce(blog.content, 1000);

  useEffect(() => {
    if (!blog.initialLoad && debounceUpdateContent) {
      updateBlog();
    }
  }, [debounceUpdateContent]);

  const handleBlogChange = (e: any) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const updateBlog = async () => {
    setLoading(true);
    let url = `${BLOG_LIST_API}/`;
    let method = 'POST';
    if (!isNew) {
      url += blogId;
      method = 'PUT';
    }
    const response = await fetchAPI({
      url,
      body: blog,
      method,
    });
    setLoading(false);
    if (isNew) {
      router.replace(`/blogs/${response._id}`);
    }
  };

  const handleBlogSubmit = async (e: any) => {
    e.preventDefault();
    await updateBlog();
  };

  const formatDisplayHTML = (html: string) => {
    let formatedHTML = html
      .replaceAll('<h2>', '<h2 class="text-2xl sm:text-3xl mt-12 mb-4 font-bold text-slate-900 tracking-tight scroll-mt-24">')
      .replaceAll('<h3>', '<h3 class="text-xl sm:text-2xl mt-10 mb-3 font-semibold text-slate-800 tracking-tight scroll-mt-24">')
      .replaceAll('<p>', '<p class="text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 mb-6">')
      .replaceAll('<ul>', '<ul class="my-4 ml-6 list-disc space-y-2 text-slate-600">')
      .replaceAll('<ol>', '<ol class="my-4 ml-6 list-decimal space-y-2 text-slate-600">')
      .replaceAll('<li>', '<li class="text-base sm:text-lg leading-7 pl-1">')
      .replaceAll('<blockquote>', '<blockquote class="my-8 border-l-4 border-slate-300 bg-slate-50/50 py-4 pl-6 pr-4 rounded-r-lg italic text-slate-500">')
      .replaceAll('<code>', '<code class="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-700 ring-1 ring-inset ring-slate-200/50">')
      .replaceAll('<strong>', '<strong class="font-semibold text-slate-900">')
      .replaceAll('<img', '<img class="rounded-xl my-8 w-full"');
    return formatedHTML;
  };

  const getPlainText = (html: string, maxLength = 160) => {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, maxLength);
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blogs' },
    { name: blog.title || 'Blog Post', url: `/blogs/${blogId}` },
  ];

  // GEO: extract sections and generate AI-friendly summary
  const sections = blog.content ? extractSections(blog.content) : [];
  const aiSummary = blog.content ? stripHtml(blog.content, 320) : '';
  const blogAbstract = blog.content ? getPlainText(blog.content, 300) : '';
  const geoAbout = [
    'Web Development',
    'Software Engineering',
    'Frontend Development',
    'Static Site Hosting',
    'Cost Optimization',
  ];

  const jsonLd = !isNew && blog.title ? [
    getBlogPostingSchema({
      title: blog.title,
      content: blog.content,
      createdAt: blog.created_at || new Date().toISOString(),
      url: `/blogs/${blogId}`,
      abstract: blogAbstract,
      about: geoAbout.map((t) => ({ '@type': 'Thing', name: t })),
      keywords: [
        'web development',
        'programming',
        'software engineering',
        'static hosting',
        ...sections,
      ],
    }),
    getBreadcrumbSchema(breadcrumbs),
    ...(sections.length > 0 ? [getFAQSchema(sections)] : []),
    getSpeakableSchema(
      `/blogs/${blogId}`,
      blog.title,
      blogAbstract
    ),
  ] : [];

  return (
    <>
      {!isNew && blog.title && (
        <SEO
          title={`${blog.title} | Blog - Sam Li`}
          description={blog.excerpt || getPlainText(blog.content) || 'Technical article by Sam Li'}
          keywords={[
            'blog post',
            'technical article',
            'web development',
            'programming',
            'static hosting',
            'cost optimization',
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
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16 lg:py-20">
        {/* Back navigation */}
        <Link
          href="/blogs"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to articles
        </Link>

        <article className="relative">
          {/* Header */}
          <header className="mb-10 space-y-6 border-b border-slate-200 pb-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Article
                </span>
                {blog.created_at && (
                  <span className="text-sm text-slate-400">
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(blog.created_at))}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {blog.title}
              </h1>
            </div>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg leading-relaxed text-slate-500">
                {blog.excerpt}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200/50">Web Development</span>
              <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200/50">Cost Optimization</span>
              <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200/50">Static Hosting</span>
            </div>
          </header>

          {/* Content */}
          <section className="prose-custom">
            <div dangerouslySetInnerHTML={{ __html: formatDisplayHTML(blog.content) }} />
          </section>
        </article>

        {user._id && (
          <form className="mt-12 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-6" onSubmit={handleBlogSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700">Title</label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                name="title"
                id="title"
                onChange={handleBlogChange}
                value={blog.title}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-slate-700">Content</label>
              <textarea
                className="mt-2 h-80 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                name="content"
                value={blog.content}
                onChange={handleBlogChange}
              ></textarea>
            </div>
            <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
              {getTranslate(lang, loading ? 'updating' : 'update')}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BlogDetailPageProps> = async ({ params }) => {
  const rawId = params?.id;
  const blogId = typeof rawId === 'string' ? rawId : Array.isArray(rawId) ? rawId[0] : '';

  if (blogId === 'new') {
    return {
      props: {
        blog: emptyBlog,
        blogId,
        isNew: true,
      },
    };
  }

  const blog = BLOG_POSTS.find((post) => post._id === blogId || post.url === blogId);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
      blogId,
      isNew: false,
    },
  };
};

export default BlogDetail;
