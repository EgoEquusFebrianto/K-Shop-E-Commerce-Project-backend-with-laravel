import React, { useContext } from 'react'
import { ShopContext } from '../ShopContext';

export const useShop = () => {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error("useShop must be used inside ShopContextProvider");
    }

    return context;
}