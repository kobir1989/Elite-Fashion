import React from 'react';
import Modal from "../Common/Modal/Modal";
import WishlistView from './WishlistView';
import { setToggleWishList } from "../../redux/features/wishLishSlice";
import { useDispatch } from "react-redux";

const WishListModal = () => {
   const dispatch = useDispatch();
   return (
      <Modal onClose={() => { dispatch(setToggleWishList(false)) }}>
         <WishlistView />
      </Modal >
   )
}
export default WishListModal;