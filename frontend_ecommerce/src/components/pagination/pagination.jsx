import React, { useEffect } from 'react'
import "./pagination.css"
import { useShop } from '../../context/shop/hook/shop-hook';

export const Pagination = () => {
    const { page, first, last, totalPage, visiblePages, callProducts } = useShop();

    useEffect(() => {
    document.getElementById("shop-top")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
    }, [page]);

    return (
    <div className='pagination'>
        <button
            disabled={first}
            onClick={() => {
                callProducts(1);
            }}
        > 
            {"<<"} 
        </button>

        <button
            disabled={first}
            onClick={() => {
                callProducts(page - 1);
            }}
        > 
            {"<"} 
        </button>

        {visiblePages.map((pageNumber) => (
            <button
                key={pageNumber}
                className={pageNumber === page ? "active" : ""}
                onClick={() => {
                    if (pageNumber === page) {
                        return;
                    }

                    callProducts(pageNumber);
                }}

                // disabled={pageNumber === page}
            >
                {pageNumber}
            </button>
        ))}
        <button
            disabled={last}
            onClick={() => {
                callProducts(page + 1);
            }}
        > 
            {">"} 
        </button>
        
        <button
            disabled={last}
            onClick={() => {
                callProducts(totalPage);
            }}
        > 
            {">>"} 
        </button>
    </div>
  )
}
