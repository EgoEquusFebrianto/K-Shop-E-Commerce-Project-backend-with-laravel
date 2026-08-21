import React from 'react'
import API from '../../api/api'

export const ShopService = {
  getAll: async (page, keyword, categoryId) => {
    const params = new URLSearchParams();

    params.append("page", page);

    if (keyword) {
      params.append("search", keyword);
    }

    if (categoryId !== null) {
      params.append("category", categoryId);
    }
    
    const response = await API.get(`/products?${params.toString()}`);
    
    return response.data;
  },

  getAllCategories: async () => {
    const response = await API.get("/categories");

    return response.data;
  },

  getSuggestions: async (keyword, signal) => {
    const response = await API.get(
      `/products?search=${encodeURIComponent(keyword)}`, { signal }
    );
    return response.data;
  },
}