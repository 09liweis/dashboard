import React, { useRef, useState, useEffect } from 'react';
import { fetchAPI } from '../helpers';

let formMap;

export default function ExpenseForm({ categories }) {
  const titleInput = useRef(null);
  const priceInput = useRef(null);
  const dateInput = useRef(null);
  const placeInput = useRef(null);
  const [category, setCategory] = useState('');
  const [place, setPlace] = useState({});

  useEffect(() => {
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos&libraries=places&v=weekly&callback=initMap';
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = function () {
      // JS API is loaded and available
      loadFormMap();
    };
    // Append the 'script' element to 'head'
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (formMap) {
      formMap.setCenter(place);
    }
  }, [place]);

  const getPlaceAutocomplete = () => {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'),
      { types: ['establishment'] } // 'establishment' / 'address' / 'geocode'
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const { place_id, formatted_address, name, geometry } =
        autocomplete.getPlace();
      setPlace({
        place_id,
        name,
        address: formatted_address,
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      });
    });
  };

  const loadFormMap = () => {
    setTimeout(() => {
      formMap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 19,
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: titleInput.current?.value,
      price: priceInput.current?.value,
      date: dateInput.current?.value,
      category,
      place,
    };
    const response = await fetchAPI({
      url: 'https://samliweisen.onrender.com/api/transactions/new',
      body,
    });
    console.log(response);
  };

  const formHTML = (
    <section className="bg-black z-10 fixed w-full h-full flex justify-center items-center top-0 left-0">
      <form
        onSubmit={handleFormSubmit}
        className="w-96 md:w-5/6 p-2 border rounded-lg bg-white"
      >
        <input
          ref={titleInput}
          className="w-full border p-2 mb-2"
          placeholder="Title"
        />
        <input
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
        <div>
          <label className="block mb-2">Category</label>
          <div className="overflow-x-scroll whitespace-nowrap">
            {categories.map((c) => (
              <span
                key={c}
                className={`inline-block mb-2 mr-2 border rounded-lg p-2 cursor-pointer ${
                  category === c ? 'bg-red-400 text-white' : ''
                }`}
                onClick={() => setCategory(c)}
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
        <section id="map" className="w-full h-36 border rounded-lg"></section>
        <button className="border bg-red-500 text-white p-2 rounded-lg">
          Add
        </button>
      </form>
    </section>
  );

  return formHTML;
}
