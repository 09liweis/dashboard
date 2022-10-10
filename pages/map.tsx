import type { NextPage } from 'next'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import styles from '../styles/Home.module.css'

interface PageMeta {
  title:string
}

interface Transaction {
  id:string,
  title:string,
  date:string,
  price:number,
  category:string
}

interface Props {
  pageMeta: PageMeta
  transactions: Array<Transaction>
}

const Map: NextPage<Props> = ({transactions,pageMeta}) => {
  return (
    <div className={styles.container}>
      <h2>Map Page</h2>
      {transactions.map((t)=>{
        return (
          <article key={t.id}>
            <h2>{t.price} {t.category} {t.date}</h2>
          </article>
        )
      })}
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URI,
    cache: new InMemoryCache()
  });
  const {data} = await client.query({
    query: gql`
      {
        getTransactions (limit:10) {
          id
          title
          price
          category
          date
        }
      }
    `
  });
  return  {
    props:{
      pageMeta:{
        title:'Map Page'
      },
      transactions:data.getTransactions
    }
  }
}

export default Map
