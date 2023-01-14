import React from 'react';
import styles from "./styles/CartProductInfoCard.module.scss";
import Typography from '../Typography/Typography';
import ButtonGroup from "../Button/ButtonGroup";
const CartProductInfoCard = ({ item, showBtn = true, color }) => {
   return (
      <div className={`${styles.card_wrapper} ${styles[`color_${color}`]}`}>
         <div className={styles.product_img_wrapper}>
            <img src={item?.imageUrl} alt="Product.jpg" />
         </div>
         <div className={styles.product_details_wrapper}>
            <Typography variant={"body"}>
               {item?.title}
            </Typography>
            <Typography variant={"body"}>
               Size: {item?.size}
            </Typography>
            <Typography variant={"body"}>
               Color: {item?.color}
            </Typography>
            <Typography variant={"body"}>
               Quantity: {item?.quantity}
            </Typography>
         </div>
         <div className={styles.price_details}>
            {showBtn && <ButtonGroup item={item} variant={"rounded"} />}
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
   )
}

export default CartProductInfoCard;