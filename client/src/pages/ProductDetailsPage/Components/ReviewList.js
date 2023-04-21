import React, { useState } from 'react';
import Ratings from '../../../components/Common/Ratings/Ratings';
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/ReviewList.module.scss";
import { AnimatePresence, motion } from "framer-motion"
import dayjs from "dayjs"
import TextSkeleton from '../../../components/Common/Skeleton/TextSkeleton';
import Button from '../../../components/Common/Button/Button';
import Icons from '../../../components/Common/Icons/Icons';
import { useDeleteReviewMutation } from '../../../redux/features/reviews/reviewsApi'

const ReviewList = ({ reviews, isLoading, isError, handleEditReveiw }) => {
   const [toggleOptions, setToggleOptions] = useState({})
   const [deleteReview] = useDeleteReviewMutation()

   // toggle more options for a specific review
   const toggleOptionsHandler = (id) => {
      setToggleOptions((prevState) => ({
         ...prevState,
         [id]: !prevState[id]
      }))
   }
   //delete review handler 
   const handleDelete = (id) => {
      deleteReview(id)
   }
   return (
      <AnimatePresence>
         <motion.div
            initial={{ x: "-100%", transition: { duration: 0.2 } }}
            animate={{ x: 0 }}
            exit={{ x: "-100%", transition: { duration: 0.2 } }}
            transition={{ default: { ease: "linear" } }}
            className={styles.review_main}>
            {isLoading && <>
               <TextSkeleton />
               <TextSkeleton />
               <TextSkeleton />
            </>}
            {!isError && !isLoading && reviews?.length > 0 ? reviews.map((review) => (
               <div className={styles.review_row} key={review?._id}>
                  <div className={styles.more_options_button}>
                     <Button
                        variant='icon-btn-normal'
                        onClick={() => { toggleOptionsHandler(review?._id) }}
                     >
                        <Icons name='moreOptions' color='#212529' />
                     </Button>
                  </div>
                  {toggleOptions[review?._id] && <div className={styles.action_buttons}>
                     <Button
                        variant='icon-btn-normal'
                        onClick={() => { handleDelete(review?._id) }}
                     >
                        <Icons name='delete' color='#cc2121' size='1rem' />
                        Delete
                     </Button>
                     <Button
                        variant='icon-btn-normal'
                        onClick={() => { handleEditReveiw(review?._id) }}
                     >
                        <Icons name='edit' color='#4169e1' size='1rem' />
                        Edit
                     </Button>
                  </div>}
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
            )) : null}
            {reviews?.length <= 0 && <Typography variant={"body"} color={"red"}>
               No Review Found!
            </Typography>}
         </motion.div>
      </AnimatePresence>

   )
}

export default ReviewList;