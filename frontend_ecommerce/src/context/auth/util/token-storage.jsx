import React from 'react'

const ACESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const TokenStorage = {
    save: (token, user) => {
        localStorage.setItem(ACESS_TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));

    },

    getToken: () => {
        return localStorage.getItem(ACESS_TOKEN_KEY);
    },

    getUser: () => {
        const value = localStorage.getItem(USER_KEY);
        if (!value) return null;

        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    },

    clear: () => {
        localStorage.removeItem(ACESS_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }
};
