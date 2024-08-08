import type { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { fetchAPI, getTranslate } from '../helpers';
import AppContext from '../AppContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { Transaction, CategoryTransaction, ExpenseResponse } from '../types';
import {
  buttonStyle,
  EXPENSE_LIST_API,
  EXPENSE_CATEGORIES_API,
} from '../constants';
import Loading from '../components/Loading';

const Expense: NextPage = () => {
  const route = useRouter();

  const { user, lang } = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);

  const [categories, setCategories] = useState<String[]>([]);

  const [selectedTransaction, setSelectTransaction] =
    useState<Transaction>({});

  const [loading, setLoading] = useState(false);
  const [expenseResponse, setExpenseResponse] = useState<ExpenseResponse>({total:"",date:"",categoryPrice:[]});

  const getExpenseStatistics = useCallback(async () => {
    setLoading(true);

    const expenseResp = await fetchAPI({
      url: EXPENSE_LIST_API,
      body:{ date: expenseResponse.date },
    });
    setLoading(false);
    setExpenseResponse(expenseResp);
  }, [expenseResponse.date]);

  useEffect(() => {
    getExpenseStatistics();
  }, [expenseResponse.date]);

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
      <section className="flex mb-3 flex-col gap-x-3">

        <input className='w-full p-2 mb-2 rounded bg-card' type={"month"} value={expenseResponse.date} onChange={(e) => setExpenseResponse({...expenseResponse,date:e.target.value})} />

        <article className="rounded p-2 bg-card">
          <p className="text-right capitalize text-2xl font-bold text-red-600">
            {expenseResponse.total}
          </p>
          {loading ? (
            <div className="flex justify-center">
              <Loading />
            </div>
          ) : (
            <ExpenseList
              categoryTransactions={expenseResponse.categoryPrice}
              openTransactionDetail={openTransactionDetail}
            />
          )}
        </article>
      </section>
    </>
  );
};

export default Expense;
