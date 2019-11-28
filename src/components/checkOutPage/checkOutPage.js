import React from "react";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal
} from "../../redux/cart/cart.selectors";

import "./checkOut.styles.scss";

const checkOutPage = ({ cartItems, total }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header">
          <span className="title">Produkt</span>
        </div>
        <div className="header">
          <span className="title">Opis</span>
        </div>
        <div className="header">
          <span className="title">Ilość</span>
        </div>
        <div className="header">
          <span className="title">Cena</span>
        </div>
        <div className="header">
          <span className="title">Usuń</span>
        </div>
      </div>
      {cartItems.map(item => item.name)}
      <div className="total">
        <span>Koszt całkowity: ${total}</span>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});
export default connect(mapStateToProps)(checkOutPage);
