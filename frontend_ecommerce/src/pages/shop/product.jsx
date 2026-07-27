import React from "react";
import { useCart } from "../../context/cart-shop/hook/cart-hook";
import { TokenStorage } from "../../utils/auth/token-storage";

export const Product = (props) => {
  const { id, name, price, image_url } = props.data;
  const { addToCart, cartItems } = useCart();

  const cartItemCount = cartItems[id]?.quantity;
  
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