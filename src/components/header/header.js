import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import Logo from "../../assets/logo.jpg";
import { auth } from "../../firebase/firebase";
import { connect } from "react-redux";
import CartIcon from "../cart-item/cart-item";
import Cart from "../cart/cart";

import { createStructuredSelector } from "reselect";
import { cartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

const Header = ({ currentUser, hidden }) => {
  return (
    <>
      <div className="header">
        <Link to="/" className="logo-container">
          <img src={Logo} className="logo" />
        </Link>
        <div className="options">
          <Link to="/" className="option">
            Home
          </Link>
          <Link to="/shop" className="option">
            Shop
          </Link>
          <Link to="/contact" className="option">
            Contact
          </Link>
          {currentUser ? (
            <div className="option" onClick={() => auth.signOut()}>
              Sign Out
            </div>
          ) : (
            <Link className="option" to="/signin">
              Sign in
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
      {hidden ? null : <Cart />}
    </>
  );
};

// Przekazanie stanu aplikacji - metoda I

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden
// });

// Przekazanie stanu aplikacji przy użyciu selektorów, które nie renderują komponenty jeśli stan aplikacji nie ulega zmianie - import {createSelector} from 'reselect'

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  hidden: cartHidden(state)
});
export default connect(mapStateToProps)(Header);
