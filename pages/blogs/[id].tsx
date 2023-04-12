import { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { fetchAPI } from '../../helpers';
import { BLOG_LIST_API, buttonStyle } from '../../constants';
import { useRouter } from 'next/router';
import AppContext from '../../AppContext';
import useDebounce from '../../hooks/useDebounce';

interface Blog {
  // _id?: string;
  title: string;
  url: string;
  content: string;
  // created_at?: string;
  [key: string]: string;
}

const BlogDetail: NextPage = () => {
  const router = useRouter();
  const blogId = router.query.id;

  const { user, lang } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const emptyBlog: Blog = { title: '', content: '', url: '' };
  const [blog, setBlog] = useState(emptyBlog);

  const debounceUpdateContent = useDebounce(blog.content, 1000);

  useEffect(() => {
    if (debounceUpdateContent) {
      updateBlog();
    }
  }, [debounceUpdateContent]);

  const fetchBlogDetail = async () => {
    if (!blogId) return;
    if (blogId === 'new') return;
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
    const updatedBlog = { ...blog };
    updatedBlog[name] = value;
    setBlog(updatedBlog);
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
  };

  const handleBlogSubmit = async (e: any) => {
    e.preventDefault();
    await updateBlog();
  };

  return (
    <section className="">
      <h1>{blog.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: blog.content }}></section>

      {user._id && (
        <form className="mt-3" onSubmit={handleBlogSubmit}>
          <label>Title</label>
          <input
            className="mb-3 w-full"
            name="title"
            onChange={(e) => handleBlogChange(e)}
            value={blog.title}
          />
          <textarea
            className="w-full p-2 h-96"
            name="content"
            value={blog.content}
            onChange={(e) => handleBlogChange(e)}
          ></textarea>

          <button type="submit" className={buttonStyle}>
            {loading ? 'Updating' : 'Update'}
          </button>
        </form>
      )}
    </section>
  );
};

export default BlogDetail;
