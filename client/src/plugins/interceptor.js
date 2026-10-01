import axios from 'axios';

let baseURL = 'http://localhost:8000/api/';

const httpClient = axios.create({ baseURL });

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 1. Request Interceptor: Attach access token from localStorage
httpClient.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.access) {
        config.headers['Authorization'] = `Bearer ${user.access}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Handle token expiration and automatic refreshing
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already retried this request
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) throw new Error('No user found');
        
        const user = JSON.parse(userStr);
        const refreshToken = user.refresh;

        // Call your Django 'refresh' endpoint using plain axios
        const response = await axios.post(`${baseURL}refresh`, {
          refresh: refreshToken,
        });

        const { access: newAccessToken } = response.data;

        // Update the access token inside the user object in localStorage
        user.access = newAccessToken;
        localStorage.setItem('user', JSON.stringify(user));
        
        // Update headers and retry the original request
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return httpClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Refresh token expired or invalid -> Clear storage and redirect to login
        localStorage.removeItem('user');
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;