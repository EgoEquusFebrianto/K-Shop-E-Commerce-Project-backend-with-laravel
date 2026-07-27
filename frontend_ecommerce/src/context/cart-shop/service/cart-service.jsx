import React from 'react'
import API from '../../api/api'

const CartService = {

    getAll: async () => {
        const response = await API.get("/cart");
        return response.data.data;
    },

    store: async (productId, quantity = 1) => {
        const response = await API.post("/cart", {
            product_id: productId,
            quantity
        });

        return response.data.data;
    },

    update: async (cartId, quantity) => {
        const response = API.patch(`/cart/${cartId}`, {
            quantity,
        })

        return (await response).data.data;
    },

    delete: async (cartId) => {
        await API.delete(`/cart/${cartId}`);
    },
}

export default CartService