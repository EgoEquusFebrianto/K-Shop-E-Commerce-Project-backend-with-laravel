import axios from "axios";
import { TokenStorage } from "../util/token-storage";

const API = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor untuk menambahkan token
API.interceptors.request.use(
    (config) => {
        const token = TokenStorage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk handle response
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            TokenStorage.clear();
        }
        return Promise.reject(error);
    }
);

export default API;