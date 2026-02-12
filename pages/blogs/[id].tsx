import { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { fetchAPI, getTranslate } from 'helpers';
import { BLOG_LIST_API } from '../../constants';
import { useRouter } from 'next/router';
import AppContext from 'AppContext';
import useDebounce from 'hooks/useDebounce';
import { BlogType } from 'types';
import SEO from '@/components/SEO';
import { getBlogPostingSchema, getBreadcrumbSchema } from '../../config/seo';

const BlogDetail: NextPage = () => {
  const router = useRouter();
  const blogId = router.query.id;

  const { user, lang } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const emptyBlog: BlogType = {
    title: '',
    content: '',
    url: '',
    initialLoad: '1',
  };
  const [blog, setBlog] = useState(emptyBlog);

  const debounceUpdateContent = useDebounce(blog.content, 1000);

  useEffect(() => {
    if (!blog.initialLoad && debounceUpdateContent) {
      updateBlog();
    }
  }, [debounceUpdateContent]);

  const fetchBlogDetail = async () => {
    if (!blogId || blogId === 'new') return;
    const response = await fetchAPI({
      url: `${BLOG_LIST_API}/${blogId}`,
      method: 'GET',
      body: {},
    });
    if (response) {
      setBlog(response);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [blogId]);

  const handleBlogChange = (e: any) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const updateBlog = async () => {
    setLoading(true);
    let url = `${BLOG_LIST_API}/`;
    let method = 'POST';
    if (blogId !== 'new') {
      url += blogId;
      method = 'PUT';
    }
    const response = await fetchAPI({
      url,
      body: blog,
      method,
    });
    setLoading(false);
    if (blogId === 'new') {
      router.replace(`/blogs/${response._id}`);
    }
  };

  const handleBlogSubmit = async (e: any) => {
    e.preventDefault();
    await updateBlog();
  };

  const formatDisplayHTML = (html: string) => {
    let formatedHTML = html
      .replaceAll('<h2>', '<h2 class="text-3xl mt-3 font-bold">')
      .replaceAll('<h3>', '<h3 class="text-2xl mt-3 font-semibold">')
      .replaceAll('<p>', '<p class="text-xl">');
    return formatedHTML;
  };

  // Extract plain text for meta description
  const getPlainText = (html: string) => {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160);
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blogs' },
    { name: blog.title || 'Blog Post', url: `/blogs/${blogId}` },
  ];

  const jsonLd = blogId !== 'new' && blog.title ? [
    getBlogPostingSchema({
      title: blog.title,
      content: blog.content,
      createdAt: blog.created_at || new Date().toISOString(),
      url: `/blogs/${blogId}`,
    }),
    getBreadcrumbSchema(breadcrumbs),
  ] : [];

  return (
    <>
      {blogId !== 'new' && blog.title && (
        <SEO
          title={`${blog.title} | Blog - Sam Li`}
          description={getPlainText(blog.content) || 'Technical article by Sam Li'}
          keywords={[
            'blog post',
            'technical article',
            'web development',
            'programming',
          ]}
          url={`/blogs/${blogId}`}
          type="article"
          jsonLd={jsonLd}
          canonical={`https://samliweisen.dev/blogs/${blogId}`}
        />
      )}
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <section
        dangerouslySetInnerHTML={{ __html: formatDisplayHTML(blog.content) }}
      ></section>

      {user._id && (
        <form className="mt-3" onSubmit={handleBlogSubmit}>
          <label htmlFor="title">Title</label>
          <input
            className="mb-3 w-full p-2 rounded-sm"
            name="title"
            id="title"
            onChange={(e) => handleBlogChange(e)}
            value={blog.title}
          />
          <textarea
            className="w-full p-2 h-96 rounded-sm"
            name="content"
            value={blog.content}
            onChange={(e) => handleBlogChange(e)}
          ></textarea>

          <button type="submit" className="button">
            {getTranslate(lang, loading ? 'updating' : 'update')}
          </button>
        </form>
      )}
    </>
  );
};

export default BlogDetail;
