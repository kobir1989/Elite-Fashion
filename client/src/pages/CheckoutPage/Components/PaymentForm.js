import React from 'react';
import { CardElement } from "@stripe/react-stripe-js";
import Button from "../../../components/Common/Button/Button";
import Typography from "../../../components/Common/Typography/Typography";
import styles from "../styles/PaymentForm.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../utils/stripe.config";

const stripe_style = {
   iconStyle: "solid",
   style: {
      base: {
         color: "#3b3841",
         padding: "1rem",
         fontFamily: "Arial, sans-serif",
         fontSmoothing: "antialiased",
         fontSize: "1.2rem",
         iconColor: "#727272",
         "::placeholder": {
            color: "#727272",
         },
      },
      invalid: {
         fontFamily: "Arial, sans-serif",
         color: "#cc2121",
         iconColor: "#cc2121",
      },
   },
};

const PaymentForm = ({ onBack }) => {
   return (
      <form>
         <div className={styles.payment_card}>
            <Elements stripe={stripePromise} >
               <CardElement options={stripe_style} />
            </Elements>
         </div>
         <div className={styles.payment_btn_wrapper}>
            <Button
               variant={"primary"}
               onClick={onBack}>
               Back
            </Button>
            <Button
               variant={"btn-black"}
            >
               Pay Now
            </Button>
         </div>
      </form>
   )
};

export default PaymentForm;