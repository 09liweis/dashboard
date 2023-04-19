import { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { fetchAPI, getTranslate } from '../../helpers';
import { BLOG_LIST_API, buttonStyle } from '../../constants';
import Link from 'next/link';
import AppContext from '../../AppContext';
import { Blog } from '../../types';

const Blogs: NextPage = () => {
  const { user, lang } = useContext(AppContext);

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
      <article className="mb-2 p-2 rounded cursor-pointer transition duration-300 hover:bg-gray-300">
        <h2 className="text-2xl">{b.title}</h2>
        <p>{b.content.substring(0, 200).replace(/(<([^>]+)>)/gi, '')}</p>
        <span className="text-sm text-gray-200">{b.created_at}</span>
      </article>
    </Link>
  ));

  return (
    <>
      {user._id && (
        <Link href="/blogs/new">
          <span className={buttonStyle}>{getTranslate(lang, 'addNew')}</span>
        </Link>
      )}
      {blogsHTML}
    </>
  );
};

export default Blogs;
