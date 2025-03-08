import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6352',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 5000 // 5 second timeout
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        // Log request for debugging
        console.log('Making request to:', config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code === "ERR_NETWORK") {
            console.error("Network Error: Server might be down or unreachable");
        } else if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response Error:", error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
