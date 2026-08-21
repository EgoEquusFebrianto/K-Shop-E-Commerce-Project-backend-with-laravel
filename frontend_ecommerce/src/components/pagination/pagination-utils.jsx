const MAX_VISIBLE_PAGE = 5;

import React from 'react'

export const getVisiblePage = (currentPage, totalPages) => {
    const visibleCount = Math.min(MAX_VISIBLE_PAGE, totalPages);
    let startPage = 1;

    // Kasus awal: current page 1, 2, 3
    if (currentPage <= 3) {
        startPage = 1;
    }
    // Kasus akhir: mendekati halaman terakhir
    else if (currentPage >= totalPages - 2) {
        startPage = totalPages - visibleCount + 1;
    } 
    // Kasus tengah: current page di tengah-tengah
    else {
        startPage = currentPage - 2;
    }

    const pages = [];
    for (let i = 0; i < visibleCount; i++) {
        pages.push(startPage + i);
    }

    return pages;
};