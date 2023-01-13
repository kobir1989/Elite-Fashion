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
import { loadPage } from "../../redux/features/productsSlice";
import CardSkeleton from '../../components/Common/Skeleton/CardSkeleton';
import ProductCard from '../../components/Common/Card/ProductCard';
import Error500 from "../../components/Common/Error/Error500";

const Products = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const {
      isLoading,
      error,
      products,
      page
   } = useSelector(state => state.product);
   // console.log(page)
   useEffect(() => {
      dispatch(fetchProducts(`/${id}/products?page=${page}&limit=12`))
   }, [id, page]);

   const numberOfPages = Array(products?.totalPage)
      .fill().map((_, index) => index + 1);

   return (
      <PageLayout>
         <ProductsLayout>
            {products?.result?.map((product) => (
               <ProductCard
                  title={product?.title}
                  price={product?.price}
                  imageUrl={product?.image}
                  linkTo={`/product-details/${product?._id}`}
                  key={product?._id}
                  id={product?._id}
               />
            ))}
            {isLoading &&
               <CardSkeleton
                  col={12}
                  text={true}
                  width={"100%"}
                  height={"28rem"}
               />
            }
            {error && <Error500 />}
         </ProductsLayout>
         <div className={styles.pagination_buttons}>
            {products?.previous &&
               <Button variant={"icon-btn-white"} onClick={() => { dispatch(loadPage(1)) }}>
                  <ArrowBackIosIcon sx={{ fontSize: "1rem" }} />
               </Button>}
            {numberOfPages.map((pg, index) => (
               <div key={index}>
                  <Button variant={page === pg ? "icon-btn-black" : "icon-btn-white"} onClick={() => { dispatch(loadPage(pg)) }} >
                     {pg}
                  </Button>
               </div>
            ))}
            {products?.next &&
               <Button variant={"icon-btn-white"} onClick={() => { dispatch(loadPage(numberOfPages.length)) }}>
                  <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
               </Button>
            }
         </div>
      </PageLayout>
   )
}

export default Products;