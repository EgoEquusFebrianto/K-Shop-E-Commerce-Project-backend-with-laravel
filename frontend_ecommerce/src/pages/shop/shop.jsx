import React from "react";
import { Product } from "./Product";
import { Pagination } from "../../components/pagination/Pagination";
import { ProductSearchPannel } from "../../components/producer-search/producer-search";
import { useShop } from "../../context/shop/hook/useShop";

import "./Shop.css";

export const Shop = () => {
  const { products } = useShop();
  
  return (
    <div className="shop" id="shop-top">
      <div className="shopTitle">
        <h1>K-Tech Shop</h1>
      </div>

      <ProductSearchPannel />

      <div className="products">
        {products.map((product) => (
          <Product data={product} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};
