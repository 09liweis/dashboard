import Link from 'next/link';
import { motion } from 'motion/react';
import { getTranslate, getLanguageKeys } from '../helpers';
import { HeaderProps, emptyUser } from '../types';
import Icon from './Icon';

const NAV_LINKS = [
  { tl: 'home', url: '/', icon: 'house-user' },
  { tl: 'Resume', url: '/resume', icon: 'user' },
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
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative overflow-hidden"
    >
      {/* Background with gradient and blur effect */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            {getLanguageKeys().map(({ k, v }: { [k: string]: string }) => (
              <Link key={k} href={pathname.toString()} locale={k}>
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white/80 border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer shadow-xs"
                >
                  {v}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* User Section */}
          {user._id ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg border border-gray-200 shadow-xs">
                <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Icon name="user" classNames="text-white text-sm" />
                </div>
                <span className="font-medium text-gray-700">{user.nm}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-xs font-medium"
                onClick={() => {
                  localStorage.removeItem('auth-token');
                  setUser(emptyUser);
                }}
              >
                {getTranslate(lang, 'logout')}
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
              onClick={() => setShowLogin(true)}
            >
              {getTranslate(lang, 'login')}
            </motion.button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center">
          <div className="flex items-center gap-1 p-2 bg-white/80 rounded-xl border border-gray-200 shadow-lg backdrop-blur-sm">
            {NAV_LINKS.map((nav, index) => (
              <Link key={nav.url} href={nav.url}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    relative px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group
                    ${nav.url === pathname 
                      ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Icon name={nav.icon} classNames="text-lg" />
                    <span className="font-medium text-sm md:text-base">
                      {getTranslate(lang, nav.tl)}
                    </span>
                  </div>
                  
                  {/* Active indicator */}
                  {nav.url === pathname && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 rounded-lg transition-all duration-300 -z-10"></div>
                </motion.div>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl -translate-x-16 -translate-y-16"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 left-1/2 w-20 h-20 bg-pink-400/20 rounded-full blur-2xl -translate-x-10 translate-y-10"></div>
    </motion.header>
  );
}