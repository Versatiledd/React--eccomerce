import React from "react";
import { connect } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./singleProduct.scss";
import { addItem } from "../../redux/cart/cart.actions";

const SingleProduct = ({ item, addItem }) => {
  const { imageUrl, name, description, price } = item;
  return (
    <div
      className="container-products"
      onClick={() => console.log("get function")}
    >
      <div className="single-product">
        <div
          className="wrapper-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <span className="name">{name}</span>
        <p className="description">{description}</p>
        <div className="price-wrapper">
          <span className="price">{price} zł</span>
          <AiOutlineShoppingCart
            onClick={() => addItem(item)}
            style={{
              fontSize: "25px",
              color: "yellowgreen",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(SingleProduct);
