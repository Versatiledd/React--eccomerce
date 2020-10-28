import React from "react";
import { Link } from "react-router-dom";
import "./user-nav.scss";

const AdminNav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-wrapper">
        <li className="single-wrapper">
          <Link to="/admin/dashboard" className="single-link">
            Panel admina
          </Link>
        </li>
        <li className="single-wrapper">
          <Link to="/admin/product" className="single-link">
            Dodaj product
          </Link>
        </li>
        <li className="single-wrapper">
          <Link to="/admin/products" className="single-link">
            Produkty
          </Link>
        </li>
        <li className="single-wrapper">
          <Link to="/admin/kategorie" className="single-link">
            Kategorie
          </Link>
        </li>
        <li className="single-wrapper">
          <Link to="/admin/sub" className="single-link">
            Sub kategorie
          </Link>
        </li>
        <li className="single-wrapper">
          <Link to="/admin/sub" className="single-link">
            Kupony
          </Link>
        </li>
        <li className="single-wrapper">
          <Link to="/user/password" className="single-link">
            Zmiana hasła
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
