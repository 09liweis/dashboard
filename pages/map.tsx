import type { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'
import {fetchTransactions} from '../helpers'

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

const Map: NextPage<Props> = ({pageMeta}) => {
  const [transactions,setTransactions] = useState(Array<Transaction>);
  const doFetchTransactions = async () => {
    const ql = `{
      getTransactions (limit:100) {
        id
        title
        price
        category
        date
      }
    }`
    const {list} = await fetchTransactions({ql})
    setTransactions(list);
  }

  const totalExpenses = useMemo(()=>{
    return (transactions.reduce((sum,t)=>sum+Math.abs(t.price),0)).toFixed(2);
  },[transactions]);

  useEffect(()=>{
    doFetchTransactions();
  },[]);

  return (
    <div className={styles.container}>
      <h1>Transactions Page</h1>
      <h3>Total expenses: {totalExpenses}</h3>
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
  return  {
    props:{
      pageMeta:{
        title:'Map Page'
      }
    }
  }
}

export default Map
