import React from "react";

import "./checkoutitem.styles.scss";

const checkOutItem = ({ item: { name, imageUrl, price, number } }) => {
  console.log(imageUrl, price);
  return (
    <>
      <div className="checkout-item">
        <div className="img-container">
          <img src={imageUrl} alt="" className="img" />
        </div>
        <span className="name">{name}</span>
        <span className="info">{price}</span>
        <span className="number">{number}</span>
        <div className="remove">&#10005;</div>
      </div>
    </>
  );
};

export default checkOutItem;
