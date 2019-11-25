import React from "react";
import Button from "../buttons/Buttons";
import "./cart.styles.scss";

const Cart = () => {
  return (
    <div className="cart-container">
      <div className="cart-items"></div>
      <Button>Przejdź do płatności</Button>
    </div>
  );
};

export default Cart;
