import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use((req) => {
  let token = localStorage.getItem('userToken');
  req.headers['Content-Type'] = 'application/json';
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      localStorage.removeItem('userToken');
    }
    return Promise.reject(error);
  }
);

export default api;
