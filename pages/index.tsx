import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import { TODO_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';
import styles from '../styles/Home.module.css';

const DASHBOARD_CARDS = [
  { tl: 'todos', icon: 'list', bg: 'blue-400' },
  { tl: 'comments', icon: 'comments', bg: 'red-400' },
  { tl: 'expense', icon: 'dollar-sign', bg: 'green-400' },
  { tl: 'places', icon: 'location-dot', bg: 'indigo-500' },
  { tl: 'blogs', icon: 'blog', bg: 'purple-500' },
  { tl: 'movie', icon: 'film', bg: 'purple-600' },
];

interface Todo {
  _id: string;
  name: string;
  status: string;
  date: string;
}

interface Todos {
  [index: number]: Todo;
}

const Home: NextPage = () => {
  const emptyTodos: Todos = [];
  const [todos, setTodos] = useState(emptyTodos);

  async function fetchTodos() {
    const response = await fetchAPI({
      url: TODO_LIST_API,
      method: 'GET',
      body: {},
    });
    if (response) {
      setTodos(response);
    }
  }

  const renderCards = (type: string) => {
    if (type == 'todos') {
      const todosHTML = todos.map((todo) => (
        <article key={todo._id}>{todo.name}</article>
      ));
      return todosHTML;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <main className={styles.main}>
      <section className="flex flex-wrap">
        {DASHBOARD_CARDS.map(({ tl, icon, bg }) => (
          <article key={tl} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className={`card p-2 shadow bg-${bg}`}>
              <h2 className="text-2xl text-white">
                <Icon name={icon} classNames={'mr-2'} />
                {tl}
              </h2>
              {renderCards(tl)}
            </div>
          </article>
        ))}
      </section>
    </main>
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
