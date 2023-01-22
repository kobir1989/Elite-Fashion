import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { Link, useParams } from "react-router-dom";
import styles from "./styles/SubCategoryPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategory } from "../../redux/actions/subCategoryAction";
import Error from "../../components/Common/Error/Error500";
import Typography from '../../components/Common/Typography/Typography';
import Button from '../../components/Common/Button/Button';
import GridViewLayout from '../../layouts/GridViewLayout';
import CardSkeleton from '../../components/Common/Skeleton/CardSkeleton';
import CategoryCard from '../../components/Common/Card/CategoryCard';

const SubCategoryPage = () => {
   const {
      isLoading,
      subCategories,
      error
   } = useSelector(state => state.subCategory);
   const dispatch = useDispatch()
   const { id } = useParams();
   useEffect(() => {
      dispatch(fetchSubCategory(id))
   }, [id, dispatch])
   return (
      <PageLayout>
         <GridViewLayout page={"sub_category"}>
            {subCategories.map((subCategory) => (
               <CategoryCard
                  title={subCategory?.name}
                  imgUrl={subCategory?.image}
                  linkTo={`/products/${subCategory?._id}`}
                  key={subCategory?._id}
               />
            ))}
            {isLoading &&
               <CardSkeleton
                  col={7}
                  width={"100%"}
                  height={"100%"}
               />
            }
            {error && <Error />}
         </GridViewLayout>
      </PageLayout>
   )
}

export default SubCategoryPage;