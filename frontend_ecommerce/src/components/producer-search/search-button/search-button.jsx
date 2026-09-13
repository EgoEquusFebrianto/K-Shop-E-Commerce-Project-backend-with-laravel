import React from 'react'
import { FiSearch } from 'react-icons/fi'
import "./search-button.css";
import { useShop } from '../../../context/shop/hook/useShop';

export const SearchButton = () => {
  const { callProducts } = useShop();

  return (
    <button className='search-button' onClick={() => callProducts(0)}>
        <FiSearch />
    </button>
  )
}