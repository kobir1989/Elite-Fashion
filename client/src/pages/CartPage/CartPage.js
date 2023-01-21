import React from 'react';
import { useSelector } from "react-redux";
import Typography from '../../components/Common/Typography/Typography';
import Button from '../../components/Common/Button/Button';
import PageLayout from '../../layouts/PageLayout';
import styles from "./styles/CartPage.styles.module.scss";
import { Link } from 'react-router-dom';
import TotalAmountView from '../../components/TotalAmountView/TotalAmountView';
import CartProductInfoCard from '../../components/Common/Card/CartProductInfoCard';

const CartPage = () => {
   const { cartItem, totalAmount } = useSelector(state => state.cart);
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
               <Link to={"/checkout"}>
                  <Button variant={"rounded"}>
                     Checkout
                  </Button>
               </Link>
            </div>
         </div>
      </PageLayout>
   )
}

export default CartPage;