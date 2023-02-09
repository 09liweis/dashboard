class GoogleMap {
  constructor() {
    this.mapObj = null;
  }
  initMap(containerId, pos) {
    this.mapObj = new google.maps.Map(document.getElementById(containerId), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 19,
    });

    if (pos?.lat && pos?.lng) {
      this.mapObj.setCenter(pos);
    }

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
  setCenter(pos) {
    if (!pos) return;
    if (this.mapObj) {
      this.mapObj.setCenter({
        lat: parseFloat(pos.lat),
        lng: parseFloat(pos.lng),
      });
    }
  }
  getPlaceAutocomplete = (cb) => {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'),
      { types: ['establishment'] } // 'establishment' / 'address' / 'geocode'
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const { place_id, formatted_address, name, geometry } =
        autocomplete.getPlace();
      cb({
        place_id,
        name,
        address: formatted_address,
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      });
    });
  };
}

function loadGoogleMapScript(cb) {
  var script = document.createElement('script');
  script.src =
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos&libraries=places&v=weekly&callback=initMap';
  script.async = true;

  // Attach your callback function to the `window` object
  window.initMap = function () {
    // JS API is loaded and available
    cb();
  };
  // Append the 'script' element to 'head'
  document.head.appendChild(script);
}

export { GoogleMap, loadGoogleMapScript };
