import React from 'react';
import dayjs from "dayjs"
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/Orders.module.scss";

const Orders = ({ userProfileData }) => {
   const { purchases } = userProfileData;
   const [product] = purchases;
   return (
      <div>
         <div>
            <Typography variant={"h4"}>Order History</Typography>
            {product.product.map((item) => (
               <div className={styles.order_products} key={item?._id._id}>
                  <div className={styles.order_date_status}>
                     <Typography variant={"body"}>
                        {dayjs(purchases && purchases[0].createdAt)
                           .format('MMMM DD YYYY, h:mm:ss A')
                        }
                     </Typography>
                     <Typography variant={"body"} color={"success"}>STATUS: {purchases && purchases[0].orderStatus}</Typography>
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
            ))}
         </div>
      </div>
   )
}

export default Orders;