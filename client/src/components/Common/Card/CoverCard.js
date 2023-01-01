import React from 'react';
import styles from "./CoverCard.module.scss";

const CoverCard = ({ children, ...otherProps }) => {
   return (
      <div className={styles.cover_card_wrapper} {...otherProps}>
         {children}
      </div>
   )
}

export default CoverCard;