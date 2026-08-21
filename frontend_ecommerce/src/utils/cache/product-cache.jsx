import React from 'react'

const PRODUCT_CACHE_KEY = "products";
const PRODUCT_CACHE_TTL = 5 * 6 * 1000; // 5 menit (300.000 ms)

const buildCacheKey = (page, keyword, categoryId) => {
    return [
        `page=${page}`,
        `keyword=${keyword?.trim().toLocaleLowerCase() ?? null}`,
        `categoryId=${categoryId ?? null}`
    ].join("|");
};

export const loadProductCached = (page, keyword, categoryId) => {
    try {
        const cache = localStorage.getItem(PRODUCT_CACHE_KEY);

        if (!cache) {
            return null;
        }

        const parsed = JSON.parse(cache);

        if (isProductCachedExpired(parsed)) {
            clearProducts();
            return null;
        }

        const key = buildCacheKey(page, keyword, categoryId);
        
        return parsed.pages?.[key] ?? null;
    } catch (err) {
        console.error("Failed to load product cache:", err);
        return null;
    }
}

export const saveProducts = (page, keyword, categoryId, payload) => {
    try {
        const cache = localStorage.getItem(PRODUCT_CACHE_KEY);

        let parsed = {
            timestamp: Date.now(),
            pages: {}
        };

        if (cache) {
            parsed = JSON.parse(cache);
        }

        parsed.timestamp = Date.now();
        parsed.pages[buildCacheKey(page, keyword, categoryId)] = payload;

        localStorage.setItem(
            PRODUCT_CACHE_KEY,
            JSON.stringify(parsed)
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