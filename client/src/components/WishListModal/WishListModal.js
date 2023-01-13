import React from 'react';
import Modal from "../Common/Modal/Modal";
import styles from "./WishListModal.module.scss";
import Button from '../Common/Button/Button';
import Typography from '../Common/Typography/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { setToggleWishList } from "../../redux/features/wishLishSlice";

const WishListModal = () => {
   const { item } = useSelector(state => state.wishList);
   const dispatch = useDispatch();

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
            {item.map((list) => (
               <div className={styles.modal_content_wrapper}
                  key={list?.id}>
                  <div className={styles.img_wrapper}>
                     <img src={list?.imageUrl} alt="" />
                  </div>
                  <div className={styles.details_wrapper}>
                     <Typography variant={"h5"}>{list?.title}</Typography>
                     <Typography variant={"h5"}>&#2547; {list?.price}</Typography>
                  </div>
                  <div className={styles.delete_btn}>
                     <Button variant={"icon-btn-normal"}>
                        <DeleteForeverIcon sx={{ color: "#cc2121" }} />
                     </Button>
                  </div>
               </div>
            ))}
         </div>
      </Modal>
   )
}
export default WishListModal;