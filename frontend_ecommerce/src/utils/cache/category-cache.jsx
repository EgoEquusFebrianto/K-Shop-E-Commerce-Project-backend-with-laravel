const CATEGORY_CACHE_KEY = "categories";
const CATEGORY_CACHE_TTL = 5 * 60 * 1000; // 5 menit

import React from 'react'

export const LoadCategoryCache = () => {
    try {
        const cache = localStorage.getItem(CATEGORY_CACHE_KEY);

        if (!cache) return null;

        const parsed = JSON.parse(cache);

        if (!isCategoryCacheExpiration(parsed)) {
            clearCategory();
            return null;
        }

        return parsed.data;

    } catch (err) {
        console.error(err);
        return null
    }
};

export const SaveCategories = (categories) => {
    try {
        localStorage.setItem(
            CATEGORY_CACHE_KEY,
            JSON.stringify({
                timestamp: Date.now(),
                data: categories,
            })
        );
    } catch (err) {
        console.error(err);
    }
};

export const isCategoryCacheExpiration = (cache) => {
    return Date.now() - cache.timestamp > CATEGORY_CACHE_TTL;
};

export const clearCategory = () => {
    localStorage.removeItem(CATEGORY_CACHE_KEY);
};