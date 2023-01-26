import React from 'react';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import styles from "./styles/CardBanner.module.scss";
import { Link } from 'react-router-dom';

const CardBanner = ({ imgUrl, title, subTitle, position, linkTo }) => {
   return (
      <div className={styles.card_banner_wrapper}>
         <img className={styles.banner_img} src={imgUrl} alt="banner.jpg" />
         <div className={`${styles.banner_text} ${styles[`position-${position}`]}`}>
            <Typography variant={"h3"} color={"white"}>
               {title}
            </Typography>
            <Typography variant={"body"} color={"white"}>
               {subTitle}
            </Typography>
            <Link to={linkTo || "#"} onClick={() => window.scrollTo(0, 0)}>
               <Button variant={"small-banner"}>Shop Now</Button>
            </Link>
         </div>
      </div>
   )
}

export default CardBanner