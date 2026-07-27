import React, { useContext } from "react";
import { ShopContext } from "../../context/shop/shop-context";
import { useCart } from "../../context/cart-shop/hook/cart-hook";

export const CartItem = (props) => {
  const { id, name, price, image_url } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useCart();

  return (
    <div className="cartItem">
      <img src={image_url} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]?.quantity ?? 0}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            min={0}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
