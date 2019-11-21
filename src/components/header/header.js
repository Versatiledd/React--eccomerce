import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import Logo from "../../assets/logo.jpg";
import { auth } from "../../firebase/firebase";

const Header = ({ currentUser }) => {
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
          {/* <Link to="/signin" className="option">
            Sign In
          </Link> */}
          {currentUser ? (
            <div className="option" onClick={() => auth.signOut()}>
              Sign Out
            </div>
          ) : (
            <Link className="option" to="/signin">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
