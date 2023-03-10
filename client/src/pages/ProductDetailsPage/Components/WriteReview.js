import React from 'react';
import Button from '../../../components/Common/Button/Button';
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/WriteReview.module.scss";
import Rating from '@mui/material/Rating';


const WriteReview = () => {
   return (
      <div className={styles.review_form}>
         <Typography variant={"h4"}>
            Write a Review for this product
         </Typography>
         <div className={styles.ratings}>
            <Typography variant={"body"}>
               Your Rating <span>*</span>
            </Typography>
            <Rating sx={{ color: "#cc2121" }} name="" value={null} />
         </div>
         <form action="">
            <textarea placeholder="Write Your Review" name="review" cols="30" rows="8">
            </textarea>
            <Button variant={"primary"}>Post Review</Button>
         </form>
      </div>
   )
}

export default WriteReview;