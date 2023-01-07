import React from 'react';
import Typography from '../Typography/Typography';
import styles from "./Error500.module.scss";

const Error500 = () => {
   return (
      <div className={styles.error_wrapper}>
         <img src="/assets/err.png" alt="error-image" />
         <Typography variant={"h3"} color={"error"}>Status: 500 <br />Sorry Something went wrong</Typography>
         <Typography variant={"body"}>Try to refreshing the page or going back and attamping the same action. <br /> Please contract us if this problem persists. </Typography>
      </div>
   )
}

export default Error500