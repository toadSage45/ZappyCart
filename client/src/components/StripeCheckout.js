import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { useNavigate } from "react-router-dom";
import { createOrder, emptyUserCart } from "../functions/user";
import { setCart } from "../features/cart/cartSlice";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    createPaymentIntent(token).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      // get result after successful payment
      // create order and save in database for admin to process
      // empty user cart from redux store and local storage
      createOrder(payload.paymentIntent, token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch(setCart([]));
          // empty cart from database
          emptyUserCart(token);
        }
      });
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      navigate("/user/history");
    }
  };

  //stripe.retrievePaymentIntent(clientSecret) =>  to get payment status and show proper feedback

  const handleChange = (e) => {
    //listens for the changes in the card element 
    //and display any error if while customers enter the card detail
    setDisabled(e.empty); //disable pay button if any error
    setError(e.error ? e.error.message : ""); //show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        {error && <div className="card-error text-danger mt-3">{error}</div>}
        {succeeded && (
          <p className="text-success mt-3">Payment succeeded! 🎉</p>
        )}
      </form>
    </>
  );
};

export default StripeCheckout;
