import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { getTranslate } from "../helpers";
import { HeaderProps, emptyUser } from "../types";
import Icon from "./Icon";

const NAV_LINKS = [
  { tl: "home", url: "/", icon: "house-user" },
  { tl: "Resume", url: "/resume", icon: "user" },
  { tl: "knowledges", url: "/knowledges", icon: "book" },
  // { tl: 'todos', url: '/todos', icon: 'list' },
  { tl: "expenses", url: "/expenses", icon: "piggy-bank" },
  { tl: "blogs", url: "/blogs", icon: "piggy-bank" },
];

function UserSection({
  user,
  lang,
  onLogout,
  onLogin,
}: {
  user: any;
  lang: String;
  onLogout: () => void;
  onLogin: () => void;
}) {
  if (user._id) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 flex-wrap"
      >
        <div className="px-4 py-2 bg-white/80 rounded-lg border border-gray-200 shadow-xs font-medium text-gray-700">
          {user.nm}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-xs font-medium cursor-pointer"
          onClick={onLogout}
        >
          {getTranslate(lang, "logout")}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-2 cursor-pointer bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-medium"
      onClick={onLogin}
    >
      {getTranslate(lang, "login")}
    </motion.button>
  );
}

function NavItem({
  nav,
  pathname,
  lang,
  onClick,
  index,
}: {
  nav: (typeof NAV_LINKS)[0];
  pathname: String;
  lang: String;
  onClick?: () => void;
  index: number;
}) {
  const isActive = nav.url === pathname;

  return (
    <Link key={nav.url} href={nav.url}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`
          relative px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group
          ${
            isActive
              ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          }
        `}
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <Icon name={nav.icon} classNames="text-lg" />
          <span className="font-medium text-sm md:text-base">
            {getTranslate(lang, nav.tl)}
          </span>
        </div>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 rounded-lg transition-all duration-300 -z-10"></div>
      </motion.div>
    </Link>
  );
}

function MobileMenuItem({
  nav,
  pathname,
  lang,
  onClick,
  index,
}: {
  nav: (typeof NAV_LINKS)[0];
  pathname: String;
  lang: String;
  onClick: () => void;
  index: number;
}) {
  const isActive = nav.url === pathname;

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
    >
      <Link key={nav.url} href={nav.url} className="block">
        <button
          type="button"
          onClick={onClick}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-medium transition-colors text-left ${
            isActive
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <Icon name={nav.icon} classNames="text-2xl" />
          <span>{getTranslate(lang, nav.tl)}</span>
        </button>
      </Link>
    </motion.div>
  );
}

export default function Header({
  setShowLogin,
  user,
  setUser,
  router,
  lang,
}: HeaderProps) {
  const pathname = router.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setUser(emptyUser);
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-xl"></div>
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl -translate-x-16 -translate-y-16"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 left-1/2 w-20 h-20 bg-pink-400/20 rounded-full blur-2xl -translate-x-10 translate-y-10"></div>

      <div className="relative z-10 p-3">
        <div className="flex items-center justify-end gap-4 mb-6">
          <UserSection
            user={user}
            lang={lang}
            onLogout={handleLogout}
            onLogin={handleLoginClick}
          />

          {/* Hamburger menu button (only visible on mobile and when menu is closed) */}
          {!menuOpen && (
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-white/90 border border-gray-200 shadow-sm text-gray-700 hover:bg-blue-50 transition-all"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="bars" classNames="text-xl" />
            </button>
          )}
        </div>

        <nav className="relative">
          <div className="hidden md:flex items-center justify-center gap-1 p-2 bg-white/80 rounded-lg border border-gray-200 shadow-lg backdrop-blur-sm">
            {NAV_LINKS.map((nav, index) => (
              <NavItem
                key={nav.url}
                nav={nav}
                pathname={pathname}
                lang={lang}
                index={index}
              />
            ))}
          </div>

          {/* Full-screen mobile menu overlay */}
          <motion.div
            initial={false}
            animate={{ x: menuOpen ? 0 : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-50 bg-white"
          >
            {/* Close button */}
            <div className="absolute top-0 right-0 p-4 z-10">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Close menu"
              >
                <Icon name="xmark" classNames="text-2xl" />
              </button>
            </div>

            {/* Menu content */}
            <div className="h-full flex flex-col pt-16 px-6 pb-6 overflow-y-auto">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Navigation</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Select a page to visit
                </p>
              </div>

              {/* Navigation items */}
              <div className="flex-1 space-y-2">
                {NAV_LINKS.map((nav, index) => (
                  <MobileMenuItem
                    key={nav.url}
                    nav={nav}
                    pathname={pathname}
                    lang={lang}
                    onClick={() => setMenuOpen(false)}
                    index={index}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Sam Li Portfolio</span>
                  <span>2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}
