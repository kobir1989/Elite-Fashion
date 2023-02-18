import React from 'react';
import styles from "./styles/ProductCard.module.scss";
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Icons from "../Icons/Icons";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToWishList } from "../../../redux/features/wishLishSlice";
import Ratings from '../Ratings/Ratings';

const ProductCard = (
   { title, imageUrl, linkTo, price, sellPrice, id,
      ...otherProps
   }) => {
   const dispatch = useDispatch();
   // console.log(discount, percentage)
   const wishListHandler = (data) => {
      dispatch(addToWishList(data));
   }
   const discountPercantage = sellPrice ? Math.floor((price - sellPrice) / price * 100) : "";
   return (
      <div className={styles.card_wrapper} {...otherProps}>
         <Link to={linkTo}>
            <div className={styles.card_img_wrapper}>
               {discountPercantage > 0 &&
                  <span className={styles.discount_tag}>
                     {discountPercantage}% Off
                  </span>
               }
               <img src={imageUrl} alt="product.jpg" />
               <div className={styles.ratings}>
                  <Ratings />
               </div>
            </div>
         </Link>
         <div className={styles.card_details_wrapper}>
            <div className={styles.price_details}>
               <Typography variant={"body"}>{title}</Typography>
               <Typography variant={"h5"}>
                  TK. {sellPrice}.00
                  {sellPrice && discountPercantage > 0 ?
                     <span className={styles.old_price}>
                        {price}.00
                     </span>
                     : null}
               </Typography>
            </div>
            <div className={styles.card_buttons}>
               <Button
                  variant={"icon-btn-white"}
                  onClick={() => {
                     wishListHandler({
                        title,
                        imageUrl,
                        price,
                        id
                     })
                  }}>

                  <Icons name={"love"} />
               </Button>
            </div>
         </div>
      </div>
   )
};

export default ProductCard;