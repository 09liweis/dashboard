import type { NextPage } from 'next'
import React, { useEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'
import useDebounce from '../hooks/useDebounce';

// import {ThemeProvider, useTheme, useThemeUpdate} from '../contexts/ThemeContext';
// import FunctionContextComponent from '../components/functionContextComponent';

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
  const [searchDate, setSearchDate] = useState('');
  const debouncedValue = useDebounce<string>(searchDate, 500);

  const totalExpenses = useMemo(()=>{
    return (transactions.reduce((sum,t)=>sum+Math.abs(t.price),0)).toFixed(2);
  },[transactions]);

  useEffect(()=>{
    
  },[debouncedValue]);

  const changeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchDate(e.target.value);
  }

  return (
    <main>
      {/* <ThemeProvider>
        <FunctionContextComponent />
      </ThemeProvider> */}
      <TransactionList ts={transactions} />
    </main>
  )
}

interface TransactionItem {
  t: Transaction
}

interface TransactionListType {
  ts: Array<Transaction>
}

const TransactionList = ({ts}:TransactionListType) => {
  return (
    <>
    {ts.map((t)=>{
      return <TransactionItem key={t.id} t={t} />
    })}
    </>
  )
}

const TransactionItem = ({t}:TransactionItem) => {
  return (
    <article>
      <h2>{t.price} {t.category} {t.date}</h2>
    </article>
  )
}

// export async function getStaticProps() {
//   return  {
//     props:{
//       pageMeta:{
//         title:'Map Page'
//       }
//     }
//   }
// }

export default Map
