import type { NextPage } from 'next'
import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import styles from '../styles/Home.module.css'

interface Launch {
  id: string
  mission_name: string
  launch_date_local: string
}

interface Props {
  lauches: Array<Launch>
}

const Spacex: NextPage<Props> = ({lauches}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SpaceX Graphql</title>
      </Head>
      <h1>SpaceX</h1>
      {lauches.map(launch =>{
        return (
          <article key={launch.id}>
            <h2>{launch.mission_name}</h2>
          </article>
        );
      })}
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql',
    cache: new InMemoryCache()
  });
  const {data} = await client.query({
    query: gql`
      {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
        }
      }
    `
  });
  return  {
    props:{
      lauches:data.launchesPast
    }
  }
}

export default Spacex
