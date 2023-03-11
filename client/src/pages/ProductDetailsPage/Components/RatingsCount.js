import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import Ratings from '../../../components/Common/Ratings/Ratings';
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/RatingsCount.module.scss";

const ratingsValue = [5, 4, 3, 2, 1];
const RatingsCount = () => {
   return (
      <AnimatePresence>
         <motion.div
            initial={{ x: "-100%", transition: { duration: 0.2 } }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.2 } }}
            transition={{ default: { ease: "linear" } }}
            className={styles.rating_wrapper_main}>
            <Typography variant={"h4"}>
               Total Ratings
            </Typography>
            <div className={styles.ratings_count_wrapper}>
               <div className={styles.total_ratings}>
                  <Typography variant={"h3"}>
                     4.9 <span className={styles.gray_text}>/ 5</span>
                  </Typography>
                  <Ratings value={5} />
                  <Typography variant={"small"}>29 Ratings</Typography>
               </div>
               <div className={styles.ratings_count}>
                  {ratingsValue.map((rating, index) => (
                     <div className={styles.ratings_wrapper} key={index}>
                        <Ratings value={rating} />
                        <Typography variant={"small"}>27</Typography>
                     </div>
                  ))}
               </div>
            </div>
         </motion.div>
      </AnimatePresence>

   )
}

export default RatingsCount;