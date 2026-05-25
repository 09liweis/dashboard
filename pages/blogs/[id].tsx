import { useState, useEffect, useContext } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
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
      .replaceAll('<h2>', '<h2 class="text-3xl mt-10 font-bold text-slate-900">')
      .replaceAll('<h3>', '<h3 class="text-2xl mt-8 font-semibold text-slate-900">')
      .replaceAll('<p>', '<p class="text-lg leading-8 text-slate-700">')
      .replaceAll('<ul>', '<ul class="mt-4 ml-6 list-disc text-slate-700">')
      .replaceAll('<ol>', '<ol class="mt-4 ml-6 list-decimal text-slate-700">')
      .replaceAll('<li>', '<li class="mb-2">')
      .replaceAll('<blockquote>', '<blockquote class="border-l-4 border-slate-300 pl-4 italic text-slate-600">');
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
      <div className={`max-w-4xl mx-auto px-4 py-10 ${blog.className || ''}`}>
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100/50">
          <header className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Blog Post</p>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{blog.title}</h1>
              </div>
              {blog.created_at && (
                <p className="text-sm text-slate-500">Published {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(blog.created_at))}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Web Development</span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Cost Optimization</span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Static Hosting</span>
            </div>
            {blog.excerpt && (
              <p className="text-lg leading-relaxed text-slate-600 border-l-4 border-slate-200 pl-4 italic">
                {blog.excerpt}
              </p>
            )}
          </header>

          <section className="mt-10 space-y-8 text-slate-700 leading-8">
            <div dangerouslySetInnerHTML={{ __html: formatDisplayHTML(blog.content) }} />
          </section>
        </article>

        {user._id && (
          <form className="mt-10 space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm" onSubmit={handleBlogSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700">Title</label>
              <input
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                name="title"
                id="title"
                onChange={handleBlogChange}
                value={blog.title}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-slate-700">Content</label>
              <textarea
                className="mt-2 h-80 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                name="content"
                value={blog.content}
                onChange={handleBlogChange}
              ></textarea>
            </div>
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
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
