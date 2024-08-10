import { useState, useEffect, useContext } from 'react';
import type { NextPage } from 'next';
import { fetchAPI, getTranslate } from 'helpers';
import { BLOG_LIST_API, buttonStyle } from '../../constants';
import Link from 'next/link';
import AppContext from 'AppContext';
import { BlogType } from 'types';
import Blog from 'classes/blog';

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
      const bs = response.map((b: BlogType) => new Blog(b));
      setBlogs(bs);
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  const blogsHTML = blogs.map((b) => (
    <Link key={b.getId()} href={`/blogs/${b.getId()}`}>
      <article className="mb-2 p-2 rounded cursor-pointer transition duration-300 hover:bg-gray-300">
        <h2 className="text-2xl">{b.getTitle()}</h2>
        <p>{b.getShortContent()}</p>
        <span className="text-sm text-gray-200">{b.getCreatedAt()}</span>
      </article>
    </Link>
  ));

  return (
    <>
      {user._id && (
        <Link href="/blogs/new">
          <span className={`${buttonStyle} inline-block mb-2`}>
            {getTranslate(lang, 'addNew')}
          </span>
        </Link>
      )}
      {blogsHTML}
    </>
  );
};

export default Blogs;
