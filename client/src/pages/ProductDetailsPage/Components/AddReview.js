import React, { useState } from 'react';
import Button from '../../../components/Common/Button/Button';
import Typography from '../../../components/Common/Typography/Typography';
import { motion, AnimatePresence } from 'framer-motion';
import Rating from '@mui/material/Rating';
import styles from '../styles/AddReview.module.scss';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const defaultValue = {
   comment: "",
   ratings: 0,
};

const AddReview = () => {
   const [formValues, setFormValues] = useState(defaultValue);
   const [hasError, setHasError] = useState(null);
   const { token } = useSelector(state => state.auth)
   const navigate = useNavigate();

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
      if (e.target.value !== "") {
         setHasError(null)
      }
   };

   const submitHandler = (e) => {
      e.preventDefault();
      if (!token) {
         toast.dismiss()
         toast.error("Login to add Review")
         return navigate("/login")
      }
      if (formValues.ratings === 0) {
         return setHasError('Please Add Your Rating 1 to 5');
      }
      console.log(formValues)
      setFormValues(
         {
            comment: "",
            ratings: 0,
         }
      )
   };

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
                     name="ratings"
                     value={parseInt(formValues.ratings)}
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
               <Button type="submit" variant="primary">
                  Post Review
               </Button>
            </form>
         </motion.div>
      </AnimatePresence>
   );
};

export default AddReview;
