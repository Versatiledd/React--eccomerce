import React from "react";
import NoImage from "../../shared/image/no-img.png";
import { AiFillDelete } from "react-icons/ai";
import { removeWishlist } from "../../functions/User";

const WishListProduct = ({ product, i }) => {
  const handleRemoveWish = (e) => {
    e.preventDefault();
    console.log("ssss");
  };

  return (
    <div
      className="container-products"
      // onClick={() => history.push(`/product/${product[i].slug}`)}
    >
      <div className="single-product">
        <div className="wrapper-image">
          <img
            src={product[i].images[0].url}
            style={{
              width: "100%",
              height: "100%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />
        </div>
        <span className="name">{product[i].title}</span>
        <p className="description">{product[i].description}</p>
        <div className="price-wrapper">
          <span className="price">{product[i].price} zł</span>
          <AiFillDelete
            onClick={handleRemoveWish}
            style={{
              fontSize: "25px",
              color: "#ff6363",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WishListProduct;
