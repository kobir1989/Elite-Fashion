import React from 'react';
import CategoryCard from './CategoryCard';
import styles from "../styles/CategoriesSection.module.scss"

const DiscountSection = () => {
   return (
      <div className={styles.category_wrapper}>
         <div className={styles.row_one}>
            <CategoryCard
               title={"Winter Story"}
               variant={"h2"}
               imgSize={"big"}
               imgUrl={"/assets/lifestyles.webp"}
            />
            <CategoryCard
               title={"Up to 50% off"}
               variant={"h2"}
               color={"red"}
               imgSize={"big"}
               imgUrl={"/assets/lifestyles.webp"}
            />
            <CategoryCard
               title={"New Arrival"}
               variant={"h2"}
               color={"pink"}
               imgSize={"big"}
               imgUrl={"/assets/lifestyles.webp"}
            />
         </div>
         <div className={styles.row_two}>
            <CategoryCard
               title={"Deals made especially for you!"}
               variant={"h2"}
               imgSize={"md"}
               imgUrl={"/assets/lifestyles.webp"}
            />
         </div>
      </div>
   )
}

export default DiscountSection;