import { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { fetchAPI } from '../../helpers';
import { BLOG_LIST_API, buttonStyle } from '../../constants';
import Link from 'next/link';
import AppContext from '../../AppContext';
import { Blog } from '../../types';

const Blogs: NextPage = () => {
  const { user } = useContext(AppContext);

  const emptyBlogs: Array<Blog> = [];
  const [blogs, setBlogs] = useState(emptyBlogs);

  const fetchBlogList = async () => {
    const response = await fetchAPI({
      url: BLOG_LIST_API,
      method: 'GET',
      body: {},
    });
    if (response) {
      setBlogs(response);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  const blogsHTML = blogs.map((b) => (
    <Link key={b._id} href={`/blogs/${b._id}`}>
      <article className="mb-2 cursor-pointer">
        <h2 className="text-2xl">{b.title}</h2>
        <span className="text-sm text-gray-200">{b.created_at}</span>
      </article>
    </Link>
  ));

  return (
    <section className="">
      {user._id && (
        <Link href="/blogs/new">
          <span className={buttonStyle}>Add New</span>
        </Link>
      )}
      {blogsHTML}
    </section>
  );
};

export default Blogs;
