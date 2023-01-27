import '../styles/globals.css';
import Head from 'next/head';
import Link from 'next/link';
import type { AppProps } from 'next/app';

const getPageTitle = (pageProps: any) => {
  const pageMeta = pageProps.pageMeta;
  return pageMeta?.title || 'Dashboard';
};

const NAV_LINKS = [
  { tl: 'Home', url: '/',icon:'fa-solid fa-house-user'},
  { tl: 'Knowledges', url: '/knowledges',icon:'fa-solid fa-book'},
  { tl: 'Expense', url: '/expense',icon:'fa-solid fa-piggy-bank'},
  { tl: 'Comments', url: '/comments',icon:'fa-solid fa-comment'},
  { tl: 'Subscription', url: '/newsletter',icon:'fa-solid fa-envelope'},
  { tl: 'Map', url: '/map',icon:'fa-solid fa-map-location-dot'},
];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{getPageTitle(pageProps)}</title>
        <meta name="keywords" content="" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        />
        <link rel="stylesheet" href="/tailwind.css" />
      </Head>
      <main className="flex">
        <header className="flex-none p-3">
          <nav className="flex flex-col p-3 bg-card rounded shadow">
            {NAV_LINKS.map((nav) => (
              <Link key={nav.url} href={nav.url}>
                <span className="mb-3 cursor-pointer text-red-500 hover:text-red-600 transition duration-300">
                <i className={nav.icon}></i> {nav.tl}
                </span>
              </Link>
            ))}
          </nav>
        </header>
        <section className='flex-1 p-3'>
          <section className='bg-card p-3 rounded'>
            <Component {...pageProps} />
          </section>
        </section>
      </main>
    </>
  );
}

export default MyApp;
