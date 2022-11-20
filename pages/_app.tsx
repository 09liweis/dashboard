import '../styles/globals.css'
import Head from 'next/head'
import Link from 'next/link'
import type { AppProps } from 'next/app'

const getPageTitle = (pageProps:any) => {
  const pageMeta = pageProps.pageMeta;
  return pageMeta?.title || 'Dashboard';
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>{getPageTitle(pageProps)}</title>
      <meta name="keywords" content="" />
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <script async src="https://cdn.tailwindcss.com"></script>
    </Head>
    <main>
      <header>
        <section>Logo</section>
        <nav className='flex justify-between'>
          <Link href='/visuals'><a>Movies</a></Link>
          <Link href='/expense'><a>Expense Page</a></Link>
          <Link href='/map'><a>Map</a></Link>
          <Link href='/newsletter'><a>Subscription</a></Link>
          <Link href='/comments'><a>Comments</a></Link>
        </nav>
      </header>
      <Component {...pageProps} />
    </main>
    </>
  )
}

export default MyApp
