import axios from "axios";


const http = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});

http.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Token ${ token }`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default http;
