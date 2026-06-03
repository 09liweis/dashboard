import { Analytics } from "@vercel/analytics/react"
import '../styles/globals.css';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const getPageTitle = (pageProps: any) => {
  const pageMeta = pageProps.pageMeta;
  return pageMeta?.title || 'Sam - Full Stack Developer';
};

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  
  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });

  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });

  Router.events.on('routeChangeError', () => {
    setLoading(false);
  });

  const router = useRouter();

  useEffect(() => {
    document.addEventListener('copy', () => {
      alert('You are trying to copy my stuff');
    });

    return () => {
      document.removeEventListener('copy', () => {
        console.info("remove copy event listener");
      })
    }
  }, []);

  return (
    <>
      <Head>
        <title>{getPageTitle(pageProps)}</title>
        <meta name="keywords" content="samliweisen, samli" />
        <meta name="description" content="samliweisen profolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-2">
        <Header router={router} />
        <section className="bg-card mt-2 p-2 rounded-sm">
          {loading ? <LoadingSkeleton /> : <Component {...pageProps} />}
        </section>
        <Analytics />
      </main>
    </>
  );
}

export default MyApp;