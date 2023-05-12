import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import styles from "./styles/CheckoutPage.module.scss";
import CheckoutSteps from './Components/CheckoutSteps';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

const Checkout = () => {
   const { quantity } = useSelector(state => state.cart);
   const navigate = useNavigate()
   useEffect(() => {
      if (quantity <= 0) {
         navigate("/")
      }
   }, [navigate, quantity])
   return (
      <PageLayout>
         <div className={styles.main_wrapper}>
            <CheckoutSteps />
         </div>
      </PageLayout>
   )
};

export default Checkout;