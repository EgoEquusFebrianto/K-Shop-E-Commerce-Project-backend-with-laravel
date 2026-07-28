import React from "react";
import { ShopContext } from "../../context/shop/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { useCart } from "../../context/cart-shop/hook/cart-hook";
import { useShop } from "../../context/shop/hook/shop-hook";

export const Cart = () => {
  const { products } = useShop();
  const { cartItems, getTotalCartAmount, checkout } = useCart();
  const totalAmount = getTotalCartAmount(products);

  const navigate = useNavigate();
  console.log(cartItems);

  const handleCheckout = async () => {

      if (!isAuthenticated) {
          showLoginRequiredToast();
          return;
      }

      try {
          await checkout();
          navigate("/orders");
      } catch (err) {
          console.error(err);
      }
  };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product) => {
          if (cartItems[product.id]?.quantity > 0) {
            return <CartItem key={product.id} data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button
            onClick={handleCheckout}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
