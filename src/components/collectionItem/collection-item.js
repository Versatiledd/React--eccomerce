import React from "react";
import Button from "../buttons/Buttons";
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
        <Button>Dodaj do karty</Button>
      </div>
    </>
  );
};

export default CollectionItem;
