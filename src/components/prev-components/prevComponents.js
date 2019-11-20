import React from "react";
import CollectionItem from "../collectionItem/collection-item";
import "./prevComponents.styles.scss";

const PrevComponents = ({ title, items }) => {
  console.log(items);
  return (
    <>
      <div className="collection-previev">
        <h3>{title.toUpperCase()}</h3>
        <div className="previev">
          {items
            .filter((item, index) => index < 4)
            .map(({ id, ...otherItemProps }) => (
              <CollectionItem key={id} {...otherItemProps}></CollectionItem>
            ))}
        </div>
      </div>
    </>
  );
};

export default PrevComponents;
