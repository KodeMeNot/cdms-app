import axios from 'axios';
import { getItem, removeAll, removeItem } from './lib/myStore';
import App from './components/app';
import 'style/index.styl';

// const HTTP_UNAUTHORIZED_CODE = 401;

function processPendingRequests(requestQueue) {
  requestQueue = JSON.parse(requestQueue);
  // requestQueue = JSON.parse(getItem('requestQueue'));
  let promises = [];
  requestQueue.map((req) => {
    let method;
    if (req.method === "PUT") {
      method = 'put';
    }
    if (req.method === 'POST') {
      method = 'post';
    }
    if (req.method === 'DELETE') {
      method = 'del';
    }
    promises.push(axios[method](req.url, req.body));
    // requestQueue.splice(index, 1);
    // a = requestQueue;
    // setItem('requestQueue', JSON.stringify(a));
  });
  return Promise.all(promises)
    .then(() => {
      console.log('All offline request queue has been cleared');
      removeItem('requestQueue');
    });
}

// window.addEventListener('offline', () => {
//   // console.log('offline');
//   alert('You are working offline now. The data will be synced when the internet is back.');
// });

window.addEventListener('online', () => {
  console.log('online');
  //When user is online, get requests from queue and call corresponding APIs
  let requestQueue = getItem('requestQueue');
  if (!Object.keys(requestQueue).length) return;
  processPendingRequests(requestQueue);
});


axios.interceptors.request.use(
  config => {
    if (config.url.search('amazonaws') === -1) {
      /*
        T1011
        Modified By: Harshavardhan Jadhav
        Modified On: 12 Nov 2020
        Modification console.log commented
      */
      // console.log("trueeeeeeeee",getItem('token'));
      const token = getItem('token').token;
      if (token) {
        config.headers['Authorization'] = token;
      }
      config.headers['Content-Type'] = 'application/json';
    } else {
      delete config.headers.authorization;
    }
    /*
      T1011
      Modified By: Harshavardhan Jadhav
      Modified On: 12 Nov 2020
      Modification console.log commented
    */
    // console.log(config);
    return config;
  },
  error => {
    Promise.reject(error);
  });

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log(error, 'Error');
  if (401 === error.response.status) {
    // window.alert({
    //     title: "Session Expired",
    //     text: "Your session has expired. Would you like to be redirected to the login page?",
    //     type: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#DD6B55",
    //     confirmButtonText: "Yes",
    //     closeOnConfirm: false
    // }, function(){
    window.location = '/';
    // });
  } else if (706 === error.response.status) {
    removeAll();
    window.location = '/';
  }
  else {
    return Promise.reject(error);
  }
});


export default App;
