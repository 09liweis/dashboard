import type { NextPage } from 'next';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { fetchAPI, getTranslate } from '../helpers';
import AppContext from '../AppContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { Transaction, CategoryTransactions } from '../types';

const EXPANSE_API: string =
  'https://samliweisen.onrender.com/api/transactions/statistics';

const CATEGORIES_API: string =
  'https://samliweisen.onrender.com/api/transactions/categories';

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
  const { user, lang } = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);

  const emptyCategories: Array<String> = [];
  const [categories, setCategories] = useState(emptyCategories);

  const emptyTransaction: Transaction = {};
  const [selectedTransaction, setSelectTransaction] =
    useState(emptyTransaction);

  const emptyTransactions: CategoryTransactions = {};
  const [loading, setLoading] = useState(false);
  const [curYear, setYear] = useState('');
  const [curMonth, setMonth] = useState('');
  const [curTotal, setTotal] = useState(0);
  const [categoryTransactions, setCategoryTransactions] =
    useState(emptyTransactions);

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
      url: EXPANSE_API,
      body,
    });
    setLoading(false);
    setCategoryTransactions(categoryPrice);
    setTotal(total);
  }, [curYear, curMonth]);

  useEffect(() => {
    getExpenseStatistics();
  }, [curYear, curMonth, getExpenseStatistics]);

  const getCategories = async () => {
    const response = await fetchAPI({ url: CATEGORIES_API, method: 'GET' });
    if (Array.isArray(response)) {
      setCategories(response);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const openTransactionDetail = (t: Transaction) => {
    setShowForm(true);
    setSelectTransaction(t);
  };

  return (
    <>
      {showForm && (
        <ExpenseForm
          transaction={selectedTransaction}
          categories={categories}
          setShowForm={setShowForm}
          user={user}
        />
      )}
      <section className="flex justify-between items-center mb-3">
        <h2>{getTranslate(lang, 'expense')}</h2>
        {user._id ? (
          <a
            className="p-2 bg-red-400 text-white border rounded-xl cursor-pointer hover:bg-red-500 transition duration-300"
            onClick={() => {
              setShowForm(true);
              setSelectTransaction(emptyTransaction);
            }}
          >
            {getTranslate(lang, 'addNew')}
          </a>
        ) : null}
      </section>
      <section className="flex mb-3">
        <article className="month p-3 bg-card flex-none">
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

        <article className="pay bg-card ml-3 flex-1">
          <p className="text-right capitalize text-2xl font-bold text-red-600">
            <i className="fa-solid fa-sack-dollar"></i>
            {getTranslate(lang, 'total')}:{curTotal.toFixed(2)}
          </p>
          {loading ? (
            <div className="flex justify-center">
              <i className="animate-spin margin-auto fa-solid fa-spinner"></i>
            </div>
          ) : (
            <ExpenseList
              categoryTransactions={categoryTransactions}
              openTransactionDetail={openTransactionDetail}
            />
          )}
        </article>
      </section>
    </>
  );
};

export default Expense;
