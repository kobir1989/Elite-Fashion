import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import styles from "./SubCategoryPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubCategory } from "../../redux/actions/subCategoryAction";
import Error from "../../components/Common/Error/Error500";
import Typography from '../../components/Common/Typography/Typography';
import Button from '../../components/Common/Button/Button';
import GridViewLayout from '../../layouts/GridViewLayout';

const SubCategoryPage = () => {
   const data = useSelector(state => state.subCategory);
   const dispatch = useDispatch()
   const { id } = useParams();
   useEffect(() => {
      dispatch(fetchSubCategory(id))
   }, [id, dispatch])
   return (
      <PageLayout>
         <GridViewLayout page={"sub_category"}>
            {data.subCategories.map((subCategory) => (
               <div className={styles.sub_category_card} key={subCategory._id}>
                  <div className={styles.image_wrapper}>
                     <img src={subCategory?.image} alt={subCategory?.name} />
                  </div>
                  <div className={styles.card_text_wrapper}>
                     <Typography variant={"h4"} color={"white"}>{subCategory?.name}</Typography>
                     <Button variant={"white"}>Shop now</Button>
                  </div>
               </div>
            ))}
            {data.error && <Error />}
         </GridViewLayout>
      </PageLayout>
   )
}

export default SubCategoryPage;