import React, { useEffect, useState } from 'react';
import Button from '../../../components/Common/Button/Button';
import Typography from '../../../components/Common/Typography/Typography';
import { motion, AnimatePresence } from 'framer-motion';
import Rating from '@mui/material/Rating';
import styles from '../styles/AddReview.module.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAddReviewMutation, useUppdateReviewMutation } from '../../../redux/features/reviews/reviewsApi'

//Default Review value
const defaultValue = {
   comment: "",
   rating: 0,
};

const AddReview = ({ setTabValue, getSelectedReview, selectedReviewId }) => {
   const [formValues, setFormValues] = useState(defaultValue);
   const [hasError, setHasError] = useState(null);
   const { token } = useSelector(state => state.auth);
   const [addReview, { isError, isLoading, error, isSuccess }] = useAddReviewMutation()
   const [updateReview, { isError: updateIsError, isLoading: updateLoading, error: updateError, isSuccess: updateSuccess }] = useUppdateReviewMutation()
   const navigate = useNavigate();
   const { id: productId } = useParams();
   //onChange Handler
   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
      if (e.target.value !== "") {
         setHasError(null)
      }
   };

   //Submit Review Handler
   const submitHandler = (e) => {
      e.preventDefault();
      if (!token) {
         toast.dismiss()
         toast.error("Login to add Review")
         return navigate("/login")
      }
      if (formValues.rating === 0) {
         return setHasError('Please Add Your Rating 1 to 5');
      }
      if (getSelectedReview?._id) {
         const data = {
            comment: formValues.comment,
            rating: formValues.rating,
            id: productId
         }
         //edit review query 
         updateReview({ reviewId: selectedReviewId, data })
      } else {
         // add review query
         addReview({
            comment: formValues.comment,
            rating: formValues.rating,
            id: productId
         })
      }

   };

   //Show Toast Message based on success request and show error based on response error.
   useEffect(() => {
      if (selectedReviewId) {
         setFormValues({
            comment: getSelectedReview?.comment,
            rating: Number(getSelectedReview?.rating)
         })
      }
      if (isError || updateIsError) {
         setHasError(error?.data?.message || updateError?.data?.message)
      }
      if (isSuccess || updateSuccess) {
         toast.dismiss()
         toast.success(isSuccess ? "Your Review has been Published" : "Review Updated!");
         setFormValues(
            {
               comment: "",
               rating: 0,
            }
         )
         setTabValue(0)
      }
      // eslint-disable-next-line 
   }, [isError, isSuccess, selectedReviewId, updateSuccess, updateIsError])

   return (
      <AnimatePresence>
         <motion.div
            initial={{ x: '-100%', transition: { duration: 0.2 } }}
            animate={{ x: 0 }}
            exit={{ x: '-100%', transition: { duration: 0.2 } }}
            transition={{ default: { ease: 'linear' } }}
            className={styles.review_form}
         >
            <Typography variant="h4">
               Write a Review for this product
            </Typography>
            <form onSubmit={submitHandler}>
               <div className={styles.ratings}>
                  <Typography
                     variant="body"
                     color={hasError ? "red" : "primary"}>
                     {hasError ? hasError : "Your Rating"} <span>*</span>
                  </Typography>
                  <Rating
                     aria-required={true}
                     onChange={handleInputChange}
                     sx={{ color: '#cc2121' }}
                     name="rating"
                     value={parseInt(formValues.rating)}
                  />
               </div>
               <textarea
                  placeholder="Write Your Review"
                  name="comment"
                  cols="30"
                  required
                  rows="8"
                  value={formValues.comment}
                  onChange={handleInputChange}
                  className={hasError ? `${styles.error}` : ""}
               />
               <Button disabled={isLoading || updateLoading} type="submit" variant="primary">
                  {isLoading ? "Loading..." : " Post Review"}
               </Button>
            </form>
         </motion.div>
      </AnimatePresence>
   );
};

export default AddReview;
