//This code imports Axios and creates an Axios instance with a base URL of 'http://127.0.0.1:8000/'. 
//Meaning every request made using this api instance will automatically prepend this base URL to the path you provide in the request. 
//For example, api.get('/users/') would translate to http://127.0.0.1:8000/users/.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  // headers is optional but specifies request bodies to be JSON formatted and helps process recieved data 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;