import type { NextPage } from "next";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { fetchAPI, getTranslate } from "helpers";
import AppContext from "AppContext";
import ExpenseForm from "@/components/expense/ExpenseForm";
import ExpenseList from "@/components/expense/ExpenseList";
import ExpenseHeader from "@/components/expense/ExpenseHeader";
import { Transaction, ExpenseResponse } from "types";
import { EXPENSE_LIST_API, EXPENSE_CATEGORIES_API } from "../constants";
import Loading from "@/components/Loading";

function getCurrentMonth() {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
}

const EMPTY_EXPENSE_RESPONSE: ExpenseResponse = {
  total: "$0.00",
  date: getCurrentMonth(),
  endDate: "",
  categoryPrice: [],
  incomes: "$0.00",
  expenses: "$0.00",
};

interface STATISTICS_BODY {
  date: string;
  endDate?: string;
  categories?: string[];
}

const Expense: NextPage = () => {
  const router = useRouter();
  const { user, lang } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<String[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<String[]>([]);
  const [selectedTransaction, setSelectTransaction] = useState<Transaction>({});
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [expenseResponse, setExpenseResponse] = useState<ExpenseResponse>(
    EMPTY_EXPENSE_RESPONSE
  );

  const getExpenseStatistics = async ({
    date,
    endDate,
    categories = [],
  }: STATISTICS_BODY) => {
    setLoading(true);
    const expenseResp = await fetchAPI({
      url: EXPENSE_LIST_API,
      body: {
        date,
        endDate,
        categories,
      },
    });
    setLoading(false);
    if (expenseResp.status == 200) {
      setExpenseResponse((prev) => ({
        ...prev,
        total: expenseResp.total,
        incomes: expenseResp.incomes,
        expenses: expenseResp.expenses,
        categoryPrice: expenseResp.categoryPrice,
      }));
    }
  };

  // useEffect(() => {
  //   getExpenseStatistics();
  // }, [expenseResponse.date, expenseResponse.endDate, selectedCategories]);
  const init = () => {
    const expenseResponse: ExpenseResponse = EMPTY_EXPENSE_RESPONSE;
    const options: STATISTICS_BODY = { date: "" };
    if (router.isReady) {
      const { date, endDate, categories } = router.query;

      if (date && typeof date === "string") {
        expenseResponse.date = date;
        options.date = date;
      }
      if (endDate && typeof endDate === "string") {
        expenseResponse.endDate = endDate;
        options.endDate = endDate;
      }
      setExpenseResponse(expenseResponse);
      if (categories) {
        const categoryArray = Array.isArray(categories)
          ? categories
          : [categories];
        setSelectedCategories(categoryArray as string[]);
        options.categories = categoryArray;
      }
    }
    getExpenseStatistics(options);
  };

  useEffect(() => {
    init();
    getCategories();
  }, [router.query]);

  const getCategories = async () => {
    if (categories.length > 0) return;
    const response = await fetchAPI({
      url: EXPENSE_CATEGORIES_API,
      method: "GET",
      body: {},
    });
    if (Array.isArray(response.categories)) {
      setCategories(response.categories);
    }
  };

  const openTransactionDetail = (t: Transaction) => {
    setShowForm(true);
    t.price = t.price?.replace("$", "");
    if (!t.income) {
      t.price = `-${t.price}`;
    }
    setSelectTransaction(t);
  };

  const toggleCategory = (category: String) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelectedCategories);
    updateQueryParams(
      expenseResponse.date,
      expenseResponse.endDate,
      newSelectedCategories
    );
  };

  const updateQueryParams = (
    date?: string,
    endDate?: string,
    categories?: String[]
  ) => {
    const query: any = {};
    if (date) query.date = date;
    if (endDate) query.endDate = endDate;
    if (categories && categories.length > 0) query.categories = categories;
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const handleDateChange = (date: string, field: string) => {
    setExpenseResponse({ ...expenseResponse, [field]: date });
    if (field === "date") {
      updateQueryParams(date, expenseResponse.endDate);
    } else {
      updateQueryParams(expenseResponse.date, date);
    }
  };

  const downloadCSV = async () => {
    setDownloading(true);
    try {
      const response = await fetchAPI({
        url: EXPENSE_LIST_API,
        body: {
          date: expenseResponse.date,
          endDate: expenseResponse.endDate,
          categories: selectedCategories,
          downloadCsv: true,
        },
        responseType: "text",
      });

      if (response.status === 200 && response.data) {
        // Add BOM for proper UTF-8 encoding in Excel
        const bom = "\uFEFF";
        const csvData = bom + response.data;

        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const filename = `expenses-${expenseResponse.date}${
          expenseResponse.endDate ? `-${expenseResponse.endDate}` : ""
        }.csv`;
        link.download = filename;
        link.style.display = "none";
        document.body.appendChild(link);

        link.click();

        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      } else {
        alert("Failed to download CSV. Status: " + response.status);
      }
    } catch (error: any) {
      console.error("Failed to download CSV:", error);
      alert("Error downloading CSV: " + error.message);
    } finally {
      setDownloading(false);
    }
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
        <div className="flex gap-2">
          {user._id && (
            <>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={downloadCSV}
                disabled={downloading}
              >
                {downloading ? "Downloading..." : "Download CSV"}
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setShowForm(true);
                  setSelectTransaction({});
                }}
              >
                {getTranslate(lang, "addNew")}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-700 mb-2">
          Filter by Categories:
        </h2>
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <button
              key={category.toString()}
              onClick={() => toggleCategory(category)}
              className={`px-2 py-1 cursor-pointer rounded text-sm font-medium border transition-colors capitalize ${
                selectedCategories.includes(category)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <ExpenseHeader
        expenseResponse={expenseResponse}
        onDateChange={handleDateChange}
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
