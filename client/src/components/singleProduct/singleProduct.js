import React from "react";
import { connect } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./singleProduct.scss";
import { addItem } from "../../redux/cart/cart.actions";
import { useHistory } from "react-router-dom";

const SingleProduct = ({ product, addItem }) => {
  const history = useHistory();
  return (
    <div
      className="container-products"
      onClick={() => history.push(`/product/${product.slug}`)}
    >
      <div>singleProduct</div>
      <div className="single-product">
        <div
          className="wrapper-image"
          style={{
            // backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        ></div>
        <span className="name">{product.title}</span>
        <p className="description">{product.description}</p>
        <div className="price-wrapper">
          <span className="price">{product.price} zł</span>
          <AiOutlineShoppingCart
            onClick={() => addItem(product)}
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
