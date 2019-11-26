import React from "react";
import Button from "../buttons/Buttons";
import "./cart.styles.scss";
import CartItem from "../minicart/cart-item";
import { connect } from "react-redux";

const Cart = ({ cartItems }) => {
  console.log(cartItems);
  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button className="btn-small">Przejdź do płatności</Button>
    </div>
  );
};

const mapStateToProps = state => ({
  cartItems: state.hidden.cartItems
});

export default connect(mapStateToProps)(Cart);
