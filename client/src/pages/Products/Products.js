import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import ProductsLayout from '../../layouts/ProductsLayout';
import styles from "./Products.module.scss";
import Button from '../../components/Common/Button/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productsAction";
import { nextPage, prevPage } from "../../redux/features/productsSlice";
import CardSkeleton from '../../components/Common/Skeleton/CardSkeleton';
import TextSkeleton from "../../components/Common/Skeleton/TextSkeleton";
import ProductCard from '../../components/Common/Card/ProductCard';
import Error500 from "../../components/Common/Error/Error500";

const Products = () => {
   const { id } = useParams()
   const dispatch = useDispatch();
   const { isLoading, error, products, page } = useSelector(state => state.product);
   console.log(page)
   useEffect(() => {
      dispatch(fetchProducts({ page, id }))
   }, [id, page])
   return (
      <PageLayout>
         <ProductsLayout>
            {products?.result?.map((product) => (
               <div key={product?._id}>
                  <ProductCard
                     title={product?.title}
                     price={product?.price}
                     imageUrl={product?.image}
                  />
               </div>
            ))}
            {isLoading &&
               <div>
                  <CardSkeleton />
                  <TextSkeleton />
               </div>
            }
            {error && <Error500 />}
         </ProductsLayout>
         <div className={styles.pagination_buttons}>
            <Button variant={"icon-btn-white"} onClick={() => { dispatch(prevPage()) }}>
               <ArrowBackIosIcon sx={{ fontSize: "1rem" }} />
            </Button>
            <Button variant={"icon-btn-black"}>
               1
            </Button>
            <Button variant={"icon-btn-white"} onClick={() => { dispatch(nextPage()) }}>
               <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
            </Button>
         </div>
      </PageLayout>
   )
}

export default Products;