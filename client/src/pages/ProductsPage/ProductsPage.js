import PageLayout from "../../layouts/PageLayout";
import { useParams } from "react-router-dom";
import ProductsLayout from '../../layouts/ProductsLayout';
import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from '../../components/Common/Skeleton/CardSkeleton';
import ProductCard from '../../components/Common/Card/ProductCard';
import ErrorMessage from '../../components/Common/Error/ErrorMessage';
import Pagination from '../../components/Pagenation/Pagination';
import { setProductPage } from "../../redux/features/products/productsSlice";
import { useFetchPoductsQuery } from '../../redux/features/products/productApi'

const ProductsPage = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { page } = useSelector(state => state.product);
   const { data: products, isError, isLoading } = useFetchPoductsQuery({ id, page })

   //Pagination Handler
   const productPaginationHandler = (pageCount) => {
      dispatch(setProductPage(pageCount))
   }

   return (
      <PageLayout>
         {isError && <ErrorMessage />}
         <ProductsLayout>
            {!isError && !isLoading && products?.products?.length ? products?.products.map((product) => (
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
            api={products?.pagination} />
      </PageLayout>
   )
}

export default ProductsPage;