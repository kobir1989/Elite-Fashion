import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import styles from "./styles/Banner.module.scss";

const Banner = ({ title, subTitle, btnTitle, linkTo }) => {
   return (
      <div className={styles.banner_wrapper}>
         <div className={styles.banner_text}>
            <Typography variant={"h4"}
               color={"red"}>
               {title}
            </Typography>
            <Typography variant={"small"}>
               {subTitle}
            </Typography>
         </div>
         <div className={styles.banner_btn}>
            <Button variant={"small-white"}>
               <Link to={`/${linkTo}`}>
                  {btnTitle}
               </Link>
            </Button>
         </div>
      </div>
   )
}

export default Banner;