import React from 'react';
import CategoryCard from './CategoryCard';
import styles from "../styles/CategoriesSection.module.scss"

const DiscountSection = () => {
   return (
      <div className={styles.category_wrapper}>
         <div className={styles.row_one}>
            <div style={{ width: "calc(100% / 3)" }}>
               <CategoryCard
                  title={"Winter Story"}
                  variant={"h2"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/winter1.webp"}
               />
            </div>
            <div style={{ width: "calc(100% / 3)" }}>
               <CategoryCard
                  title={"Up to 50% off"}
                  variant={"h2"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/sale1.jpg"}
               />
            </div>
            <div style={{ width: "calc(100% / 3)" }}>
               <CategoryCard
                  title={"New Arrival"}
                  variant={"h2"}
                  imgSize={"big"}
                  imgUrl={"/assets/category-img/new-arrival.jpg"}
               />
            </div>
         </div>
         <div className={styles.row_two}>
            <CategoryCard
               title={"Shop now"}
               variant={"h2"}
               imgSize={"md"}
               imgUrl={"/assets/category-img/offer.webp"}
            />
         </div>
      </div>
   )
}

export default DiscountSection;