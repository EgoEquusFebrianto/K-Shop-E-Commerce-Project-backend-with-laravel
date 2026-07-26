import React from "react";
import { useShop } from "../../context/shop/hook/shop-hook";

export const Product = (props) => {
  const { id, name, price, image_url } = props.data;
  const { addToCart, cartItems } = useShop();

  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={image_url} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};