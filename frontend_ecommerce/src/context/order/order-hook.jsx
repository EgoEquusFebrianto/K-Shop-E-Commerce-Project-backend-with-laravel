import React, { useContext } from 'react'
import { OrderContext } from './order-context';

export const useOrder = () => {
    const context = useContext(OrderContext);

    if (!context) {
        throw new Error("Can't Use OrderContextProviver.");
    }

    return context;
}