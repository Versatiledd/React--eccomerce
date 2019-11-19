import React from "react";
import "./menu-items.styles.scss";

const MenuItems = ({ title, imgUrl }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl})`
      }}
      className="menu-item"
    >
      <div className="content">
        <h2 className="title">{title}</h2>
        <span className="subtitle">Kup teraz</span>
      </div>
    </div>
  );
};

export default MenuItems;
