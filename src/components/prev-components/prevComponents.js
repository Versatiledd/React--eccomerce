import React from "react";
import CollectionItem from "../collectionItem/collection-item";
import "./prevComponents.styles.scss";

const PrevComponents = ({ title, items }) => {
  return (
    <>
      <div className="collection-previev">
        <h3 className="title">{title.toUpperCase()}</h3>
        <div className="previev">
          {items
            .filter((item, index) => index < 4)
            .map(item => (
              <CollectionItem key={item.id} item={item}></CollectionItem>
            ))}
        </div>
      </div>
    </>
  );
};

export default PrevComponents;
