import React from 'react';
import styles from "./styles/WishListCard.module.scss";
import Typography from '../Typography/Typography';
import { Link } from "react-router-dom";
import Button from '../Button/Button';
import { useSelector, useDispatch } from "react-redux";
import { setToggleWishList, removeFromWishList } from "../../../redux/features/wishLishSlice";
import Icons from '../Icons/Icons';

const WishlistCard = ({ showCross = true }) => {
   const { wishListItem } = useSelector(state => state.wishList);
   const dispatch = useDispatch();

   const removeHandler = (id) => {
      dispatch(removeFromWishList(id));
   };
   return (

      <div className={styles.wishList_row}>
         <Typography variant={"h4"}>
            WISHLIST <Icons name={"love"} size={"1.5rem"} color={"#cc2121"} />
         </Typography>
         {showCross &&
            <div
               className={styles.close_icon}
               onClick={() => { dispatch(setToggleWishList(false)) }}>
               <Button variant={"icon-btn-normal"}>
                  <Icons name={"cross"} color={"#cc2121"} />
               </Button>
            </div>}
         {wishListItem.map((list) => (
            <Link
               key={list?.id}
               to={`/product-details/${list?.id}`}
               onClick={() => { dispatch(setToggleWishList(false)) }}>
               <div className={styles.modal_content_wrapper}>
                  <div className={styles.img_wrapper}>
                     <img src={list?.imageUrl} alt="" />
                  </div>
                  <div className={styles.details_wrapper}>
                     <Typography variant={"h5"}>{list?.title}</Typography>
                     <Typography variant={"h5"}>&#2547; {list?.price}</Typography>
                  </div>
                  <Button variant={"icon-btn-normal"} onClick={() => removeHandler(list?.id)}>
                     <Icons name={"delete"} color={"#cc2121"} />
                  </Button>
               </div>
            </Link>
         ))}
         <div className={styles.message}>
            {wishListItem.length <= 0 &&
               < Typography
                  color={"red"}
                  variant={"body"}>
                  You don't have any wishlists yet!
               </Typography>
            }
         </div>
      </div>
   )
}

export default WishlistCard;