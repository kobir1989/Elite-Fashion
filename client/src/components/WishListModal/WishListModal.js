import React from 'react';
import Modal from "../Common/Modal/Modal";
import WishlistCard from '../Common/Card/WishlistCard';
import { setToggleWishList } from "../../redux/features/wishLishSlice";
import { useDispatch } from "react-redux";

const WishListModal = () => {
   const dispatch = useDispatch();
   return (
      <Modal onClose={() => { dispatch(setToggleWishList(false)) }}>
         <WishlistCard />
      </Modal >
   )
}
export default WishListModal;