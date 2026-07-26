import React from "react";
import { Product } from "./product";
import "./shop.css";
import { useShop } from "../../context/shop/hook/shop-hook";

export const Shop = () => {
  const { products } = useShop();
  console.log(products);
  
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>K-Tech Shop</h1>
      </div>

      <div className="products">
        {products.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};
