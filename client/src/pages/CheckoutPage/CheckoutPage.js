import React from 'react';
import PageLayout from "../../layouts/PageLayout";
import styles from "./styles/CheckoutPage.module.scss";
import CheckoutSteps from './Components/CheckoutSteps';

const Checkout = () => {
   return (
      <PageLayout>
         <div className={styles.main_wrapper}>
            <CheckoutSteps />
         </div>
      </PageLayout>
   )
};

export default Checkout;