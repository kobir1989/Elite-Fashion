import React from 'react';
import Modal from "../Common/Modal/Modal";
import WishlistCard from '../Common/Card/WishlistCard';
import { setToggleWishList } from "../../redux/features/wishLishSlice";
import { useDispatch } from "react-redux";
import styles from "./styles/WishListModal.module.scss";

const WishListModal = () => {
   const dispatch = useDispatch();
   return (
      <Modal onClose={() => { dispatch(setToggleWishList(false)) }}>
         <div className={styles.wishlist_wrapper}>
            <WishlistCard />
         </div>
      </Modal >
   )
}
export default WishListModal;