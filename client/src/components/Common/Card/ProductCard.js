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
   { title, imageUrl, linkTo, price, id, discount = false, percentage,
      ...otherProps
   }) => {
   const dispatch = useDispatch();
   console.log(discount, percentage)
   const wishListHandler = (data) => {
      dispatch(addToWishList(data))
   }

   return (
      <div className={styles.card_wrapper} {...otherProps}>
         <Link to={linkTo}>
            <div className={styles.card_img_wrapper}>
               {discount && <span className={styles.discount_tag}>{percentage}</span>}
               <img src={imageUrl} alt="product.jpg" />
               <div className={styles.ratings}>
                  <Ratings />
               </div>
            </div>
         </Link>
         <div className={styles.card_details_wrapper}>
            <div className={styles.price_details}>
               <Typography variant={"body"}>{title}</Typography>
               <Typography variant={"h5"}>TK. {price.toFixed(2)}
                  {discount && <span className={styles.old_price}>
                     {parseInt(price) - Math.floor((parseInt(price) / 100) * parseInt(percentage))}
                  </span>}
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