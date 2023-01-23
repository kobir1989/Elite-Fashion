import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategory } from "../../redux/actions/subCategoryAction";
import ErrorMessage from '../../components/Common/Error/ErrorMessage';
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
         {error && <ErrorMessage />}
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
         </GridViewLayout>
      </PageLayout>
   )
}

export default SubCategoryPage;