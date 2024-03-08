import Link from 'next/link';
import { getTranslate, getLanguageKeys, getLanguages } from '../helpers';
import { HeaderProps, emptyUser } from '../types';
import { buttonStyle } from '../constants';
import Icon from './Icon';

const NAV_LINKS = [
  { tl: 'home', url: '/', icon: 'house-user' },
  { tl: 'knowledges', url: '/knowledges', icon: 'book' },
  { tl: 'todos', url: '/todos', icon: 'list' },
  { tl: 'videos', url: '/videos', icon: 'video' },
  { tl: 'movies', url: '/movies', icon: 'film' },
  { tl: 'expense', url: '/expense', icon: 'piggy-bank' },
  { tl: 'blogs', url: '/blogs', icon: 'piggy-bank' },
  // { tl: 'subscription', url: '/newsletter', icon: 'envelope' },
];

export default function Header({
  setShowLogin,
  user,
  setUser,
  router,
  lang,
}: HeaderProps) {
  const asPath = router.asPath;
  return (
    <header className="top-3 left-3">
      <section className="flex justify-between mb-2">
        <section>
          {getLanguageKeys().map(({ k, v }: { [k: string]: string }) => (
            <Link key={k} href={`${asPath}`} locale={k}>
              <span className={`mr-2 ${buttonStyle}`}>{v}</span>
            </Link>
          ))}
        </section>
        {user._id ? (
          <section>
            <span className="mr-3 text-red-500 hover:text-red-600 transition duration-300">
              <Icon name={'user'} /> {user.nm}
            </span>
            <a
              className={buttonStyle}
              onClick={() => {
                localStorage.removeItem('auth-token');
                setUser(emptyUser);
              }}
            >
              {getTranslate(lang, 'logout')}
            </a>
          </section>
        ) : (
          <a
            className="p-1 text-center rounded-lg cursor-pointer text-white bg-red-400 transition duration-300 hover:rotate-12 hover:bg-red-600"
            onClick={() => setShowLogin(true)}
          >
            Login
          </a>
        )}
      </section>

      <nav className="flex items-center p-2 bg-card rounded shadow">
        {NAV_LINKS.map((nav) => (
          <Link key={nav.url} href={nav.url}>
            <span
              className={`nav-link mr-2 cursor-pointer text-red-500 hover:text-red-600 ${nav.url == asPath ? 'border-b-2 border-red-500' : ''
                }`}
            >
              <Icon name={nav.icon} /> {getTranslate(lang, nav.tl)}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
