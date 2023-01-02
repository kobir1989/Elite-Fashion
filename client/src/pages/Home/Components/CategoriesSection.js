import React from 'react';
import styles from "../styles/CategoriesSection.module.scss";
import Typography from "../../../components/Common/Typography/Typography";
import CategoryCard from './CategoryCard';

//TODO: Category data willbe fetch from database 

const CategoriesSection = () => {
   return (
      <div className={styles.category_wrapper}>
         <div className={styles.row_one}>
            <div className={styles.card_wrapper}>
               <CategoryCard
                  title={"Men"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/men-model.png"}
               />
            </div>
            <div className={styles.card_wrapper}>
               <CategoryCard
                  title={"Women"}
                  background={"gray"}
                  color={"pink"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/women-category.jpg"}
               />
            </div>
         </div>
         <div className={styles.row_two}>
            <CategoryCard
               title={"Lifestyle"}
               imgSize={"md"}
               imgUrl={"/assets/category-img/lifestyle-category.jpg"}
            />
         </div>
         <div className={styles.row_three}>
            <div className={styles.card_wrapper}>
               <CategoryCard
                  title={"Winter Story"}
                  variant={"h2"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/winter.png"}
               />
            </div>
            <div className={styles.card_wrapper}>
               <CategoryCard
                  title={"Up to 50% off"}
                  variant={"h2"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/off.png"}
               />
            </div>
            <div className={styles.card_wrapper}>
               <CategoryCard
                  title={"New Arrival"}
                  variant={"h2"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/new-arrival.png"}
               />
            </div>
         </div>
      </div>
   )
}

export default CategoriesSection;