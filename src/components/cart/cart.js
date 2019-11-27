import React from "react";
import Button from "../buttons/Buttons";
import "./cart.styles.scss";
import CartItem from "../minicart/cart-item";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Cart = ({ cartItems, history }) => {
  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">Twoja karta jest pusta</span>
        )}
      </div>
      <Button className="btn-small" onClick={() => history.push("/checkout")}>
        Przejdź do płatności
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
});

export default withRouter(connect(mapStateToProps)(Cart));
