import React from 'react';
import Ratings from '../../../components/Common/Ratings/Ratings';
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/ReviewList.module.scss";
import { AnimatePresence, motion } from "framer-motion"
import { useSelector } from "react-redux";
import dayjs from "dayjs"

const ReviewList = () => {
   const { reviews } = useSelector(state => state.review);
   return (
      <AnimatePresence>
         <motion.div
            initial={{ x: "-100%", transition: { duration: 0.2 } }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.2 } }}
            transition={{ default: { ease: "linear" } }}
            className={styles.review_main}>

            {reviews && reviews.length > 0 ? reviews.map((review) => (
               <div className={styles.review_row} key={review?._id}>
                  <div className={styles.user_img_with_ratings}>
                     <div className={styles.user_img}>
                        <img src={review.user.image ? review?.user?.image : "/assets/user.jpg"} alt="user" />
                     </div>
                     <div className={styles.ratings}>
                        <Typography variant={"h5"}>
                           {review?.user?.name}
                        </Typography>
                        <Ratings size={"small"} value={parseInt(review?.rating)} />
                        <Typography variant={"small"}>
                           {dayjs(review?.createdAt).format('MMMM DD YYYY, h:mm:ss A')}
                        </Typography>
                     </div>
                  </div>
                  <div className={styles.comment}>
                     <Typography variant={"small"}>
                        {review?.comment}
                     </Typography>
                  </div>
               </div>
            )) : <Typography variant={"body"} color={"red"}>
               No Review Found!
            </Typography>}
         </motion.div>
      </AnimatePresence>

   )
}

export default ReviewList;