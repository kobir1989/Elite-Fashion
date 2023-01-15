import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Common/Button/Button';
import Typography from '../../../components/Common/Typography/Typography';
import styles from "../styles/Banner.module.scss";

const Banner = () => {
   return (
      <div className={styles.banner_wrapper}>
         <div className={styles.banner_text}>
            <Typography variant={"h4"} color={"error"}>New members get 10% off their first purchase! Not a member yet? Join now, it's free.</Typography>
            <Typography variant={"small"}>We always offer free standard delivery and Click & Collect for orders over $20 for Members. Returns are free and flexible.</Typography>
         </div>
         <div className={styles.banner_btn}>
            <Button variant={"small-white"}><Link to="/signup">Become a Member</Link></Button>
         </div>
      </div>
   )
}

export default Banner;