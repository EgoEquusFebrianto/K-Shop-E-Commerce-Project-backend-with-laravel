import React from 'react'

const PRODUCT_CACHE_KEY = "products";
const PRODUCT_CACHE_TTL = 5 * 6 * 1000; // 5 menit (300.000 ms)

export const loadProductCached = () => {
    try {
        const cache = localStorage.getItem(PRODUCT_CACHE_KEY);

        if (!cache) {
            return null;
        }

        return JSON.parse(cache);
    } catch (err) {
        console.error("Failed to load product cache:", err);
        return null;
    }
}

export const saveProducts = (products) => {
    try {
        localStorage.setItem(
            PRODUCT_CACHE_KEY,
            JSON.stringify({
                timestamp: Date.now(),
                data: products,
            })
        );
    } catch (err) {
        console.error("Failed to save product cache:", err);
    }
}

export const isProductCachedExpired = (cache) => {
    return Date.now() - cache.timestamp > PRODUCT_CACHE_TTL;
}

export const clearProducts = () => {
    localStorage.removeItem(PRODUCT_CACHE_KEY);
}