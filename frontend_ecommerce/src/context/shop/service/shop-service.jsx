import React from 'react'
import API from '../../api/api'

export const ShopService = {
  getAll: async () => {
    const response = await API.get("/products");

    return response.data;
  },
}
