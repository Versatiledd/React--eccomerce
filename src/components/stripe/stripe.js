import React from "react";
import StripeCheckout from "react-stripe-checkout";
import "./stripe";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HUXmCC6xVHTvYil4zaggBoZ3em2W7qQoiBToqMFjEOZsDpwcxNkeBSQUCV4SvQMhxzN938EwQE89trvWYIWmiam00RPYXVKkC";

  const onToken = (token) => {
    console.log(token);
    alert("Płatność udana");
  };

  return (
    <StripeCheckout
      label="Zapłać"
      name="Deco Home"
      ComponentClass="div"
      billingAddress
      shippingAddress
      description={`Całkowita kwota do zapłaty ${price} zł`}
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

export default StripeButton;
