import React from 'react';
import { useSelector } from "react-redux";
import Typography from '../../components/Common/Typography/Typography';
import Button from '../../components/Common/Button/Button';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/CartPage.styles.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import TotalAmountView from '../../components/TotalAmountView/TotalAmountView';
import CartProductInfoCard from '../../components/Common/Card/CartProductInfoCard';
import { toast } from 'react-hot-toast';

const CartPage = () => {
   const { cartItem, totalAmount, quantity } = useSelector(state => state.cart);
   const navigate = useNavigate()
   const checkoutHandler = () => {
      if (quantity <= 0) {
         return toast.error("Please add a product to your cart before proceeding to checkout!")
      }
      navigate("/checkout")
   }
   return (
      <PageLayout>
         <div className={styles.cart_content_wrapper}>
            <div className={styles.cart_product_wrapper}>
               {cartItem.length <= 0 &&
                  <Typography
                     variant={"body"}
                     color={"red"}
                     style={{ textAlign: "center" }}>
                     Your Cart is Empty!
                  </Typography>
               }
               {cartItem.map((item) => (
                  <CartProductInfoCard item={item} key={item.id} />
               ))}
            </div>
            <TotalAmountView totalAmount={totalAmount} />
            <div className={styles.checkout_btn}>
               <Button variant={"rounded"} onClick={checkoutHandler}>
                  Checkout
               </Button>
            </div>
         </div>
      </PageLayout>
   )
}

export default CartPage;