import React from "react";
import { ReactComponent as ShoppingBag } from "../../assets/shopping-bag.svg";
import "./cart-item.styles.scss";

import { connect } from "react-redux";
import toggleCartHidden from "../../redux/cart/cart.actions";

const CartIcon = ({ toggleCartHidden }) => {
  return (
    <div className="class-icon" onClick={toggleCartHidden}>
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(null, mapDispatchToProps)(CartIcon);
