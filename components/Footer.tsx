"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { NAV_LINKS } from "../constants";

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/samliweisen/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    url: "https://github.com/09liweis",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Email",
    url: "mailto:weisen.li@hotmail.com",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sam Li</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Senior Full Stack Developer based in Toronto. Building
              high-performance web applications and modernizing legacy systems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Navigation
            </h4>
            <nav className="space-y-2">
              {NAV_LINKS.map((nav) => {
                const isActive = nav.url === pathname;
                return (
                  <Link key={nav.url} href={nav.url}>
                    <span
                      className={`flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "text-gray-900"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      <Icon name={nav.icon} classNames="text-base" />
                      {nav.tl}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Social / Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>
            &copy; {new Date().getFullYear()} Sam Li. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/sitemap">
              <span className="hover:text-gray-600 transition-colors cursor-pointer">
                Sitemap
              </span>
            </Link>
            <span>Toronto, Canada</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
