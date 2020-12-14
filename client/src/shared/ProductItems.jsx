import React from "react";
import "./scss/relatedProducts.scss";
import { useHistory } from "react-router-dom";
import NoImage from "./image/no-img.png";

const ProductItems = ({ items }) => {
  const history = useHistory();
  return (
    <>
      <h4 className="related-title">Powiązane produkty</h4>
      <div className="related-wrapper">
        {items &&
          items.map((item, i) => {
            return (
              <div
                className="related-products"
                key={i}
                onClick={() => history.push(`/product/${item.slug}`)}
              >
                <div className="single-product">
                  <div className="wrapper-image">
                    <img
                      src={
                        item.images.length > 0 ? item.images[0].url : NoImage
                      }
                      style={{
                        width: "100%",
                        height: "180px",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      }}
                    />
                  </div>
                  <span className="name">{item.title}</span>
                  <p className="description">
                    {item.description.substring(0, 180)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductItems;
