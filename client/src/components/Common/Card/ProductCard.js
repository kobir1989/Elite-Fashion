import React from 'react';
import styles from "./styles/ProductCard.module.scss";
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import Icons from "../Icons/Icons";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToWishList } from "../../../redux/features/wishLishSlice";

const ProductCard = ({ title, imageUrl, linkTo, price, id, ...otherProps }) => {
   const dispatch = useDispatch();

   const wishListHandler = (data) => {
      dispatch(addToWishList(data))
   }

   return (
      <div className={styles.card_wrapper} {...otherProps}>
         <Link to={linkTo}>
            <div className={styles.card_img_wrapper}>
               <img src={imageUrl} alt="product.jpg" />
            </div>
         </Link>
         <div className={styles.card_details_wrapper}>
            <div>
               <Typography variant={"body"}>{title}</Typography>
               <Typography variant={"h5"}>${price.toFixed(2)}</Typography>
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