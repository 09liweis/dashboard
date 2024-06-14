import React, { useRef, useState, useEffect } from 'react';
import { fetchAPI } from '../helpers';
import { loadGoogleMapScript, GoogleMap } from '../helpers/googleMap';
import {
  buttonStyle,
  EXPENSE_NEW_API,
  EXPENSE_UPDATE_API,
  EXPENSE_DELETE_API,
} from '../constants';
import Loading from './Loading';

const googleMap = new GoogleMap();

const TRANSACTION_FIELDS = [
  { name: 'title' },
  { name: 'price' },
  { name: 'date', type: 'date' },
];

export default function ExpenseForm({
  categories,
  transaction,
  setShowForm,
  user,
  getExpenseStatistics,
}) {
  const placeInput = useRef(null);
  const [curTransaction, setCurTransaction] = useState({});
  const [curPlace, setCurPlace] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurTransaction(transaction);
    if (transaction.place) {
      setCurPlace(transaction.place);
      placeInput.current.value = transaction.place.address;
    }
    loadGoogleMapScript(loadFormMap);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      googleMap.setCenter(curPlace);
    }, 20);
  }, [curPlace]);

  const loadFormMap = () => {
    googleMap.initMap('map', curTransaction.place);
    googleMap.getPlaceAutocomplete((place) => {
      setCurPlace(place);
      googleMap.setCenter(place);
    });
  };

  const updateCurTransaction = (value, name) => {
    const newTransaction = { ...curTransaction };
    newTransaction[name] = value;
    setCurTransaction(newTransaction);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user._id) {
      return;
    }
    const body = { ...curTransaction, place: curPlace };
    setLoading(true);
    const response = await fetchAPI({
      url: body.id ? EXPENSE_UPDATE_API(body.id) : EXPENSE_NEW_API,
      body,
      method: body.id ? 'PUT' : 'POST',
    });
    setLoading(false);
    getExpenseStatistics();
    setShowForm(false);
  };

  const handleTransactionDelete = async (id) => {
    if (!id) return;
    const response = await fetchAPI({
      url: EXPENSE_DELETE_API(id),
      method: 'DELETE',
    });
    getExpenseStatistics();
    setShowForm(false);
  };

  const formHTML = (
    <section className="bg-black z-10 fixed w-full h-full flex justify-center items-center top-0 left-0">
      <a
        className="transition duration-300 rotate-0 hover:rotate-45 absolute top-2 right-2 rounded-full bg-white p-1 flex justify-center items-center w-5 h-5 cursor-pointer"
        onClick={() => setShowForm(false)}
      >
        X
      </a>
      <form
        onSubmit={handleFormSubmit}
        className="w-96 p-2 border rounded-lg bg-white"
      >
        {TRANSACTION_FIELDS.map(({ name, type }) => (
          <input
            key={name}
            type={type || 'text'}
            name={name}
            value={curTransaction[name] || ''}
            className="w-full border p-2 mb-2"
            placeholder={name}
            onChange={(e) => updateCurTransaction(e.target.value, name)}
          />
        ))}
        <div>
          <label className="block mb-2">Category</label>
          <div className="overflow-x-scroll whitespace-nowrap">
            {categories.map((c) => (
              <span
                key={c}
                className={`inline-block mb-2 mr-2 border rounded-lg p-2 cursor-pointer ${curTransaction.category === c ? 'bg-red-400 text-white' : ''
                  }`}
                onClick={() => updateCurTransaction(c, 'category')}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <input
          id="address"
          ref={placeInput}
          className="w-full border p-2 mb-2"
          placeholder="Place"
        />
        <section
          id="map"
          className="mb-2 w-full h-36 border rounded-lg"
        ></section>
        {user._id && (
          <section className="flex justify-between">
            <button className={buttonStyle}>
              {loading ? <Loading /> : transaction.id ? 'Update' : 'Add'}
            </button>
            {transaction.id && (
              <button
                onClick={() => handleTransactionDelete(transaction.id)}
                className={`${buttonStyle}`}
              >
                Delete
              </button>
            )}
          </section>
        )}
      </form>
    </section>
  );

  return formHTML;
}
