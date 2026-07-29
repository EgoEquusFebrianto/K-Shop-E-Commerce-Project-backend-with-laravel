import React, { useEffect, useState, createContext } from 'react'
import OrderService from './order-service';

export const OrderContext = createContext(null);

export const OrderContextProvider = (props) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchDataOrder();
    }, [])

    const fetchDataOrder = async () => {
        try {
            const response = await OrderService.getAll();
            setOrders(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteOrder = async (id) => {
        try {
            await OrderService.delete(id);
            setOrders((prev) => prev.filter(order => order.id !== id));
        } catch (err) {
            console.error(err);
        }
    }; 

    const contextValue = {
        orders,
        fetchDataOrder,
        deleteOrder,
    };

    return (
        <OrderContext.Provider value={contextValue}>
            {props.children}
        </OrderContext.Provider>
    );
}