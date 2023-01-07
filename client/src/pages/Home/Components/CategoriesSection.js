import React, { useState, useEffect } from 'react';
import styles from "../styles/CategoriesSection.module.scss";
import Typography from "../../../components/Common/Typography/Typography";
import CategoryCard from './CategoryCard';
import Error500 from '../../../components/Common/Error/Error500';
// import { useFetch } from "../../../hooks/useFetch";
import axios from "axios";


//TODO: Category data willbe fetch from database 
// const BASE_URL = process.env.REACT_APP_BASE_URL;
const CategoriesSection = () => {
   // const [data, setData] = useState([])
   // const [error, setError] = useState(null)
   // const [loading, setLoading] = useState(false)
   // const getData = async () => {
   //    try {
   //       setLoading(true)
   //       const response = await axios.get(`${BASE_URL}/categories/all`)
   //       setData(response.data.allCategories)
   //    } catch (err) {
   //       setError(err)
   //    } finally {
   //       setLoading(false)
   //    }
   // }
   // useEffect(() => {
   //    getData();
   // }, [])
   // console.log(data)
   return (
      <div className={styles.category_wrapper}>
         {/* {data.map((category) => (
            <div className={styles.card_wrapper} key={category?._id}>
               <CategoryCard
                  title={category?.name}
                  imgSize={"big"}
                  imgUrl={category?.image}
               />
            </div>
         ))}
         {error && <Error500 />} */}
      </div>
   )
}

export default CategoriesSection;