import type { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MOVIES_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';

interface Movie {
  title: string;
  _id: string;
  poster: string;

}

const MoviesPage: NextPage = () => {
  const emptyMovies: Array<Movie> = [];
  const [movies, setMovies] = useState(emptyMovies);

  const fetchMovies = async () => {
    const { movies } = await fetchAPI({
      method: 'GET',
      url: MOVIES_LIST_API,
      body: {},
    });
    setMovies(movies || []);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const moviesHTML = movies.map((v) => (
    <article
      key={v._id}
      className="relative p-1 flex justify-between sm:w-1/2 md:w-1/3 lg:w-1/4"
    >
      <section className='relative p-1 shadow-lg w-full bg-white/[30%] rounded-lg transition duraion-500 hover:scale-110'>
        <Image
          src={v.poster}
          className="rounded"
          alt={v.title}
          width={250}
          height={350}
        />
      </section>
    </article>
  ));

  return (
    <section>
      <h1 className="text-center font-bold text-2xl mb-2">Movies</h1>
      <section className='flex flex-wrap'>
        {moviesHTML}
      </section>
    </section>
  );
};

export default MoviesPage;
