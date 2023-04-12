import { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { fetchAPI } from '../../helpers';
import { BLOG_LIST_API, buttonStyle } from '../../constants';
import Link from 'next/link';
import AppContext from '../../AppContext';

interface Blog {
  _id: string;
  title: string;
  url: string;
  content: string;
  created_at: string;
}

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
    <article key={b._id}>
      <Link href={`/blogs/${b._id}`}>{b.title}</Link>
    </article>
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
