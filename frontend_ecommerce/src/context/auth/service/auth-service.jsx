import React from 'react'
import API from '../../api/api'
import { TokenStorage } from '../../../utils/auth/token-storage';

const AuthService = {
    login: async (email, password) => {
        const response = await API.post("/auth/login", {
            email,
            password
        });

        // simpan data ke localStorage
        const {token, user} = response.data;
        TokenStorage.save(token, user);

        return response.data
    },

    register: async (request) => {
        const response = await API.post("/auth/register", request);

        // simpan data ke localStorage
        const {token, user} = response.data;
        TokenStorage.save(token, user);

        return response.data
    },

    getMe: async () => {
        const response = await API.get("/auth/me");

        return response.data;
    },
    
    logout: () => {
        TokenStorage.clear();
    },
};

export default AuthService