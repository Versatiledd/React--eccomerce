import React from "react";

import { connect } from "react-redux";
import CheckOutItem from "../checkOutItem/checkoutitem";
import { BsTrash } from "react-icons/bs";

import EmptyTrash from "../emptyTrash/emptyTrash";
import { clearItemsFromCheckout } from "../../redux/cart/cart.actions";

import "./checkout.scss";
import StripeButton from "../stripe/stripe";

const checkOutPage = ({ cartItems, total, clearItemsFromCheckout }) => {
  console.log(cartItems, total);
  return (
    <div className="checkout-page">
      {cartItems.length ? (
        <>
          <div className="checkout-header">
            <div className="items">
              <span>Koszyk (1)</span>
              <div className="icon-items">
                <BsTrash
                  className="trash"
                  onClick={() => clearItemsFromCheckout(cartItems)}
                />
                <span>Wyczyść koszyk</span>
              </div>
            </div>
            <div className="items-wrapper">
              <div className="items-container">
                {cartItems.map((item) => (
                  <CheckOutItem item={item} key={item.id} />
                ))}
              </div>
            </div>{" "}
          </div>
        </>
      ) : null}

      {cartItems.length ? (
        <div className="container-checkout">
          <div className="wrapper-pay">
            <span className="total">Łączna kwota</span>
            <span className="total-price">{total} zł</span>
          </div>
          <div className="btn">
            <StripeButton price={total} />
          </div>
        </div>
      ) : null}
      {cartItems.length === 0 && <EmptyTrash />}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItemsFromCheckout: (item) => dispatch(clearItemsFromCheckout(item)),
});

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
  total: cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
    0
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(checkOutPage);
