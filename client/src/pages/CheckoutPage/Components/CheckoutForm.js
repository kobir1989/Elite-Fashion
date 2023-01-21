import React, { useState } from "react";
import styles from "../styles/CheckoutForm.module.scss";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { postCheckoutData } from "../../../redux/actions/checkoutAction";
import { increaseStep } from "../../../redux/features/stepsSlice";
import { resetCartState } from "../../../redux/features/cartSlice";

const CheckoutForm = () => {
   const stripe = useStripe();
   const elements = useElements();
   const [message, setMessage] = useState(null);
   const [isProcessing, setIsProcessing] = useState(false);
   const dispatch = useDispatch()
   const {
      phone,
      address,
      city,
      userId,
      order,
   } = useSelector(state => state.checkout);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
         return;
      }
      setIsProcessing(true);
      //Stripe Confirm Payment
      const result = await stripe.confirmPayment({
         elements,
         redirect: 'if_required',
         // confirmParams: {
         //    return_url: window.location.href = `${window.location.origin}/payment-success`
         // }
      });

      console.log(result, "RESULT")
      if (result.paymentIntent.status === "succeeded") {
         dispatch(postCheckoutData({ phone, address, city, userId, order, paymentId: result.paymentIntent.id }));
         dispatch(increaseStep());
         dispatch(resetCartState());
      }
      if (result.paymentIntent.error === "card_error" || result.paymentIntent.error === "validation_error") {
         setMessage(result.paymentIntent.error.message);
      }
      setIsProcessing(false);
   };

   return (
      <div className={styles.checkout_wrapper}>
         <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
               <span id="button-text">
                  {isProcessing ? "Processing ... " : "Pay Now"}
               </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
         </form>
      </div>
   );
};

export default CheckoutForm;