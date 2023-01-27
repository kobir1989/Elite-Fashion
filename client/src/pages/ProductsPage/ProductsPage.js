import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import ProductsLayout from '../../layouts/ProductsLayout';
import styles from "./styles/ProductsPage.module.scss";
import Button from '../../components/Common/Button/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productsAction";
import { loadPage } from "../../redux/features/productsSlice";
import CardSkeleton from '../../components/Common/Skeleton/CardSkeleton';
import ProductCard from '../../components/Common/Card/ProductCard';
import ErrorMessage from '../../components/Common/Error/ErrorMessage';

const ProductsPage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const {
      isLoading,
      error,
      products,
      page
   } = useSelector(state => state.product);
   const { cartItem, quantity, totalAmount } = useSelector(state => state.cart);
   console.log(cartItem, quantity, totalAmount, "CART CHECK")
   useEffect(() => {
      dispatch(fetchProducts(`/${id}/products?page=${page}&limit=12`))
   }, [id, page, dispatch]);

   const numberOfPages = Array(products?.totalPage)
      .fill().map((_, index) => index + 1);

   return (
      <PageLayout>
         {error && <ErrorMessage />}
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

         </ProductsLayout>
         <div className={styles.pagination_buttons}>
            {products?.previous &&
               <Button variant={"icon-btn-white"} onClick={() => { dispatch(loadPage(1)) }}>
                  <ArrowBackIosIcon sx={{ fontSize: "1rem" }} />
               </Button>}
            {numberOfPages.map((pg, index) => (
               <div key={index}>
                  <Button variant={page === pg ? "btn-black-small" : "icon-btn-white"} onClick={() => { dispatch(loadPage(pg)) }} >
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

export default ProductsPage;