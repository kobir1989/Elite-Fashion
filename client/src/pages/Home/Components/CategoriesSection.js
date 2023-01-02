import React from 'react';
import styles from "../styles/CategoriesSection.module.scss";
import Typography from "../../../components/Common/Typography/Typography";
import CategoryCard from './CategoryCard';

//TODO: Category data willbe fetch from database 

const CategoriesSection = () => {
   return (
      <div className={styles.category_wrapper}>
         <div className={styles.row_one}>
            <div style={{ width: "50%" }}>
               <CategoryCard
                  title={"Men"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/category-men.png"}
               />
            </div>
            <div style={{ width: "50%" }}>
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
      </div>
   )
}

export default CategoriesSection;