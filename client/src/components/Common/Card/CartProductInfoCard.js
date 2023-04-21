import React, { useState } from 'react';
import styles from "./styles/CartProductInfoCard.module.scss";
import Typography from '../Typography/Typography';
import ButtonGroup from "../Button/ButtonGroup";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '../Button/Button';
import { removeFromCart, addToCart, removeOneFromCart } from "../../../redux/features/cart/cartSlice";
import { useDispatch } from 'react-redux';

const CartProductInfoCard = (
   {
      item,
      showBtn = true,
      color,
      disabled = false,
   }) => {
   const [showDeleteBtn, setShowDeleteBtn] = useState(false);
   const dispatch = useDispatch()
   return (
      <div className={`${styles.card_wrapper} ${styles[`color_${color}`]}`} onMouseEnter={() => { setShowDeleteBtn(!disabled && true) }}
         onMouseLeave={() => { setShowDeleteBtn(!disabled && false) }}>
         {
            showDeleteBtn &&
            <div className={styles.delete_btn}>
               <Button disabled={disabled} variant={"icon-btn-normal"} onClick={() => { dispatch(removeFromCart(item?.id)) }}>
                  <ClearIcon sx={{ color: "#212529", fontSize: "1.2rem" }} />
               </Button>
            </div>
         }
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
            {showBtn && <ButtonGroup
               quantity={item?.quantity}
               variant={"rounded"}
               onRemove={() => { dispatch(removeOneFromCart(item?.id)) }}
               onAdd={() => {
                  dispatch(addToCart({
                     title: item?.title,
                     imageUrl: item?.image,
                     price: item?.price || item?.regularPrice,
                     id: item?.id,
                     quantity: 1,
                  }))
               }}
            />}
            <div className={styles.product_price_count}>
               <Typography variant={"body"}>
                  Price:   TK. {item?.price} X {item?.quantity}
               </Typography>
               <Typography variant={"body"}>
                  Total:   TK. {item?.quantity * item?.price || item?.regularPrice}
               </Typography>
            </div>
         </div>
      </div>
   )
}

export default CartProductInfoCard;