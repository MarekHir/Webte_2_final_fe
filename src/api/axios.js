import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('authToken'); // Retrieve the auth token from wherever you store it

        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;