import React from 'react';
import dayjs from "dayjs"
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/Orders.module.scss";

const Orders = ({ userOrderData }) => {
   return (
      <div>
         <div>
            <Typography variant={"h4"}>Order History</Typography>
            {userOrderData && userOrderData.length ? userOrderData.map((item) => (
               <div className={styles.order_products} key={item?.id}>
                  <div className={styles.order_date_status}>
                     <Typography variant={"body"}>
                        {dayjs(item?.date)
                           .format('MMMM DD YYYY, h:mm:ss A')
                        }
                     </Typography>
                     <Typography variant={"body"}
                        color={"success"}>
                        ORDER STATUS: {item?.status}
                     </Typography>
                  </div>
                  {item.products.map((prod) => (
                     <div className={styles.order_details} key={prod?._id?._id}>
                        <img src={prod?._id?.image} alt="product.png" />
                        <div className={styles.product_title}>
                           <Typography variant={"body"}>{prod?._id?.title}</Typography>
                        </div>
                        <div className={styles.order_price}>
                           <Typography>
                              Price: {prod?._id?.price} TK.
                           </Typography>
                           <Typography variant={"body"}>
                              Quantiy: {prod?.quantity}
                           </Typography>
                        </div>
                     </div>
                  ))}
                  <div className={styles.order_total}>
                     <Typography variant={"body"} color={"red"}>
                        Total Amount: {item?.totalAmount}.00 TK.
                     </Typography>
                  </div>
               </div>
            )) : null}
         </div>
      </div>
   )
}

export default Orders;