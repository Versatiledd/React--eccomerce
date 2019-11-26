import React from "react";
import "./cartitem.styles.scss";

const CartItem = ({ item: { imageUrl, name, price, number } }) => {
  console.log(name, price, imageUrl);
  return (
    <div className="cart">
      <img src={imageUrl} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {number} x {price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
