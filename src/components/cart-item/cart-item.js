import React from "react";
import { ReactComponent as ShoppingBag } from "../../assets/shopping-bag.svg";
import "./cart-item.styles.scss";

import { connect } from "react-redux";
import toggleCartHidden from "../../redux/cart/cart.actions";
import { changeNumberInShop } from "../../redux/cart/cart.selectors";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  return (
    <div className="class-icon" onClick={toggleCartHidden}>
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = state => ({
  itemCount: changeNumberInShop(state)
});
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
