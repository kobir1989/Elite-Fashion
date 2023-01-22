import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import styles from "./styles/ProductDetails.module.scss";
import { useParams } from 'react-router-dom';
import Typography from '../../components/Common/Typography/Typography';
import { fetchProducts } from "../../redux/actions/productsAction";
import BestSellingProduct from "../../components/BestSellingProduct/BestSellingProduct";
import { fetchBestSellingProducts } from "../../redux/actions/bestSellingAction";
import ProductDetailsView from './Components/ProductDetailsView';
import { useSelector, useDispatch } from "react-redux";

const ProductDetailsPage = () => {
   const dispatch = useDispatch()
   const { id } = useParams()
   useEffect(() => {
      dispatch(fetchProducts(`/product/single/${id}`));
      dispatch(fetchBestSellingProducts())
   }, [id, dispatch]);

   return (
      <PageLayout>

         <ProductDetailsView />
         <div className={styles.related_products}>
            <Typography variant={"h3"}>
               Related Products
            </Typography>
            <BestSellingProduct />
         </div>
      </PageLayout >
   )
};

export default ProductDetailsPage;