import React from "react";

import "./prevComponents.styles.scss";

const PrevComponents = ({ title, items }) => {
  return (
    <>
      <div className="collection-previev">
        <h3>{title.toUpperCase()}</h3>
        <div className="preview">
          {items
            .filter((item, indx) => indx < 4)
            .map(item => (
              <div key={item.id}>{item.name}</div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PrevComponents;
