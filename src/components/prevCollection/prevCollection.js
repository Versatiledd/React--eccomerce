import React from "react";

import SingleProduct from "../singleProduct/singleProduct";
import "./prevCollection.scss";

const PrevCollection = ({ title, items }) => {
  return (
    <>
      <div>
        <div className="all-products">
          {items
            .filter((item, idx) => idx < 4)
            .map((item) => {
              return <SingleProduct key={item.id} item={item} />;
            })}
        </div>
      </div>
    </>
  );
};

export default PrevCollection;
