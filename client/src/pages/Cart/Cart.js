import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Typography from '../../components/Common/Typography/Typography';
import Button from '../../components/Common/Button/Button';
import PageLayout from '../../layouts/PageLayout';
import styles from "./Cart.styles.module.scss";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
   const { cartItem, totalAmount, quantity } = useSelector(state => state.cart)
   return (
      <PageLayout>
         <div className={styles.cart_content_wrapper}>
            <div className={styles.cart_product_wrapper}>
               {cartItem.map((item) => (
                  <div className={styles.cart_items}>
                     <div className={styles.product_img_wrapper}>
                        <img src={item?.imageUrl} alt="" />
                     </div>
                     <div className={styles.product_details_wrapper}>
                        <Typography variant={"body"}>
                           {item?.title}
                        </Typography>
                        <Typography variant={"body"}>
                           Size:  M{item?.size}
                        </Typography>
                     </div>

                     <div className={styles.price_details}>
                        <div className={styles.product_quantity_count}>
                           <Button variant={"icon-btn-normal"}>
                              <RemoveIcon sx={{ fontSize: "1rem", color: "#cc2121" }} />
                           </Button>
                           <Typography variant={"body"}>
                              {item?.quantity}
                           </Typography>
                           <Button variant={"icon-btn-normal"}>
                              <AddIcon sx={{ fontSize: "1rem", color: "#116954" }} />
                           </Button>
                        </div>
                        <div className={styles.product_price_count}>
                           <Typography variant={"body"}>
                              Price:   TK. {item?.price} X {item?.quantity}
                           </Typography>
                           <Typography variant={"body"}>
                              Total:   TK. {item?.quantity * item?.price}
                           </Typography>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className={styles.cart_total}>
               <Typography variant={"h4"}>
                  Cart Totals
               </Typography>
               <div className={styles.amount_description}>
                  <Typography variant={"body"}>Sub Total:
                     <span>
                        TK. {totalAmount}
                     </span>
                  </Typography>
                  <Typography variant={"body"}>
                     Shipping Charge:
                     <span>
                        TK. 50
                     </span>
                  </Typography>
                  <Typography variant={"body"} color={"red"}>
                     Total Amount:
                     <span className={styles.text_red}>
                        TK. {totalAmount + 50}
                     </span>
                  </Typography>
               </div>
            </div>
            <div className={styles.checkout_btn}>
               <Button variant={"rounded"}>
                  Checkout
               </Button>
            </div>
         </div>
      </PageLayout>
   )
}

export default Cart;