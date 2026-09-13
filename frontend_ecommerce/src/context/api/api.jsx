import axios from "axios";
import { AccessTokenStorage } from "../../utils/auth/access-token-storage";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

/**
 * Menyimpan Promise refresh yang sedang berjalan.
 *
 * Tujuannya agar beberapa request yang mendapatkan
 * 401 secara bersamaan tidak melakukan refresh
 * token berkali-kali.
 *
 * @type {Promise<string> | null}
 */
let refreshPromise = null;

/**
 * Melakukan refresh access token.
 *
 * Jika proses refresh sedang berjalan, request lain
 * akan menggunakan Promise yang sama.
 *
 * @returns {Promise<string>}
 */
const refreshAccessToken = async () => {
    if (!refreshPromise) {
        refreshPromise = API.post("/auth/refresh").then(
            (response) => {
                const newAccessToken = response.data.access_token;
                const user = response.data.user;

                AccessTokenStorage.save(newAccessToken);

                return {
                    accessToken: newAccessToken,
                    user
                };
            }
        ).finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
};

/**
 * Interceptor untuk menambahkan token
 * 
 * @import {InternalAxiosRequestConfig} from 'axios
 * 
 * @throws {Error}
 */
API.interceptors.request.use(
    /**
     * 
     * @param {InternalAxiosRequestConfig} config 
     * @returns {InternalAxiosRequestConfig}
     */
    (config) => {
        const token = AccessTokenStorage.get();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor, untuk handle response
 * 
 * @import { AxiosResponse, AxiosError } from 'axios
 * 
 * @throws {Error}
 */
API.interceptors.response.use(

    /**
     * 
     * @param {AxiosResponse} response 
     * @returns {AxiosResponse} 
     */
    (response) => {
        return response;
    },

    /**
     * 
     * @param {AxiosError} error 
     * @returns {Promise<AxiosResponse>}
     */
    async (error) => {
        const originalRequest = error.config;

        const publicEndpoints = [
            '/auth/login',
            '/auth/register',
        ];
        const isPublicEndpoint = publicEndpoints.some(url =>
            originalRequest.url?.includes(url)
        );

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh") &&
            !isPublicEndpoint
        ) {
            originalRequest._retry = true;

            try {
                const token = AccessTokenStorage.get();
                if (token) {
                    return Promise.reject(error);
                }

                const {accessToken } = await refreshAccessToken();

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return API(originalRequest);
            } catch (refreshError) {
                AccessTokenStorage.clear();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

/**
 * @type {import("axios").AxiosInstance}
 */
export default API;