import React from 'react'
import { Category } from './category/category'
import { SearchInput } from './search-input/search-input'
import { SearchButton } from './search-button/search-button'
import "./producer-search.css";

export const ProductSearchPannel = () => {
  return (
    <div className='product-search-panel'>
        <Category />

        <div className='search-container'>
            <SearchInput />
            <SearchButton />
        </div>
    </div>
  )
}