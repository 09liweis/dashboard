import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import AppContext from 'AppContext';
import Icon from '@/components/Icon';
import { MOVIE_RANGDOM_API } from '../constants';
import { fetchAPI, getTranslate } from 'helpers';

const DASHBOARD_CARDS = [
  // { tl: 'waifu', icon: 'person-dress', bg: 'purple-400' },
  // { tl: 'dog', icon: 'dog', bg: 'purple-400' },
  // { tl: 'cat', icon: 'cat', bg: 'purple-400' },
  { tl: 'todos', icon: 'list', bg: 'blue-400' },
  { tl: 'comments', icon: 'comments', bg: 'red-400' },
  { tl: 'expense', icon: 'dollar-sign', bg: 'green-500' },
  { tl: 'places', icon: 'location-dot', bg: 'indigo-500' },
  { tl: 'blogs', icon: 'blog', bg: 'sky-500' },
  { tl: 'movie', icon: 'film', bg: 'teal-600' },
] as const;

type WaiFu = {
  url: string
};

type Animal = {
  url: string,
  id: string,
  width: number,
  height: number
}

interface Movie {
  poster: string,
  title: string
}

async function fetchRandomMovie(): Promise<Movie> {
  return await fetchAPI({
    url: MOVIE_RANGDOM_API,
    method: 'GET'
  })
}

/** 
https://waifu.pics/docs
*/
async function fetchWaifuPic(): Promise<WaiFu> {
  return await fetchAPI({
    url: 'https://api.waifu.pics/sfw/waifu',
    method: 'GET'
  });
}

async function fetchAnimalPic(animal: string): Promise<Array<Animal>> {
  return await fetchAPI({
    url: `https://api.the${animal}api.com/v1/images/search`,
    method: 'GET'
  });
}

const Home: NextPage = () => {
  const { user, lang } = useContext(AppContext);

  const [waifuPic, setWaifuPic] = useState('');
  const [catPic, setCatPic] = useState('');
  const [dogPic, setDogPic] = useState('');

  const emptyMovie: Movie = { poster: '', title: '' };
  const [randomMovie, setRandomMovie] = useState(emptyMovie);

  const renderCards = (type: string) => {
    const cardMapping: { [key: string]: any } = {
      movie: randomMovie.poster ? <Image src={randomMovie.poster} alt={randomMovie.title} className='w-full' width={300} height={500} /> : null,
      waifu: <img src={waifuPic} className='w-full' />,
      dog: <img src={dogPic} className='w-full' />,
      cat: <img src={catPic} className='w-full' />,
    };
    return cardMapping[type];
  };

  const fetchDashBoardData = async () => {
    const [] = await Promise.all([
      // fetchWaifuPic(),
      // fetchAnimalPic('dog'),
      // fetchAnimalPic('cat'),
      // fetchRandomMovie()
    ]);
    // setWaifuPic(newWaifuPic.url);
    // setDogPic(dogPics[0].url);
    // setCatPic(catPics[0].url);
    // setRandomMovie(movie);
  };

  useEffect(() => {
    // fetchDashBoardData();

    // const fetchTimer = setInterval(() => {
    //   fetchDashBoardData();
    // }, 30 * 1000);

    // return (() => clearInterval(fetchTimer));

  }, []);
  return (
    <section className="flex flex-wrap">
      {DASHBOARD_CARDS.map(({ tl, icon, bg }) => (
        <article key={tl} className="home-card">
          <div className={`home-card-wrapper`}>
            <h2 className="home-card-title">
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
