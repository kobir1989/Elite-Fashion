import React, { useState } from "react";
import styles from "../../styles/CheckoutForm.module.scss";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { increaseStep } from "../../../../redux/features/paymentSteps/stepsSlice";
import { usePostCheckoutMutation } from '../../../../redux/features/checkout/checkoutApi'
import { resetCartState } from '../../../../redux/features/cart/cartSlice';
import Typography from '../../../../components/Common/Typography/Typography';

const CheckoutForm = () => {
   const stripe = useStripe();
   const elements = useElements();
   const [message, setMessage] = useState(null);
   const [isProcessing, setIsProcessing] = useState(false);
   const [postCheckout, { isSuccess }] = usePostCheckoutMutation()
   const dispatch = useDispatch()
   const {
      phone,
      address,
      city,
      userId,
      order,
      totalAmount
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

      if (result.paymentIntent.status === "succeeded") {
         postCheckout({ //Save order data to DB
            phone,
            address,
            city,
            userId,
            order,
            totalAmount,
            paymentId: result.paymentIntent.id
         })
         dispatch(increaseStep());
      }
      if (result.paymentIntent.error === "card_error" || result.paymentIntent.error === "validation_error") {
         setMessage(result?.paymentIntent?.error?.message);
      }
      setIsProcessing(false);
      if (isSuccess) {
         dispatch(resetCartState());
      }
   };

   return (
      <div className={styles.checkout_wrapper}>
         <div className={styles.card_info}>
            <Typography variant='body' color='red'>
               ( Card Number: 4242 4242 4242 4242 )
            </Typography>
            <Typography variant='body' color='red'>
               (  Expiration: 10/27 )
            </Typography>
            <Typography variant='body' color='red'>
               (   CVC: 222 )
            </Typography>
         </div>
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