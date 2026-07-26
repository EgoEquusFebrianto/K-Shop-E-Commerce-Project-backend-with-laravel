import React from 'react'
import API from '../api/api'
import { TokenStorage } from '../util/token-storage';

const AuthService = {
    login: async (email, password) => {
        const response = await API.post("/auth/login", {
            email,
            password
        });

        // simpan data ke localStorage
        const {accessToken, user} = response.data;
        TokenStorage.save(accessToken, user);

        return response.data
    },

    register: async (request) => {
        const response = await API.post("/auth/register", request);
        
        return response.data
    },

    logout: () => {
        TokenStorage.clear();
    },
};

export default AuthService