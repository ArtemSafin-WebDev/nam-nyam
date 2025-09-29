document.addEventListener("DOMContentLoaded", () => {
  function initMapForElement(element) {
    let map, placemark, geocoder;

    function initMap() {
      // Initialize map
      map = new ymaps.Map(element.querySelector(".js-map-element"), {
        center: [55.7558, 37.6176], // Moscow coordinates
        zoom: 10,
        controls: ["zoomControl", "fullscreenControl"],
      });

      // Initialize geocoder
      geocoder = ymaps.geocode;

      // Add click event listener to map
      map.events.add("click", function (e) {
        const coords = e.get("coords");
        updateAddressFromCoords(coords);
      });

      // Add initial placemark
      placemark = new ymaps.Placemark(
        map.getCenter(),
        {},
        {
          draggable: true,
          preset: "islands#redDotIcon",
        }
      );

      map.geoObjects.add(placemark);

      // Add drag event listener to placemark
      placemark.events.add("dragend", function () {
        const coords = placemark.geometry.getCoordinates();
        updateAddressFromCoords(coords);
      });
    }

    function updateAddressFromCoords(coords) {
      // Update placemark position
      placemark.geometry.setCoordinates(coords);

      // Geocode coordinates to address
      geocoder(coords).then(function (res) {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          const address = firstGeoObject.getAddressLine();
          const addressInput = document.querySelector(".js-address-input");
          addressInput.value = address;

          //   addressInput.dispatchEvent(new Event("input"));
          //   $(addressInput).trigger("input");
          $(addressInput).parsley().validate();
        } else {
          const addressInput = document.querySelector(".js-address-input");
          addressInput.value = "";
        }
      });
    }

    function updateMapFromAddress(address) {
      if (!address.trim()) return;

      geocoder(address).then(function (res) {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          const coords = firstGeoObject.geometry.getCoordinates();
          map.setCenter(coords, 16);
          placemark.geometry.setCoordinates(coords);
        }
      });
    }

    ymaps.ready(initMap);

    const addressInput = document.querySelector(".js-address-input");
    if (addressInput) {
      let addressTimeout;
      addressInput.addEventListener("input", function () {
        clearTimeout(addressTimeout);
        addressTimeout = setTimeout(function () {
          updateMapFromAddress(addressInput.value);
        }, 1000); // Wait 1 second after user stops typing
      });
    }
  }

  if (!window.namNyamApi) {
    window.namNyamApi = {};
  }
  window.namNyamApi.initMapForElement = initMapForElement;

  const elements = Array.from(document.querySelectorAll(".js-form-with-map"));
  elements.forEach((element) => {
    initMapForElement(element);
  });
});
