import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState, useCallback } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from '../styles/Home.module.css';
import { fetchAPI } from '../helpers';

const EXPANSE_API_DATA: string =
  'https://samliweisen.onrender.com/api/transactions/statistics';

interface SingleExpense {
  name: string;
  y: number;
}

interface CategoryTransaction {
  total: number;
  items: [
    {
      _id: string;
      price: number;
      date: string;
      title: string;
      place: {
        _id: string;
        name: string;
      };
    }
  ];
}

interface CategoryTransactions {
  [key: string]: CategoryTransaction;
}

const ICON_CATEGORY: { [key: string]: string } = {
  food: 'fa-utensils',
  gas: 'fa-gas-pump',
  computer: 'fa-computer',
  clothes: 'fa-clothes-hanger',
  grocery: 'fa-cart-shopping',
  phone: 'fa-phone',
  electricity: 'fa-bolt',
  internet: 'fa-internet-explorer',
};

const YEARS = ['2023', '2022', '2021', '2020'];
const MONTHS: { [key: string]: string } = {
  '1': 'Jan',
  '2': 'Fed',
  '3': 'Mar',
  '4': 'Apr',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'Aug',
  '9': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

const Expense: NextPage = () => {
  const emptyExpenses: Array<SingleExpense> = [];
  const emptyTransactions: CategoryTransactions = {};
  const [loading, setLoading] = useState(false);
  const [curYear, setYear] = useState('');
  const [curMonth, setMonth] = useState('');
  const [curTotal, setTotal] = useState(0);
  const [categoryTransactions, setCategoryTransactions] =
    useState(emptyTransactions);
  const [expenses, setExpenses] = useState(emptyExpenses);
  const [expenseNm, setExpenseNm] = useState('');
  const [expenseVal, setExpenseVal] = useState(0);
  const getExpenseStatistics = useCallback(async () => {
    setLoading(true);
    const body = { date: '' };
    if (curYear || curMonth) {
      body.date = `${curYear}`;
      if (curMonth) {
        body.date += `-${parseInt(curMonth) < 10 ? '0' + curMonth : curMonth}`;
      }
    }
    const { categoryPrice, total } = await fetchAPI({
      url: EXPANSE_API_DATA,
      body,
    });
    setLoading(false);
    setCategoryTransactions(categoryPrice);
    setTotal(total);
    let expenses: Array<SingleExpense> = [];
    for (const name in categoryPrice) {
      const y = Math.abs(categoryPrice[name].total);
      expenses.push({ name, y });
    }
    setExpenses(expenses);
  }, [curYear, curMonth]);
  useEffect(() => {
    getExpenseStatistics();
  }, [curYear, curMonth, getExpenseStatistics]);

  const editInput = (e: any, field: string) => {
    const value = e.target.value;
    if (field == 'nm') {
      setExpenseNm(value);
    }
    if (field == 'val') {
      setExpenseVal(parseFloat(value));
    }
  };
  const addExpense = () => {
    if (expenseNm.trim() === '') {
      alert('Category can not be empty');
      return;
    }
    if (expenseVal == 0) {
      alert('Expense can not be 0');
      return;
    }
    expenses.push({ name: expenseNm, y: expenseVal });
    setExpenses(expenses);
    setExpenseNm('');
    setExpenseVal(0);
  };

  const deleteExpense = (idx: number) => {
    setExpenses(expenses.filter((item, i) => i !== idx));
  };

  const options = {
    chart: {
      type: 'bar',
      animation: {
        duration: 50,
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Expense amount',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    title: {
      text: 'My Expense Chart',
    },
    series: [
      {
        name: 'Expense',
        colorByPoint: true,
        data: expenses,
      },
    ],
  };

  const expensesHTML = 
    Object.keys(categoryTransactions).map((key) => {
      const { total, items } = categoryTransactions[key];
      return (
        <div key={key}>
          <div className="father">
            <span className="type">
              <i className={`fa-solid ${ICON_CATEGORY[key]}`}></i>
              {key}
            </span>
            <span className="money">
              <i className="fa-solid fa-sack-dollar"></i>
              {total}
            </span>
          </div>
          <ul className="detail1">
            {items.map(({ _id, price, date, place, title }) => {
              return (
                <li key={_id}>
                  {date} {place.name} {title} 支出${price}
                </li>
              );
            })}
          </ul>
        </div>
      );
    });

  return (
    <>
      <h2>费用支出</h2>
      <section className="flex mb-3">
        <article className="month p-3 rounded flex-none">
          {YEARS.map((year) => (
            <p
              className={curYear == year ? 'text-red-300' : 'mouse'}
              key={year}
              onClick={() => setYear(year)}
            >
              {year}
            </p>
          ))}
          {curYear
            ? Object.keys(MONTHS).map((month) => (
                <p
                  className={curMonth == month ? 'text-red-300' : ''}
                  key={month}
                  onClick={() => setMonth(month)}
                >
                  {MONTHS[month]}
                </p>
              ))
            : null}
        </article>

        <article className="pay rounded ml-3 flex-1">
          <p className="total">
            <i className="fa-solid fa-sack-dollar"></i>Total:{curTotal}
          </p>
          {loading?
            <div className='flex justify-center'><i className="animate-spin margin-auto fa-solid fa-spinner"></i></div>
          :expensesHTML}
          
        </article>
      </section>

      <main>
        {expenses.length ? (
          <React.Fragment>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <h3>
              Total:{' '}
              {expenses.reduce((pVal, cVal) => pVal + cVal.y, 0).toFixed(2)}
            </h3>
            <section className="margin-tb-10">
              {expenses.map((expense, idx) => {
                return (
                  <article className="border" key={expense.name}>
                    <span>
                      {expense.name}: {expense.y.toFixed(2)}
                    </span>
                    <span onClick={() => deleteExpense(idx)}>Delete</span>
                  </article>
                );
              })}
            </section>
          </React.Fragment>
        ) : (
          <section className="center">
            Please add some expenses to show the chart
          </section>
        )}
        <div className="display-flex">
          <input
            className="width-100 margin-b-10 padding-10"
            id="nm"
            placeholder="Enter Category"
            value={expenseNm}
            onChange={(e) => editInput(e, 'nm')}
          />
          <input
            className="width-100 margin-b-10 padding-10"
            id="val"
            type="number"
            value={expenseVal}
            placeholder="Enter Expense Amount"
            onChange={(e) => editInput(e, 'val')}
          />
          <button
            className="width-40 margin-b-10 padding-10"
            onClick={addExpense}
          >
            Add
          </button>
        </div>
      </main>
    </>
  );
};

export default Expense;
