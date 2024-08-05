import type { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { fetchAPI, getTranslate } from '../helpers';
import AppContext from '../AppContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseDates from '../components/ExpenseDates';
import { Transaction, CategoryTransaction } from '../types';
import {
  buttonStyle,
  EXPENSE_LIST_API,
  EXPENSE_CATEGORIES_API,
} from '../constants';
import Loading from '../components/Loading';
import Icon from '../components/Icon';

const Expense: NextPage = () => {
  const route = useRouter();
  let defaultYear: string | string[] = '';
  let defaultMonth: string | string[] = '';
  if (route.query.date) {
    const date = route.query.date.toString();
    const [year, month] = date.split('-')
    defaultYear = year;
    defaultMonth = month;
  }

  const { user, lang } = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);

  const emptyCategories: Array<String> = [];
  const [categories, setCategories] = useState(emptyCategories);

  const [selectedTransaction, setSelectTransaction] =
    useState<Transaction>({});

  const [loading, setLoading] = useState(false);
  const [curYear, setYear] = useState(defaultYear);
  const [curMonth, setMonth] = useState(defaultMonth);
  const [curTotal, setTotal] = useState(0);
  const [categoryTransactions, setCategoryTransactions] =
    useState<CategoryTransaction[]>([]);

  const getExpenseStatistics = useCallback(async () => {
    setLoading(true);
    const body = { date: '' };
    if (curYear || curMonth) {
      body.date = `${curYear}`;
      if (curMonth) {
        body.date += `-${curMonth.padStart(2, '0')}`;
      }
    }
    const { categoryPrice, total } = await fetchAPI({
      url: EXPENSE_LIST_API,
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
    const response = await fetchAPI({
      url: EXPENSE_CATEGORIES_API,
      method: 'GET',
      body: {},
    });
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
          getExpenseStatistics={getExpenseStatistics}
          transaction={selectedTransaction}
          categories={categories}
          setShowForm={setShowForm}
          user={user}
        />
      )}
      <section className="flex justify-between items-center mb-3">
        <h2>{getTranslate(lang, 'expense')}</h2>
        {user._id && (
          <a
            className={buttonStyle}
            onClick={() => {
              setShowForm(true);
              setSelectTransaction({});
            }}
          >
            {getTranslate(lang, 'addNew')}
          </a>
        )}
      </section>
      <section className="flex mb-3 flex-col gap-x-3 md:flex-row">
        <ExpenseDates
          curYear={curYear}
          curMonth={curMonth}
          setYear={setYear}
          setMonth={setMonth}
        />
        <article className="rounded p-2 bg-card md:flex-1">
          <p className="text-right capitalize text-2xl font-bold text-red-600">
            <Icon name={'sack-dollar'} />
            {getTranslate(lang, 'total')}:{curTotal}
          </p>
          {loading ? (
            <div className="flex justify-center">
              <Loading />
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
