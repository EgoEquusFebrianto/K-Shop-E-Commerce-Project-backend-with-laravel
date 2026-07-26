import React, { useContext } from 'react'
import { ShopContext } from '../shop-context';

export const useShop = () => {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}