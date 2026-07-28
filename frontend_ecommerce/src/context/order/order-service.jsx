import React from 'react'
import API from '../api/api'

const OrderService = {
    getAll: async () => {
        const response = await API.get('/orders');
        return response.data;
    },

    checkout: async () => {
        const response = await API.post('/orders');
        return response.data;
    },
}

export default OrderService