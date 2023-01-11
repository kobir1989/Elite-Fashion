import React from 'react';
import styles from "./styles/ProductCard.module.scss";
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductCard = ({ title, imageUrl, price, ...otherProps }) => {
   return (
      <div className={styles.card_wrapper} {...otherProps}>
         <div className={styles.card_img_wrapper}>
            <img src={imageUrl} alt="product.jpg" />
         </div>
         <div className={styles.card_details_wrapper}>
            <div>
               <Typography variant={"body"}>{title}</Typography>
               <Typography variant={"h5"}>${price.toFixed(2)}</Typography>
            </div>
            <div className={styles.card_buttons}>
               <Button variant={"icon-btn-white"}>
                  <ShoppingBagOutlinedIcon />
               </Button>
               <Button variant={"icon-btn-white"}>
                  <FavoriteBorderIcon />
               </Button>
            </div>
         </div>
      </div>
   )
};

export default ProductCard;