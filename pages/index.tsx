import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  useEffect(() => {}, []);
  return (
    <main className={styles.main}>
      <section className="flex flex-wrap">
        <article className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="card p-2 shadow bg-blue-400">
            <h2 className="text-2xl text-white">Todos</h2>
            <i className="fa-solid text-white text-xl fa-list"></i>
          </div>
        </article>
        <article className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="card p-2 shadow bg-red-400">
            <h2 className="text-2xl text-white">Comments</h2>
            <i className="fa-solid text-white text-xl fa-comments"></i>
          </div>
        </article>
        <article className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="card p-2 shadow bg-green-400">
            <h2 className="text-2xl text-white">Expense</h2>
            <i className="fa-solid text-white text-xl fa-dollar-sign"></i>
          </div>
        </article>
        <article className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="card p-2 shadow bg-indigo-500">
            <h2 className="text-2xl text-white">Places</h2>
            <i className="fa-solid text-white text-xl fa-location-dot"></i>
          </div>
        </article>
        <article className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="card p-2 shadow bg-purple-400">
            <h2 className="text-2xl text-white">Blog</h2>
            <i className="fa-solid text-white text-xl fa-blog"></i>
          </div>
        </article>
        <article className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <div className="card p-2 shadow bg-purple-600">
            <h2 className="text-2xl text-white">Movie</h2>
            <i className="fa-solid text-white text-xl fa-film"></i>
          </div>
        </article>
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
