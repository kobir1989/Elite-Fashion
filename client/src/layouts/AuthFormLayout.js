import React from 'react';
import Typography from '../components/Common/Typography/Typography';
import { Link } from "react-router-dom";
import styles from "./styles/AuthFormLayout.module.scss";
import LinearProgress from '@mui/material/LinearProgress';

const AuthFormLayout = ({
   children,
   title,
   link,
   to,
   linkText,
   img,
   loading,
   error
}) => {
   return (
      <div className={styles.signup_wrapper}>
         <div className={styles.signup_img}>
            <img src={error ? "/assets/angry-girl.jpg" : img || "/assets/signup.jpg"} alt="women.png" />
            <div className={styles.signup_slogan}>
               <Typography variant={"h2"} color={"white"}>
                  Elite Fashion
               </Typography>
               <Typography variant={"h4"} color={"white"}>
                  A store that sells not just outfits but a trend.
               </Typography>
            </div>
         </div>
         <div className={styles.form_wrapper}>
            {loading && <div className={styles.loading_line}>
               <LinearProgress color="secondary" />
            </div>
            }
            <div className={styles.form_title}>
               <Typography variant={"h3"} color={"paragraph"}>
                  {title || "Create Your Account"}
               </Typography>
            </div>
            {children}
            <div className={styles.form_link}>
               <Typography variant={"body"}>
                  {linkText} have an Account?
                  <span>
                     <Link to={`/${to}`}>
                        {link || "Login"}
                     </Link>
                  </span>
               </Typography>
            </div>
         </div>
      </div>
   )
}

export default AuthFormLayout;