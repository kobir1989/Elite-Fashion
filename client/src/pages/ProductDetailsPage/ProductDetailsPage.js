import PageLayout from "../../layouts/PageLayout";
import styles from "./styles/ProductDetails.module.scss";
import { useParams } from 'react-router-dom';
import Typography from '../../components/Common/Typography/Typography';
import BestSellingProduct from "../../components/BestSellingProduct/BestSellingProduct";
import ProductDetailsView from './Components/ProductDetailsView';
import Review from './Components/Review';
import { useFetchSingleProductQuery } from '../../redux/features/products/productApi'

const ProductDetailsPage = () => {
   const { id } = useParams()
   const { data: singleProduct, isError, isLoading } = useFetchSingleProductQuery(id)

   return (
      <PageLayout>
         <ProductDetailsView
            product={singleProduct?.products}
            isError={isError}
            isLoading={isLoading}
         />
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