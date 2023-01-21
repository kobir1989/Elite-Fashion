import React from 'react'
import Icons from "../../../components/Common/Icons/Icons";
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/InfoBanner.module.scss";

const InfoBanner = () => {
   return (
      <div className={styles.banner_wrapper}>
         <div className={styles.banner_tag}>
            <span>
               <Icons name={"card"} color={"#cc2121"} />
            </span>
            <div>
               <Typography variant={"h4"}>
                  PAYMENT METHODS
               </Typography>
               <Typography variant={"body"}>
                  Choose from different payment methods.
               </Typography>
            </div>

         </div>
         <div className={styles.banner_tag}>
            <span>
               <Icons name={"truck"} color={"#cc2121"} />
            </span>
            <div>
               <Typography variant={"h4"}>
                  SAME DAY SHIPPING
               </Typography>
               <Typography variant={"body"}>
                  order now and get same day delivery.
               </Typography>
            </div>
         </div>
         <div className={styles.banner_tag}>
            <span>
               <Icons name={"return"} color={"#cc2121"} />
            </span>
            <div>
               <Typography variant={"h4"}>
                  EASY RETURN POLICY
               </Typography>
               <Typography variant={"body"}>
                  we have hassle free return policy.
               </Typography>
            </div>
         </div>
      </div>
   )
}

export default InfoBanner