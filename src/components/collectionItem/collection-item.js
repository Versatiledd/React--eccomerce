import React from "react";

import "./collectionItems.styles.scss";

const CollectionItem = ({ id, name, price, imageUrl }) => {
  console.log(name, price, imageUrl);
  return (
    <>
      <div className="collection-item">
        <div
          className="image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="collection-footer">
          <span className="name">{name}</span>
          <span className="name">{price}</span>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;
