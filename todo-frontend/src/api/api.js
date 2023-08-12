import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
api.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'application/json';
  if (localStorage.getItem('userToken')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userToken')).token
    }`;
  }
  return req;
});

export default api;
