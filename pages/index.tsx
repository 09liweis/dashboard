import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import AppContext from '../AppContext';
import Icon from '../components/Icon';
import { COMMENT_LIST_API, TODO_LIST_API } from '../constants';
import { fetchAPI, getTranslate } from '../helpers';

const DASHBOARD_CARDS = [
  { tl: 'waifu', icon: 'person-dress', bg: 'purple-400' },
  { tl: 'dog', icon: 'dog', bg: 'purple-400' },
  { tl: 'cat', icon: 'cat', bg: 'purple-400' },
  { tl: 'quote', icon: 'blog', bg: 'purple-600' },
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

type WaiFu = {
  url: string
};

type Animal = {
  url: string,
  id: string,
  width: number,
  height: number
}

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

interface Movie {
  douban_poster: string,
  title: string
}

async function fetchRandomMovie(): Promise<Movie> {
  return await fetchAPI({
    url: 'https://samliweisen.onrender.com/api/movies/update_random',
    method: 'PUT',
    body: {}
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

type Quote = {
  _id: string,
  content: string,
  author: string,
  authorSlug: string
  tags: Array<string>,
  dateAdded: string,
  dateModified: string
}

async function fetchRandomQuote(): Promise<Quote> {
  return await fetchAPI({
    url: `https://api.quotable.io/random`,
    method: 'GET'
  });
}

const Home: NextPage = () => {
  const { user, lang } = useContext(AppContext);

  const emptyTodos: Array<Todo> = [];
  const [todos, setTodos] = useState(emptyTodos);

  const emptyComments: Array<Comment> = [];
  const [comments, setComments] = useState(emptyComments);

  const [waifuPic, setWaifuPic] = useState('');
  const [catPic, setCatPic] = useState('');
  const [dogPic, setDogPic] = useState('');

  const emptyMovie: Movie = {};
  const [randomMovie, setRandomMovie] = useState(emptyMovie);

  const emptyQuote: Quote = {
    _id: '',
    content: '',
    author: '',
    authorSlug: '',
    tags: [],
    dateAdded: '',
    dateModified: ''
  }
  const [randomQuote, setRandomQuote] = useState(emptyQuote);

  const renderCards = (type: string) => {
    const cardMapping: { [key: string]: any } = {
      todos: todos.map((todo) => <article key={todo._id}>{todo.name}</article>),
      comments: comments.map((comment) => (
        <article key={comment._id}>{comment.content}</article>
      )),
      movie: randomMovie.douban_poster?<Image src={randomMovie.douban_poster} alt={randomMovie.title} className='w-full' width={300} height={500} />:null,
      waifu: <img src={waifuPic} className='w-full' />,
      dog: <img src={dogPic} className='w-full' />,
      cat: <img src={catPic} className='w-full' />,
      quote: <article className='text-white'>
        <h2 className='text-lg font-bold'>{randomQuote.author}</h2>
        <p>{randomQuote.content}</p>
      </article>
    };
    return cardMapping[type];
  };

  const fetchDashBoardData = async () => {
    const [newTodos, newComments, newWaifuPic, dogPics, catPics, quote, movie] = await Promise.all([
      fetchTodos(),
      fetchComments(),
      fetchWaifuPic(),
      fetchAnimalPic('dog'),
      fetchAnimalPic('cat'),
      fetchRandomQuote(),
      fetchRandomMovie()
    ]);
    setTodos(newTodos);
    setComments(newComments);
    setWaifuPic(newWaifuPic.url);
    setDogPic(dogPics[0].url);
    setCatPic(catPics[0].url);
    setRandomQuote(quote);
    setRandomMovie(movie);
  };

  useEffect(() => {
    fetchDashBoardData();

    const fetchTimer = setInterval(() => {
      fetchDashBoardData();
    }, 60 * 1000);

    return (() => clearInterval(fetchTimer));

  }, []);
  return (
    <section className="flex flex-wrap">
      {DASHBOARD_CARDS.map(({ tl, icon, bg }) => (
        <article key={tl} className="p-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
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
