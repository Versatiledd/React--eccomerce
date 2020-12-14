import React from "react";
import { Link } from "react-router-dom";
import "./user-nav.scss";

const UserNav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-wrapper">
        <li className="single-wrapper">
          <Link to="/user/orders" className="single-link">
            Zamówienia
          </Link>
        </li>
        <li className="single-wrapper">
          <Link to="/user/wishlist" className="single-link">
            Listy zakupowe
          </Link>
        </li>
        {/* <li className="single-wrapper">
          <Link to="/user/password" className="single-link">
            Resetowanie hasła
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default UserNav;
