import React from 'react';
import styles from "./DiscountModal.module.scss"
import Modal from '../Common/Modal/Modal';
import Button from '../Common/Button/Button';
import Icons from '../Common/Icons/Icons';
const DiscountModal = ({ handler }) => {
   return (
      <Modal onClose={handler}>
         <div className={styles.discount_modal}>
            <Button variant={"icon-btn-normal"} onClick={handler}>
               <Icons name={"cross"} color={"#FFF"} size={"1.8rem"} />
            </Button>
            <img src="/assets/sell.jpg" alt="sell.jpg" />
         </div>
      </Modal>
   )
}

export default DiscountModal;