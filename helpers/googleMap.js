class GoogleMap {
  constructor() {
    if (typeof google === 'undefined') {
      return;
    }
    this.mapObj = null;
  }
  
  initMap(containerId, pos) {
    if (typeof google == 'undefined') {
      return;
    }
    this.mapObj = new google.maps.Map(document.getElementById(containerId), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 17,
    });

    if (pos?.lat && pos?.lng) {
      this.mapObj.setCenter(pos);
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          this.mapObj.setCenter({ lat: latitude, lng: longitude });
        },
        (err) => {},
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }
  
  setCenter(pos) {
    if (!(pos.lat && pos.lng)) return;
    if (this.mapObj) {
      this.mapObj.setCenter({
        lat: parseFloat(pos.lat),
        lng: parseFloat(pos.lng),
      });
    }
  }
  
  getPlaceAutocomplete = (cb) => {
    // Check if the new PlaceAutocompleteElement is available
    if (google.maps.places && google.maps.places.PlaceAutocompleteElement) {
      try {
        // Use the new PlaceAutocompleteElement
        const inputElement = document.getElementById('address');
        
        // Create the autocomplete element with only supported properties
        const autocompleteElement = new google.maps.places.PlaceAutocompleteElement({
          componentRestrictions: { country: ['us', 'ca'] }, // Optional: restrict to specific countries
          types: ['establishment'] // 'establishment' / 'address' / 'geocode'
        });
        
        // Replace the input with the autocomplete element
        inputElement.parentNode.replaceChild(autocompleteElement, inputElement);
        autocompleteElement.id = 'address';
        
        // Listen for place selection
        autocompleteElement.addEventListener('gmp-placeselect', (event) => {
          const place = event.place;
          if (place && place.geometry && place.geometry.location) {
            cb({
              place_id: place.place_id,
              name: place.name || place.formatted_address,
              address: place.formatted_address,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          }
        });
      } catch (error) {
        console.warn('PlaceAutocompleteElement failed, falling back to legacy Autocomplete:', error);
        this.useLegacyAutocomplete(cb);
      }
    } else {
      // Fallback to the legacy Autocomplete class
      this.useLegacyAutocomplete(cb);
    }
  };

  useLegacyAutocomplete = (cb) => {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'),
      { 
        types: ['establishment'],
        fields: ['place_id', 'formatted_address', 'name', 'geometry']
      }
    );
    
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const { place_id, formatted_address, name, geometry } = place;
        cb({
          place_id,
          name,
          address: formatted_address,
          lat: geometry.location.lat(),
          lng: geometry.location.lng(),
        });
      }
    });
  };
}

function loadGoogleMapScript(cb) {
  if (document.getElementById('googlemap')) {
    return cb();
  }
  const API_KEY = 'AIzaSyDMi_pAnwNY6HwnTHf_rQxUcEXywsFvKpQ';
  var script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&v=weekly&callback=initMap`;
  script.async = true;
  script.id = 'googlemap';

  // Attach your callback function to the `window` object
  window.initMap = function () {
    // JS API is loaded and available
    cb();
  };
  // Append the 'script' element to 'head'
  document.head.appendChild(script);
}

export { GoogleMap, loadGoogleMapScript };