import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./stripe";
import { clearItemsFromCheckout } from "../../redux/cart/cart.actions";
import Swal from "sweetalert";
import { addToFirebaseItemAfterBuy } from "../../firebase/firebase";

const StripeButton = ({
  price,
  items,
  history,
  clearItemsFromCheckout,
  currentUser,
}) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HUXmCC6xVHTvYil4zaggBoZ3em2W7qQoiBToqMFjEOZsDpwcxNkeBSQUCV4SvQMhxzN938EwQE89trvWYIWmiam00RPYXVKkC";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        console.log(response);
        addToFirebaseItemAfterBuy(currentUser, items);
        Swal({
          title: "Płatność udana!",
          text: "Dziękujemy za zakup naszego produktu!",
          icon: "success",
          button: "Okay",
        });
        history.push("/dashboard");
        clearItemsFromCheckout(items);
      })
      .catch((error) => {
        console.log(error);
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
      description={`Całkowita kwota do zapłaty ${price} $`}
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

const mapStateToProps = ({ user: currentUser }) => ({
  currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  clearItemsFromCheckout: (items) => dispatch(clearItemsFromCheckout(items)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StripeButton)
);
