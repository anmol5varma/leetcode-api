import axios from 'axios';

const http = axios.create();

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
http.defaults.timeout = 5000;

export const safeApiCall = (cb) => {
  try {
    return cb();
  } catch (err) {
    console.log(err);
    return {};
  }
};

export default http;
