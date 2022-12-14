import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const RANDOM_VISUAL_API:string = 'https://what-i-watched.herokuapp.com/api/random_visual';

const Home: NextPage = () => {
  const [visual,setVisual] = useState({title:'',poster:'',summary:'',douban_id:''});
  const setRandomVisual = async () => {
    const res = await fetch(RANDOM_VISUAL_API)
    const {result} = await res.json();
    setVisual(result);
  }
  useEffect(()=>{
    // setRandomVisual();
    // setInterval(()=>{
    //   setRandomVisual();
    // },10000);
  },[]);
  return (
    <div className={styles.container}>
      <Head>
        <title>My Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.description}>For personal use</p>
        <section className={styles.grid}>
          <article className="card display-flex">
            <section className='width-30 pos-relative img-container'>
              {/* <Image className='border-radius-left image' src={visual.poster} alt="Vercel Logo" layout='fill' /> */}
            </section>
            <section className='width-70 padding'>
              <Link href={`/visuals/${visual.douban_id}`}>
                <h2>{visual.title}</h2>
              </Link>
              <p>{visual.summary.substring(0,200)}...</p>
            </section>
          </article>

        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps:GetServerSideProps = async (ctx) => {
  //const res = await fetch(RANDOM_VISUAL_API)
  //const {result} = await res.json();
  // console.log(result);
  return {
    props:{
      visual:{}
    }
  }
}

export default Home
