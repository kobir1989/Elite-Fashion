import React from 'react';
import dayjs from "dayjs"
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/Orders.module.scss";

const Orders = ({ userOrderData, userProfileData }) => {
   return (
      <div>
         <div>
            <Typography variant={"h4"}>Order History</Typography>
            {userOrderData && userOrderData.length ? userOrderData.map((item) => (
               <div className={styles.order_products} key={item?._id._id}>
                  <div className={styles.order_date_status}>
                     <Typography variant={"body"}>
                        {dayjs(userProfileData?.date)
                           .format('MMMM DD YYYY, h:mm:ss A')
                        }
                     </Typography>
                     <Typography variant={"body"}
                        color={"success"}>
                        STATUS: {userProfileData?.status}
                     </Typography>
                  </div>
                  <div className={styles.order_details}>
                     <img src={item?._id?.image} alt="product.png" />
                     <Typography variant={"body"}>{item?._id?.title}</Typography>
                     <div className={styles.order_price}>
                        <Typography>
                           Price: {item?._id?.price} TK.
                        </Typography>
                        <Typography variant={"body"}>
                           Quantiy: {item?.quantity}
                        </Typography>
                     </div>
                  </div>
                  <div className={styles.order_total}>
                     <Typography variant={"body"} color={"red"}>
                        Total Amount: {item?.totalAmount} TK.
                     </Typography>
                  </div>
               </div>
            )) : null}
         </div>
      </div>
   )
}

export default Orders;