import React from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../components/Common/Error/ErrorMessage';
import GridViewLayout from '../../layouts/GridViewLayout';
import CardSkeleton from '../../components/Common/Skeleton/CardSkeleton';
import CategoryCard from '../../components/Common/Card/CategoryCard';
import CardBanner from '../../components/Common/Banner/CardBanner';
import styles from "./styles/SubCategoryPage.module.scss";
import Pagination from "../../components/Pagenation/Pagination";
import { setSubCategoryPage } from "../../redux/features/subCategory/subCategorySlice";
import { useGetSubCategoriesQuery } from '../../redux/features/subCategory/subCategoryApi';

const SubCategoryPage = () => {
   const { page } = useSelector(state => state.subCategory);
   const dispatch = useDispatch()
   const { id } = useParams();
   const { data: subCategories, isLoading, isError } = useGetSubCategoriesQuery({ id, page })

   const subCategoryPaginationHandler = (pageCount) => {
      dispatch(setSubCategoryPage(pageCount))
   }

   return (
      <PageLayout>
         <div className={styles.discount_banner}>
            <CardBanner
               title={"Limited time offers at Elite Fashion"}
               subTitle={"Score unbeatable deals with up to 50% off at Elite Fashion!"}
               imgUrl={"/assets/banner1.png"}
               position={"left"}
               linkTo={"/products/63b993f04548043f8e798be4"} />
         </div>
         {isError && <ErrorMessage />}
         <GridViewLayout page={"sub_category"}>
            {!isLoading && !isError && subCategories?.subCategory?.length > 0 ? subCategories?.subCategory.map((subCtg) => (
               <CategoryCard
                  title={subCtg?.name}
                  imgUrl={subCtg?.image}
                  linkTo={`/products/${subCtg?._id}`}
                  key={subCtg?._id}
               />
            )) : null}
            {isLoading &&
               <CardSkeleton
                  col={7}
                  width={"100%"}
                  height={"100%"}
               />
            }
         </GridViewLayout>
         <Pagination
            page={page}
            paginationHandler={subCategoryPaginationHandler}
            pagination={subCategories?.pagination}
         />
      </PageLayout>
   )
}

export default SubCategoryPage;