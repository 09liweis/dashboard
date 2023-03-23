import Link from 'next/link';
import { getTranslate, getLanguageKeys, getLanguages } from '../helpers';
import { HeaderProps, emptyUser } from '../types';

const NAV_LINKS = [
  { tl: 'home', url: '/', icon: 'fa-solid fa-house-user' },
  { tl: 'knowledges', url: '/knowledges', icon: 'fa-solid fa-book' },
  { tl: 'expense', url: '/expense', icon: 'fa-solid fa-piggy-bank' },
  { tl: 'subscription', url: '/newsletter', icon: 'fa-solid fa-envelope' },
];

export default function Header({
  setLang,
  setShowLogin,
  user,
  setUser,
  router,
  lang,
}: HeaderProps) {
  return (
    <header className="sticky top-3 left-3">
      <section className="flex justify-between mb-3">
        <section>
          {getLanguageKeys().map(({ k, v }) => (
            <a
              className="ml-2 cursor-pointer border p-1 rounded-lg text-white bg-red-400 hover:bg-red-600 transition duration-300"
              onClick={() => setLang(getLanguages(k))}
              key={k}
            >
              {v}
            </a>
          ))}
        </section>
        {user._id ? (
          <section>
            <span className="mr-3 text-red-500 hover:text-red-600 transition duration-300">
              <i className="fa-solid fa-user"></i> {user.nm}
            </span>
            <a
              className="p-1 text-center rounded-lg cursor-pointer text-white bg-red-400 transition duration-300 hover:rotate-12 hover:bg-red-600"
              onClick={() => {
                localStorage.removeItem('auth-token');
                setUser(emptyUser);
              }}
            >
              Logout
            </a>
          </section>
        ) : (
          <a onClick={() => setShowLogin(true)}>Login</a>
        )}
      </section>

      <nav className="flex items-center p-2 bg-card rounded shadow">
        {NAV_LINKS.map((nav) => (
          <Link key={nav.url} href={nav.url}>
            <span
              className={`mr-3 cursor-pointer text-red-500 hover:text-red-600 transition duration-300 ${
                nav.url == router.pathname ? 'border-b-2 border-red-500' : ''
              }`}
            >
              <i className={nav.icon}></i> {getTranslate(lang, nav.tl)}
            </span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
