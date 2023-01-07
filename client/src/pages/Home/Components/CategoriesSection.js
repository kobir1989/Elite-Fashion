import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import styles from "../styles/CategoriesSection.module.scss";
import CategoryCard from './CategoryCard';
import Error500 from '../../../components/Common/Error/Error500';
import { fetchCategory } from "../../../redux/slices/categorySlice";

const CategoriesSection = () => {
   const category = useSelector(state => state.category)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(fetchCategory())
   }, [])
   console.log(category)
   return (
      <div className={styles.category_wrapper}>
         {category.categories.map((category) => (
            <div className={styles.card_wrapper} key={category?._id}>
               <CategoryCard
                  title={category?.name}
                  imgUrl={category?.image}
               />
            </div>
         ))}
         {category.error && <Error500 />}
      </div>
   )
}

export default CategoriesSection;