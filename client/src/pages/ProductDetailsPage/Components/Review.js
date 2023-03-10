import React from 'react';
import Ratings from '../../../components/Common/Ratings/Ratings';
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/Review.module.scss";

const Review = () => {
   return (
      <div className={styles.review_main}>
         <div className={styles.review_row}>
            <div className={styles.user_img_with_ratings}>
               <div className={styles.user_img}>
                  <img src="/assets/user.jpg" alt="user" />
               </div>
               <div className={styles.ratings}>
                  <Typography variant={"h5"}>Kabir Hossain </Typography>
                  <Ratings />
                  <Typography variant={"small"}>Last Month</Typography>
               </div>
            </div>
            <div className={styles.comment}>
               <Typography variant={"small"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.
               </Typography>
            </div>
         </div>
         <div className={styles.review_row}>
            <div className={styles.user_img_with_ratings}>
               <div className={styles.user_img}>
                  <img src="/assets/user.jpg" alt="user" />
               </div>
               <div className={styles.ratings}>
                  <Typography variant={"h5"}>Kabir Hossain </Typography>
                  <Ratings />
                  <Typography variant={"small"}>Last Month</Typography>
               </div>
            </div>
            <div className={styles.comment}>
               <Typography variant={"small"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.
               </Typography>
            </div>
         </div>
      </div>
   )
}

export default Review;