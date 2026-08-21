import React from "react";
import { Product } from "./product";
import "./shop.css";
import { useShop } from "../../context/shop/hook/shop-hook";
import { Pagination } from "../../components/pagination/pagination";
import { ProductSearchPannel } from "../../components/producer-search/producer-search";

export const Shop = () => {
  const { products } = useShop();
  
  const raw = localStorage.getItem("products");
  const data = JSON.parse(raw);

  // console.log(data)
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
