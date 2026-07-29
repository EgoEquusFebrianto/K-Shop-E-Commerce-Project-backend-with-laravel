import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/shop/shop-context";
import { useCart } from "../../context/cart-shop/hook/cart-hook";
import { useAuth } from "../../context/auth/hooks/auth-hook";

export const CartItem = (props) => {
  const { id, name, price, image_url } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useCart();
  const [inputValue, setInputvalue] = useState(
    cartItems[id]?.quantity.toString() ?? ""
  );
  const { isAuthenticated } = useAuth();

  const handlerBlur = () => {
    if (inputValue.trim() === "") {
      setInputvalue(cartItems[id].quantity.toString());
      return;
    }

    updateCartItemCount(Number(inputValue), id);
  };

  useEffect(() => {
    setInputvalue(
      cartItems[id]?.quantity.toString() ?? ""
    )
  }, [cartItems, id]);

  const handleAdd = () => {
    if (!isAuthenticated) {
        showLoginRequiredToast();
        return;
    }

    addToCart(id);
  };

  const handleRemove = () => {
      if (!isAuthenticated) {
          showLoginRequiredToast();
          return;
      }

      removeFromCart(id);
  };
  return (
    <div className="cartItem">
      <img src={image_url} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={handleRemove}> - </button>
          <input
            // value={cartItems[id]?.quantity ?? 0}
            // onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            value={inputValue}
            onChange={(e) => setInputvalue(e.target.value)}
            onBlur={handlerBlur}
          />
          <button onClick={handleAdd}> + </button>
        </div>
      </div>
    </div>
  );
};
