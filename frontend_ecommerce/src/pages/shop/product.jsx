import React from "react";
import { useCart } from "../../context/cart-shop/hook/cart-hook";
import { TokenStorage } from "../../utils/auth/token-storage";
import { useAuth } from "../../context/auth/hooks/auth-hook";
import { showLoginRequiredToast } from "../../utils/toast-helper";

export const Product = (props) => {
  const { id, name, price, image_url } = props.data;
  const { addToCart, cartItems } = useCart();
  const { isAuthenticated } = useAuth();

  const cartItemCount = cartItems[id]?.quantity;
  
  const handlecart = () => {
    if (!isAuthenticated) {
      showLoginRequiredToast();
      return;
    }

    addToCart(id);
  };

  return (
    <div className="product">
      <img src={image_url} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className="addToCartBttn" onClick={handlecart}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};