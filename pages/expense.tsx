import type { NextPage } from 'next';
import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchAPI } from '../helpers';
import AppContext from '../AppContext';

const EXPANSE_API: string =
  'https://samliweisen.onrender.com/api/transactions/statistics';

const CATEGORIES_api: string =
  'https://samliweisen.onrender.com/api/transactions/categories';

interface SingleExpense {
  name: string;
  y: number;
}

interface Transaction {
  _id: string;
  price: number;
  date: string;
  title: string;
  place: {
    _id: string;
    name: string;
  };
}

interface CategoryTransaction {
  total: number;
  items: [Transaction];
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

let formMap: google.maps.Map;

const Expense: NextPage = () => {
  const { user } = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);

  const titleInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const dateInput = useRef<HTMLInputElement>(null);
  const placeInput = useRef<HTMLInputElement>(null);

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
      url: EXPANSE_API,
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

  useEffect(() => {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos&libraries=places&v=weekly&callback=initMap';
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = function () {
      // JS API is loaded and available
    };
    // Append the 'script' element to 'head'
    document.head.appendChild(script);
  }, []);

  const getPlaceAutocomplete = () => {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'),
      { types: ['establishment'] } // 'establishment' / 'address' / 'geocode'
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const { place_id, formatted_address, name, geometry } =
        autocomplete.getPlace();
      const place = {
        place_id,
        name,
        address: formatted_address,
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      };
      formMap.setCenter(place);
    });
  };

  const loadFormMap = () => {
    setTimeout(() => {
      formMap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 16,
      });

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          formMap.setCenter({ lat: latitude, lng: longitude });
        },
        (err) => {},
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      getPlaceAutocomplete();
    }, 5);
  };

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

  const expensesHTML = Object.keys(categoryTransactions).map((key) => {
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
              <li key={_id} className="box">
                <div>{place.name}</div>
                <div className="box box2">
                  <div>{date}</div>
                  <div>{title}</div>
                  <div>${price}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const body = {
      title: titleInput.current?.value,
      price: priceInput.current?.value,
      date: dateInput.current?.value,
    };
    console.log(body);
  };

  const formHTML = (
    <section className="bg-black fixed w-full h-full flex justify-center items-center top-0 left-0">
      <form
        onSubmit={handleFormSubmit}
        className="w-96 p-2 border rounded-lg bg-white"
      >
        <input
          ref={titleInput}
          className="w-full border p-2 mb-2"
          placeholder="Title"
        />
        <input
          type="number"
          ref={priceInput}
          className="w-full border p-2 mb-2"
          placeholder="Price"
        />
        <input
          type="date"
          ref={dateInput}
          className="w-full border p-2 mb-2"
          placeholder="Date"
        />
        <input
          id="address"
          ref={placeInput}
          className="w-full border p-2 mb-2"
          placeholder="Place"
        />
        <section id="map" className="w-full h-36 border rounded-lg"></section>
        <button className="border bg-red-500 text-white p-2 rounded-lg">
          Add
        </button>
      </form>
    </section>
  );

  return (
    <>
      {showForm ? formHTML : null}
      <section className="flex justify-between items-center mb-3">
        <h2>费用支出</h2>
        {user._id ? (
          <a
            className="p-2 bg-red-400 text-white border rounded-xl cursor-pointer hover:bg-red-500 transition duration-300"
            onClick={() => {
              setShowForm(true);
              loadFormMap();
            }}
          >
            Add New
          </a>
        ) : null}
      </section>
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
          {loading ? (
            <div className="flex justify-center">
              <i className="animate-spin margin-auto fa-solid fa-spinner"></i>
            </div>
          ) : (
            expensesHTML
          )}
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
