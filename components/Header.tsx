"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";

const NAV_LINKS = [
  { tl: "Home", url: "/", icon: "house-user" },
  { tl: "About", url: "/resume", icon: "user" },
  { tl: "Cost Calculator", url: "/calculator", icon: "book" },
  { tl: "Blogs", url: "/blogs", icon: "piggy-bank" },
  { tl: "Faqs", url: "/faq", icon: "comments" },
];

function NavItem({
  nav,
  pathname,
  onClick,
}: {
  nav: (typeof NAV_LINKS)[0];
  pathname: string;
  onClick?: () => void;
  index: number;
}) {
  const isActive = nav.url === pathname;

  return (
    <Link key={nav.url} href={nav.url}>
      <div
        className={`
          relative px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer group
          ${
            isActive
              ? "bg-primary text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }
        `}
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <Icon name={nav.icon} classNames="text-lg" />
          <span className="font-medium text-sm md:text-base">{nav.tl}</span>
        </div>
        <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-100 rounded-lg transition-all duration-300 -z-10" />
      </div>
    </Link>
  );
}

function MobileMenuItem({
  nav,
  pathname,
  onClick,
}: {
  nav: (typeof NAV_LINKS)[0];
  pathname: string;
  onClick: () => void;
  index: number;
}) {
  const isActive = nav.url === pathname;

  return (
    <div>
      <Link key={nav.url} href={nav.url} className="block">
        <button
          type="button"
          onClick={onClick}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-medium transition-colors text-left ${
            isActive
              ? "bg-gray-900 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Icon name={nav.icon} classNames="text-2xl" />
          <span>{nav.tl}</span>
        </button>
      </Link>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-50" />
      <div className="absolute inset-0 bg-white/80" />

      <div className="relative z-10 p-3">
        <div className="flex items-center justify-end gap-4 mb-6">
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
                index={index}
              />
            ))}
          </div>

          {menuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-white">
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

              <div className="h-full flex flex-col pt-16 px-6 pb-6 overflow-y-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Navigation
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Select a page to visit
                  </p>
                </div>

                <div className="flex-1 space-y-2">
                  {NAV_LINKS.map((nav, index) => (
                    <MobileMenuItem
                      key={nav.url}
                      nav={nav}
                      pathname={pathname}
                      onClick={() => setMenuOpen(false)}
                      index={index}
                    />
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Sam Li Portfolio</span>
                    <span>2026</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
