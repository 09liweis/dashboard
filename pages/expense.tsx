import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import styles from '../styles/Home.module.css'

const EXPANSE_API_DATA:string = 'https://samliweisen.herokuapp.com/api/transactions/statistics';

const Expense: NextPage = () => {
  const [expenses,setExpenses] = useState([]);
  const [expenseNm, setExpenseNm] = useState('')
  const [expenseVal, setExpenseVal] = useState('')
  const getExpenseStatistics = async () => {
    const opt = {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({date:'2022-08'})
    };
    const res = await fetch(EXPANSE_API_DATA,opt);
    const statistics = await res.json();
    let expenses = [];
    for (const name in statistics.categoryPrice) {
      const y = Math.abs(statistics.categoryPrice[name]);
      expenses.push({name,y});
    }
    setExpenses(expenses);
  }
  useEffect(()=>{
    getExpenseStatistics();
    renderChart();
  },[]);

  const renderChart = () => {

  }

  const editInput = (e:any,field:string) =>{
    const value = e.target.value;
    if (field == 'nm') {
      setExpenseNm(value);
    }
    if (field == 'val') {
      setExpenseVal(value);
    }
  }
  const addExpense = () =>{
    expenses.push({nm:expenseNm,val:expenseVal});
    setExpenses(expenses);
    setExpenseNm('');
    setExpenseVal('');
  }

  const options = {
    chart: {
      type: 'bar',
      animation:{
        duration:50
      }
    },
    xAxis: {
      type:'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Expense amount',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    title: {
      text: 'My Expense Chart'
    },
    series: [{
      name: 'Expense',
      colorByPoint:true,
      data: expenses
    }]
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Expense</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Expense Page</h2>
      <main>
        <input id='nm' placeholder='Category' value={expenseNm} onChange={(e)=>editInput(e,'nm')} />
        <input id='val' type='number' value={expenseVal} placeholder='Expense Amount' onChange={(e)=>editInput(e,'val')}/>
        <button onClick={addExpense}>Add</button>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
        
      </main>
    </div>
  )
}

export default Expense
