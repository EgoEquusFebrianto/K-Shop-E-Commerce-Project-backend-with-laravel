import React from 'react'
import { useShop } from '../../../context/shop/hook/shop-hook';
import "./category.css";

export const Category = () => {
  const { categories, categoryId, setCategoryId } = useShop();

  return (
    <select 
      className='category-select'
      value={categoryId ?? ""}
      onChange={(e) => {
        const value = e.target.value;

        setCategoryId(
          value === "" ? null : Number(value)
        );
      }}
    >
      <option value="">
        All
      </option>

      {
        categories.map((category) => (
          <option
            key={category.id}
            value={category.id} 
          >
            {category.name}
          </option>
        ))
      }
    </select>
  )
}
