import Link from 'next/link';
import { getTranslate, getLanguageKeys, getLanguages } from '../helpers';
import { HeaderProps, emptyUser } from '../types';
import Icon from './Icon';

const NAV_LINKS = [
  { tl: 'Resume', url: '/', icon: 'house-user' },
  { tl: 'knowledges', url: '/knowledges', icon: 'book' },
  { tl: 'todos', url: '/todos', icon: 'list' },
  { tl: 'expenses', url: '/expenses', icon: 'piggy-bank' },
  { tl: 'blogs', url: '/blogs', icon: 'piggy-bank' },
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
      <div className="p-4 backdrop-blur-md bg-white/70 rounded-lg shadow-lg border border-white/20">
        <section className="flex justify-between mb-4">
          <section>
            {getLanguageKeys().map(({ k, v }: { [k: string]: string }) => (
              <Link key={k} href={`${pathname}`} locale={k}>
                <span className="mr-2 button">{v}</span>
              </Link>
            ))}
          </section>
          {user._id ? (
            <section className="flex items-center">
              <span className="mr-3 text-gray-700">
                <Icon name={'user'} /> {user.nm}
              </span>
              <button
                className="button"
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

        <nav className="flex items-center">
          {NAV_LINKS.map((nav) => (
            <Link key={nav.url} href={nav.url}>
              <span
                className={`nav-link mr-4 cursor-pointer text-gray-700 hover:text-blue-600 transition-all flex items-center ${
                  nav.url === pathname ? 'border-b-2 border-blue-500' : ''
                }`}
              >
                <Icon name={nav.icon} /> 
                <span className="ml-1">{getTranslate(lang, nav.tl)}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}