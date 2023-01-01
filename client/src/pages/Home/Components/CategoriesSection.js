import React from 'react';
import styles from "../styles/CategoriesSection.module.scss";
import Typography from "../../../components/Common/Typography/Typography";

//TODO: Need Refactor here
const CategoriesSection = () => {
   return (
      <div className={styles.category_wrapper}>
         <div className={styles.row_one}>
            <div className={styles.category_man_wrapper}>
               <img className={styles.img} src="/assets/lifestyles.webp" alt="" />
               <div className={styles.category_title_men}>
                  <Typography variant={"h1"}>Men</Typography>
               </div>
            </div>
            <div className={styles.category_women_wrapper}>
               <img src="/assets/lifestyles.webp" alt="" />
               <div className={styles.category_title_women}>
                  <Typography variant={"h1"}>Women</Typography>
               </div>
            </div>
         </div>
         <div className={styles.row_two}>
            <div className={styles.category_lifestyle_wrapper}>
               <img src="/assets/lifestyles.webp" alt="" />
               <div className={styles.category_title_lifestyle}>
                  <Typography variant={"h1"}>Lifestyle</Typography>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CategoriesSection;