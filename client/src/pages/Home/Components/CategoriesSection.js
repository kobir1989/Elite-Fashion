import React from 'react';
import styles from "../styles/CategoriesSection.module.scss";
import Typography from "../../../components/Common/Typography/Typography";
import CategoryCard from './CategoryCard';

//TODO: Category data willbe fetch from database 

const CategoriesSection = () => {
   return (
      <div className={styles.category_wrapper}>
         <div className={styles.row_one}>
            <CategoryCard
               title={"Men"}
               imgSize={"big"}
               imgUrl={"/assets/lifestyles.webp"}
            />
            <CategoryCard
               title={"Women"}
               color={"pink"}
               imgSize={"big"}
               imgUrl={"/assets/lifestyles.webp"}
            />
         </div>
         <div className={styles.row_two}>
            <CategoryCard
               title={"Lifestyle"}
               imgSize={"md"}
               imgUrl={"/assets/lifestyles.webp"}
            />
         </div>
      </div>
   )
}

export default CategoriesSection;