import React from "react";
import { connect } from "react-redux";
import { removeItem, addItem } from "../../redux/cart/cart.actions";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import "./checkoutitem.styles.scss";

const checkOutItem = ({ item, removeItem, addItem }) => {
  console.log(item);
  return (
    <>
      <div className="checkout-products">
        <div className="wrapper">
          <div className="product-img">
            <img src={item.imageUrl} alt="" className="img" />
          </div>
          <p className="description">{item.description}</p>
          <span className="price">{item.price} zł</span>
          <div className="quantity">
            <AiOutlineArrowUp className="arrow" onClick={() => addItem(item)} />
            <span>{item.quantity}</span>
            <AiOutlineArrowDown
              className="arrow"
              style={{
                color: "rgb(224 35 21)",
              }}
              onClick={() => removeItem(item)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeItem(item)),
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(checkOutItem);
