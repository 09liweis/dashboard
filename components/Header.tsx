import Link from 'next/link';
import { getTranslate, getLanguageKeys, getLanguages } from '../helpers';
import { HeaderProps, emptyUser } from '../types';
import Icon from './Icon';

const NAV_LINKS = [
  { tl: 'Resume', url: '/', icon: 'house-user' },
  { tl: 'Dashboard', url: '/dashboard', icon: 'house-user' },
  { tl: 'knowledges', url: '/knowledges', icon: 'book' },
  { tl: 'todos', url: '/todos', icon: 'list' },
  // { tl: 'videos', url: '/videos', icon: 'video' },
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
  const pathname = router.pathname;
  return (
    <header className="">
      <section className="flex justify-between mb-2">
        <section>
          {getLanguageKeys().map(({ k, v }: { [k: string]: string }) => (
            <Link key={k} href={`${pathname}`} locale={k}>
              <span className={`mr-2 button`}>{v}</span>
            </Link>
          ))}
        </section>
        {user._id ? (
          <section>
            <span className="mr-3 text-red-500">
              <Icon name={'user'} /> {user.nm}
            </span>
            <button
              className='button'
              onClick={() => {
                localStorage.removeItem('auth-token');
                setUser(emptyUser);
              }}
            >
              {getTranslate(lang, 'logout')}
            </button>
          </section>
        ) : (
          <button
            className="button"
            onClick={() => setShowLogin(true)}
          >
            {getTranslate(lang, 'login')}
          </button>
        )}
      </section>

      <nav className="flex items-center p-2 bg-card rounded shadow">
        {NAV_LINKS.map((nav) => (
          <Link key={nav.url} href={nav.url}>
            <span
              className={`nav-link mr-2 cursor-pointer text-red-500 hover:text-red-600 ${nav.url == pathname ? 'border-b-2 border-red-500' : ''
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
