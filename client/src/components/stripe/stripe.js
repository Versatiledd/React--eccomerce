import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./stripe";
import { clearItemsFromCheckout } from "../../redux/cart/cart.actions";
import Swal from "sweetalert";
import { userCart } from "../../functions/User";
import { createAddress, createPayment } from "../../functions/stripe";
import { useDispatch } from "react-redux";

const StripeButton = ({ history, currentUser, cart }) => {
  const dispatch = useDispatch();
  const priceForStripe = 2000;
  const publishableKey =
    "pk_test_51HUXmCC6xVHTvYil4zaggBoZ3em2W7qQoiBToqMFjEOZsDpwcxNkeBSQUCV4SvQMhxzN938EwQE89trvWYIWmiam00RPYXVKkC";

  const saveToDB = (token) => {
    userCart(cart, currentUser.currentUser.token, token).then((res) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      dispatch({
        type: "CLEAR_CART_FROM_CHECKOUT",
        payload: [],
      });
      history.push("/user/orders");
    });
  };
  const onToken = (token) => {
    createPayment(currentUser.currentUser.token, token)
      .then((res) => {
        Swal({
          title: "Płatność udana!",
          text: "Dziękujemy za zakup naszego produktu!",
          icon: "success",
          button: "Okay",
        }).then(() => saveToDB(token));
      })
      .catch((error) => {
        Swal({
          title: "Płatność odrzucona",
          text:
            "Wystąpił problem z Twoją kartą bankową, upewnij się, że posiadasz wystarczające środki do zakupu towaru.",
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  return (
    <StripeCheckout
      label="Zapłać"
      name="Deco Home"
      ComponentClass="div"
      billingAddress
      shippingAddress
      description={`Całkowita kwota do zapłaty ${priceForStripe} PLN`}
      amount={priceForStripe}
      panelLabel="Zapłać"
      token={onToken}
      stripeKey={publishableKey}
      currency="PLN"
    >
      <button className="pay">Zapłać</button>
    </StripeCheckout>
  );
};

const mapStateToProps = ({ user: currentUser, cart }) => ({
  currentUser,
  cart,
});

const mapDispatchToProps = (dispatch) => ({
  clearItemsFromCheckout: (items) => dispatch(clearItemsFromCheckout(items)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StripeButton)
);
