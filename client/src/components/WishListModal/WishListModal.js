import React from 'react';
import Modal from "../Common/Modal/Modal";
import styles from "./WishListModal.module.scss";
import Button from '../Common/Button/Button';
import Typography from '../Common/Typography/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { setToggleWishList, removeFromWishList } from "../../redux/features/wishLishSlice";
import { deleteFromLocalStorage } from "../../helpers/localStorage";

const WishListModal = () => {
   const { wishListItem } = useSelector(state => state.wishList);
   const dispatch = useDispatch();

   const removeHandler = (id) => {
      deleteFromLocalStorage(id, "wishList")
      dispatch(removeFromWishList(id));
   };

   return (
      <Modal onClose={() => { dispatch(setToggleWishList(false)) }}>
         <div className={styles.wish_list_popup_wrapper}>
            <Typography variant={"h3"}>WISHLIST <FavoriteIcon sx={{ color: "#cc2121" }} /></Typography>
            <div
               className={styles.close_icon}
               onClick={() => { dispatch(setToggleWishList(false)) }}>
               <Button variant={"icon-btn-normal"}>
                  <CloseIcon sx={{ color: "#cc2121" }} />
               </Button>
            </div>
            {wishListItem.map((list) => (
               <div className={styles.modal_content_wrapper}
                  key={list?.id}>
                  <div className={styles.img_wrapper}>
                     <img src={list?.imageUrl} alt="" />
                  </div>
                  <div className={styles.details_wrapper}>
                     <Typography variant={"h5"}>{list?.title}</Typography>
                     <Typography variant={"h5"}>&#2547; {list?.price}</Typography>
                  </div>
                  <Button variant={"icon-btn-normal"} onClick={() => removeHandler(list?.id)}>
                     <DeleteForeverIcon sx={{ color: "#cc2121" }} />
                  </Button>
               </div>
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
      </Modal >
   )
}
export default WishListModal;