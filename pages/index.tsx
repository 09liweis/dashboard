import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import { COMMENT_LIST_API, TODO_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';
import styles from '../styles/Home.module.css';

const DASHBOARD_CARDS = [
  { tl: 'todos', icon: 'list', bg: 'blue-400' },
  { tl: 'comments', icon: 'comments', bg: 'red-400' },
  { tl: 'expense', icon: 'dollar-sign', bg: 'green-500' },
  { tl: 'places', icon: 'location-dot', bg: 'indigo-500' },
  { tl: 'blogs', icon: 'blog', bg: 'purple-500' },
  { tl: 'movie', icon: 'film', bg: 'teal-600' },
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
    <section className="flex flex-wrap gap-3">
      {DASHBOARD_CARDS.map(({ tl, icon, bg }) => (
        <article key={tl} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className={`p-2 drop-shadow-md shadow-lg bg-${bg}`}>
            <h2 className="text-2xl text-white">
              <Icon name={icon} classNames={'mr-2'} />
              {tl}
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
