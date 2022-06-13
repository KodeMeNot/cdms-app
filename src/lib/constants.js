const CONSTANTS = {
  API_URL: 'http://localhost:9000',
  // API_URL: 'http://192.168.1.60:9000',
  // API_URL: 'http://test.kotharihyundai.com',
  googleMapsAPIKey: 'AIzaSyCN2hFrFD4wZHNVA8RwKdN-lQ8ph8u8SS4',
  defaultCenter: {
    lat: 20.7493472,
    lng: 78.5759262
  },
  center: {
    lat: 20.7493472,
    lng: 78.5759262
  },
  defaultZoom: 10
};

// function getCurrentLocation(position) {//eslint-disable-line
//   CONSTANTS.defaultCenter = {
//     // lat: Number(position.coords.latitude.toFixed(7)),
//     // lng: Number(position.coords.longitude.toFixed(7))
//     lat: 20.7493472,
//     lng: 78.5759262
//   };
// }

// (function getGeoLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(getCurrentLocation);
//   } else {
//     alert('Geolocation is not supported by this browser.');
//   }
// })();

export default CONSTANTS;
