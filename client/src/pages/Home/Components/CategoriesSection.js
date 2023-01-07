import React, { useState, useEffect, useCallback } from 'react';
import styles from "../styles/CategoriesSection.module.scss";
import Typography from "../../../components/Common/Typography/Typography";
import CategoryCard from './CategoryCard';
import Error500 from '../../../components/Common/Error/Error500';
import { useHttpHook } from "../../../hooks/useHttpHook";

const CategoriesSection = () => {
   const [apiData, setApiData] = useState([]);
   const {
      isLoading,
      error,
      sendRequest
   } = useHttpHook();

   useEffect(() => {
      const getData = (data) => {
         setApiData(data.allCategories)
      };
      sendRequest({ url: "categories/all", method: "get" }, getData)
   }, [sendRequest])

   return (
      <div className={styles.category_wrapper}>
         {apiData.map((category) => (
            <div className={styles.card_wrapper} key={category?._id}>
               <CategoryCard
                  title={category?.name}
                  imgUrl={category?.image}
               />
            </div>
         ))}
         {error && <Error500 />}
      </div>
   )
}

export default CategoriesSection;