import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import styles from "./styles/ProductDetails.module.scss";
import { useParams } from 'react-router-dom';
import Typography from '../../components/Common/Typography/Typography';
import { fetchProducts } from "../../redux/actions/productsAction";
import BestSellingProduct from "../../components/BestSellingProduct/BestSellingProduct";
import { fetchBestSellingProducts } from "../../redux/actions/bestSellingAction";
import ProductDetailsView from './Components/ProductDetailsView';
import { useDispatch, useSelector } from "react-redux";
import Review from './Components/Review';
import { fetchReviews } from "../../redux/actions/reviewActions";

const ProductDetailsPage = () => {
   const { newReview } = useSelector(state => state.review);
   const dispatch = useDispatch()
   const { id } = useParams()
   useEffect(() => {
      dispatch(fetchProducts(`/product/single/${id}`));
      dispatch(fetchBestSellingProducts());
      dispatch(fetchReviews(id))
   }, [id, dispatch, newReview]);

   return (
      <PageLayout>
         <ProductDetailsView />
         <section className={styles.related_products}>
            <Typography variant={"h3"}>
               Related Products
            </Typography>
            <BestSellingProduct />
         </section>
         <section className={styles.review_section}>
            <Typography variant={"h3"}>
               Ratings & Reviews
            </Typography>
            <Review />
         </section>
      </PageLayout >
   )
};

export default ProductDetailsPage;