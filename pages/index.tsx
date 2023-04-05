import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import styles from '../styles/Home.module.css';

const DASHBOARD_CARDS = [
  { tl: 'Todos', icon: 'list', bg: 'blue-400' },
  { tl: 'Comments', icon: 'comments', bg: 'red-400' },
  { tl: 'Expense', icon: 'dollar-sign', bg: 'green-400' },
  { tl: 'Places', icon: 'location-dot', bg: 'indigo-500' },
  { tl: 'Blogs', icon: 'blog', bg: 'purple-500' },
  { tl: 'Movie', icon: 'film', bg: 'purple-600' },
];

const Home: NextPage = () => {
  useEffect(() => {}, []);
  return (
    <main className={styles.main}>
      <section className="flex flex-wrap">
        {DASHBOARD_CARDS.map(({ tl, icon, bg }) => (
          <article className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className={`card p-2 shadow bg-${bg}`}>
              <h2 className="text-2xl text-white">{tl}</h2>
              <Icon name={icon} classNames={'text-white text-xl'} />
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
