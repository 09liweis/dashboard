import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import Icon from '../components/Icon';
import { COMMENT_LIST_API, TODO_LIST_API } from '../constants';
import { fetchAPI, getTranslate } from '../helpers';

const DASHBOARD_CARDS = [
  { tl: 'todos', icon: 'list', bg: 'blue-400/75' },
  { tl: 'comments', icon: 'comments', bg: 'red-400/75' },
  { tl: 'expense', icon: 'dollar-sign', bg: 'green-500/75' },
  { tl: 'places', icon: 'location-dot', bg: 'indigo-500/75' },
  { tl: 'blogs', icon: 'blog', bg: 'purple-500/75' },
  { tl: 'movie', icon: 'film', bg: 'teal-600/75' },
];

type Todo = {
  _id: string;
  name: string;
  status: string;
  date: string;
};

type Comment = {
  _id: string;
  content: string;
};

async function fetchTodos(): Promise<Array<Todo>> {
  return await fetchAPI({
    url: TODO_LIST_API,
    method: 'GET',
    body: {},
  });
}

async function fetchComments(): Promise<Array<Comment>> {
  return await fetchAPI({
    url: COMMENT_LIST_API,
    method: 'GET',
    body: {},
  });
}

const Home: NextPage = () => {
  const { user, lang } = useContext(AppContext);

  const emptyTodos: Array<Todo> = [];
  const [todos, setTodos] = useState(emptyTodos);

  const emptyComments: Array<Comment> = [];
  const [comments, setComments] = useState(emptyComments);

  const renderCards = (type: string) => {
    const cardMapping: { [key: string]: any } = {
      todos: todos.map((todo) => <article key={todo._id}>{todo.name}</article>),
      comments: comments.map((comment) => (
        <article key={comment._id}>{comment.content}</article>
      )),
    };
    return cardMapping[type];
  };

  const fetchDashBoardData = async () => {
    const [newTodos, newComments] = await Promise.all([
      fetchTodos(),
      fetchComments(),
    ]);
    setTodos(newTodos);
    setComments(newComments);
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);
  return (
    <section className="flex flex-wrap">
      {DASHBOARD_CARDS.map(({ tl, icon, bg }) => (
        <article key={tl} className="p-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className={`p-2 drop-shadow-md shadow-lg bg-${bg}`}>
            <h2 className="text-2xl text-white capitalize">
              <Icon name={icon} classNames={'mr-2'} />
              {getTranslate(lang, tl)}
            </h2>
            {renderCards(tl)}
          </div>
        </article>
      ))}
    </section>
  );
};

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      visual: {},
    },
  };
};

export default Home;
