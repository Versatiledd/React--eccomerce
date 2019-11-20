import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import Logo from "../../assets/logo.jpg";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to="/" className="logo-container">
          <img src={Logo} className="logo" />
        </Link>
        <div className="options">
          <Link to="/shop" className="option">
            Shop
          </Link>
          <Link to="/contact" className="option">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
