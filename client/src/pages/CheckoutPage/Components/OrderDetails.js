import React from 'react'
import { useSelector } from "react-redux";
import CartProductInfoCard from '../../../components/Common/Card/CartProductInfoCard';
import TotalAmountView from '../../../components/TotalAmountView/TotalAmountView';
import styles from "../styles/OrderDetails.module.scss";
import Typography from '../../../components/Common/Typography/Typography';
import Button from '../../../components/Common/Button/Button';

const OrderDetails = ({ onBack, onNext }) => {
   const { totalAmount, cartItem } = useSelector(state => state.cart)
   return (
      <div>
         <div className={styles.order_details}>
            <Typography variant={"h4"}>Order Details</Typography>
            {cartItem.map((item) => (
               <CartProductInfoCard
                  showBtn={false}
                  item={item}
                  color={"white"}
                  disabled={true}
                  key={item?.id}
               />
            ))}
         </div>
         <div>
            <TotalAmountView totalAmount={totalAmount} />
         </div>
         <div className={styles.btn_wrapper}>
            <Button
               variant={"primary"}
               onClick={onBack}>
               Back
            </Button>
            <Button
               variant={"btn-black"}
               onClick={onNext}>
               Confirm
            </Button>
         </div>
      </div>
   )
}

export default OrderDetails