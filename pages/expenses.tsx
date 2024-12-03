import type { NextPage } from 'next';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { fetchAPI, getTranslate } from 'helpers';
import AppContext from 'AppContext';
import ExpenseForm from '@/components/expense/ExpenseForm';
import ExpenseList from '@/components/expense/ExpenseList';
import ExpenseHeader from '@/components/expense/ExpenseHeader';
import { Transaction, ExpenseResponse } from 'types';
import {
  EXPENSE_LIST_API,
  EXPENSE_CATEGORIES_API,
} from '../constants';
import Loading from '@/components/Loading';

const Expense: NextPage = () => {
  const { user, lang } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<String[]>([]);
  const [selectedTransaction, setSelectTransaction] = useState<Transaction>({});
  const [loading, setLoading] = useState(false);
  const [expenseResponse, setExpenseResponse] = useState<ExpenseResponse>({ 
    total: "", 
    date: "", 
    categoryPrice: [],
    incomes: "",
    expenses: "" 
  });

  const getExpenseStatistics = useCallback(async () => {
    setLoading(true);
    const expenseResp = await fetchAPI({
      url: EXPENSE_LIST_API,
      body: { date: expenseResponse.date },
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
    <div className="max-w-4xl mx-auto">
      {showForm && (
        <ExpenseForm
          getExpenseStatistics={getExpenseStatistics}
          transaction={selectedTransaction}
          categories={categories}
          setShowForm={setShowForm}
          user={user}
        />
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        {user._id && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => {
              setShowForm(true);
              setSelectTransaction({});
            }}
          >
            {getTranslate(lang, 'addNew')}
          </button>
        )}
      </div>

      <ExpenseHeader 
        expenseResponse={expenseResponse}
        onDateChange={(date) => setExpenseResponse({ ...expenseResponse, date })}
      />

      {loading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : (
        <ExpenseList
          categoryTransactions={expenseResponse.categoryPrice}
          openTransactionDetail={openTransactionDetail}
        />
      )}
    </div>
  );
};

export default Expense;