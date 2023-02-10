import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategory } from "../../redux/actions/subCategoryAction";
import ErrorMessage from '../../components/Common/Error/ErrorMessage';
import GridViewLayout from '../../layouts/GridViewLayout';
import CardSkeleton from '../../components/Common/Skeleton/CardSkeleton';
import CategoryCard from '../../components/Common/Card/CategoryCard';
import CardBanner from '../../components/Common/Banner/CardBanner';
import styles from "./styles/SubCategoryPage.module.scss";
import Pagination from "../../components/Pagenation/Pagination";
import { setSubCategoryPage } from "../../redux/features/subCategorySlice";

const SubCategoryPage = () => {
   const {
      isLoading,
      subCategories,
      error,
      page
   } = useSelector(state => state.subCategory);
   const dispatch = useDispatch()
   const { id } = useParams();
   useEffect(() => {
      dispatch(fetchSubCategory(`sub-category/related/${id}?page=${page}&limit=7`))
   }, [id, page, dispatch])

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
         {error && <ErrorMessage />}
         <GridViewLayout page={"sub_category"}>
            {subCategories?.result ? subCategories?.result.map((subCtg) => (
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
            api={subCategories}
         />
      </PageLayout>
   )
}

export default SubCategoryPage;