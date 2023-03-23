import Link from 'next/link';
import { getTranslate } from '../helpers';

const NAV_LINKS = [
  { tl: 'home', url: '/', icon: 'fa-solid fa-house-user' },
  { tl: 'knowledges', url: '/knowledges', icon: 'fa-solid fa-book' },
  { tl: 'expense', url: '/expense', icon: 'fa-solid fa-piggy-bank' },
  { tl: 'subscription', url: '/newsletter', icon: 'fa-solid fa-envelope' },
];

export default function Header({ user, setUser, router, lang }) {
  return (
    <header className="sticky top-3 left-3">
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
        {user._id ? (
          <>
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
          </>
        ) : (
          <a onClick={() => setShowLogin(true)}>Login</a>
        )}
      </nav>
    </header>
  );
}
