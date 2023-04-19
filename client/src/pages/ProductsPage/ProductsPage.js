import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import ProductsLayout from '../../layouts/ProductsLayout';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productsAction";
import CardSkeleton from '../../components/Common/Skeleton/CardSkeleton';
import ProductCard from '../../components/Common/Card/ProductCard';
import ErrorMessage from '../../components/Common/Error/ErrorMessage';
import Pagination from '../../components/Pagenation/Pagination';
import { setProductPage } from "../../redux/features/products/productsSlice";
const ProductsPage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const {
      isLoading,
      error,
      pagination,
      products,
      page
   } = useSelector(state => state.product);
   useEffect(() => {
      dispatch(fetchProducts(`/${id}/products?page=${page}&limit=12`));
   }, [id, page, dispatch]);

   const productPaginationHandler = (pageCount) => {
      dispatch(setProductPage(pageCount))
   }
   return (
      <PageLayout>
         {error && <ErrorMessage />}
         <ProductsLayout>
            {products && products.length ? products.map((product) => (
               <ProductCard
                  title={product?.title}
                  price={product?.price}
                  sellPrice={product?.sellPrice}
                  imageUrl={product?.image}
                  linkTo={`/product-details/${product?._id}`}
                  key={product?._id}
                  id={product?._id}
               />
            )) : null}
            {isLoading &&
               <CardSkeleton
                  col={12}
                  text={true}
                  width={"100%"}
                  height={"28rem"}
               />
            }

         </ProductsLayout>
         <Pagination
            page={page}
            paginationHandler={productPaginationHandler}
            api={pagination} />
      </PageLayout>
   )
}

export default ProductsPage;