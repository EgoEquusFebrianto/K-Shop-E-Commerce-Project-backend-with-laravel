import React, { useEffect, useState } from 'react'
import { useShop } from './context/shop/hook/shop-hook'
import API from './context/api/api'

export const TestPage = () => {
    const {
        products,
        categories,
        loading,
        categoryId,
        setCategoryId,

        page,
        first,
        last,
        totalPage,

        visiblePages,
        callProducts,

        keyword,
        setKeyword,

        suggestions,
        setSuggestions,
        fetchSuggestions,
    } = useShop();

    console.log(products)

    return (
    <div style={{paddingTop: '80px'}}>
        <pre>
            {JSON.stringify(
                products,
                null,
                2
            )}
        </pre>
    </div>
    )
}
