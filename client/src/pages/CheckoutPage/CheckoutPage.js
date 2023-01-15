import React from 'react';
import PageLayout from "../../layouts/PageLayout";
import Typography from '../../components/Common/Typography/Typography';
import { useSelector } from "react-redux";
import styles from "./styles/CheckoutPage.module.scss";
import TotalAmountView from "../../components/TotalAmountView/TotalAmountView";
import CheckoutForm from './Components/CheckoutForm';
import CartProductInfoCard from "../../components/Common/Card/CartProductInfoCard"

const Checkout = () => {
   const { totalAmount, cartItem } = useSelector(state => state.cart)
   return (
      <PageLayout>
         <div className={styles.main_wrapper}>
            <div className={styles.order_details}>
               <Typography variant={"h4"}>Order Details</Typography>
               {cartItem.map((item) => (
                  <CartProductInfoCard
                     showBtn={false}
                     item={item}
                     color={"white"}
                  />
               ))}
               <div>
                  <TotalAmountView totalAmount={totalAmount} />
               </div>
            </div>
            <div className={styles.shipping_details}>
               <Typography variant={"h4"}>Shipping Details</Typography>
               <CheckoutForm />
            </div>
         </div>
      </PageLayout>
   )
};

export default Checkout