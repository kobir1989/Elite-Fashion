import React from 'react';
import styles from "../styles/CategoryCard.module.scss";
import Typography from '../../../components/Common/Typography/Typography';

const CategoryCard = ({
   title = "title",
   imgUrl,
   imgSize = "small",
   color = "gray",
   variant = "h1",
   ...otherProps
}) => {
   return (
      <div className={styles.category_card_wrapper} {...otherProps}>
         <div className={styles.img_wrapper}>
            <img className={styles[`img_${imgSize}`]} src={imgUrl} alt="image" />
         </div>
         <div className={`${styles.category_title_wrapper} ${styles[`color_${color}`]}`}>
            <Typography variant={variant}>{title}</Typography>
         </div>
      </div>
   )
}

export default CategoryCard;