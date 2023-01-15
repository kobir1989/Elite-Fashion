import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import styles from "../styles/CategoriesSection.module.scss";
import Error500 from '../../../components/Common/Error/Error500';
import { fetchCategory } from "../../../redux/actions/categoryAction";
import Typography from "../../../components/Common/Typography/Typography";
import GridViewLayout from "../../../layouts/GridViewLayout";
import { Link } from "react-router-dom";
import CardSkeleton from "../../../components/Common/Skeleton/CardSkeleton";

const CategoriesSection = () => {
   const {
      isLoading,
      categories,
      error
   } = useSelector(state => state.category)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(fetchCategory())
   }, [dispatch])
   return (
      <GridViewLayout page="category">
         {categories.map((category) => (
            <Link to={`/sub-category/${category?._id}`} key={category?._id}>
               <div className={styles.category_card_wrapper}>
                  <div className={styles.img_wrapper}>
                     <img src={category?.image} alt={category?.name} />
                  </div>
                  <div className={styles.category_title_wrapper}>
                     <Typography variant={"h2"} color={"primary"}>
                        {category?.name}
                     </Typography>
                  </div>
               </div>
            </Link>
         ))}
         {isLoading &&
            <CardSkeleton col={6} width={"100%"} height={"100%"} />
         }
         {error && <Error500 />}
      </GridViewLayout>
   )
}

export default CategoriesSection;