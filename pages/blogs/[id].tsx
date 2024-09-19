import { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { fetchAPI, getTranslate } from 'helpers';
import { BLOG_LIST_API } from '../../constants';
import { useRouter } from 'next/router';
import AppContext from 'AppContext';
import useDebounce from 'hooks/useDebounce';
import { BlogType } from 'types';

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
      .replaceAll('<h2>', '<h2 class="text-3xl mt-3">')
      .replaceAll('<p>', '<p class="text-xl">');
    return formatedHTML;
  };

  return (
    <>
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <section
        dangerouslySetInnerHTML={{ __html: formatDisplayHTML(blog.content) }}
      ></section>

      {user._id && (
        <form className="mt-3" onSubmit={handleBlogSubmit}>
          <label htmlFor="title">Title</label>
          <input
            className="mb-3 w-full p-2 rounded"
            name="title"
            id="title"
            onChange={(e) => handleBlogChange(e)}
            value={blog.title}
          />
          <textarea
            className="w-full p-2 h-96 rounded"
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
