import React, { useEffect } from 'react';
import PageLayout from "../../layouts/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductDetails.module.scss";
import { useParams } from 'react-router-dom';
import Typography from '../../components/Common/Typography/Typography';
import Button from '../../components/Common/Button/Button';
import { fetchProducts } from "../../redux/actions/productsAction";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SelectOptions from '../../components/Common/SelectOptions/SelectOptions';
import CancelIcon from '@mui/icons-material/Cancel';

const ProductDetails = () => {
   const { id } = useParams()
   const dispatch = useDispatch();
   const { error, isLoading, products } = useSelector(state => state.product);
   console.log(products)

   useEffect(() => {
      dispatch(fetchProducts(`/product/single/${id}`))
   }, [id])
   return (
      <PageLayout>
         <div className={styles.product_page_details_wrapper}>
            <div className={styles.img_wrapper}>
               <img src={products?.image} alt="" />
            </div>
            <div className={styles.product_info}>
               <div className={styles.text_wrapper}>
                  <Typography variant={"h3"}>{products?.title}</Typography>
                  <Typography variant={"h3"}>&#2547; {products?.price}</Typography>
                  <Typography variant={"body"}>{products?.description}</Typography>
               </div>
               <div className={styles.size}>
                  <SelectOptions
                     label={"SIZE"}
                     options={[
                        "SMALL",
                        "MEDIUM",
                        "LARGE",
                        "XL",
                        "XXL"
                     ]} />
                  <SelectOptions
                     label={"COLOR"}
                     options={["BLUE", "RED"]} />
               </div>
               <div className={styles.stock}>
                  <Typography variant={"h5"} color={products?.stock > 0 ? "success" : "danger"}>
                     Availability:
                  </Typography>
                  <Typography variant={"h5"} color={products?.stock > 0 ? "success" : "danger"}>
                     {products?.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                  {
                     products?.stock > 0 ? <CheckCircleIcon sx={{ color: "#116954" }} /> : <CancelIcon sx={{ color: "#cc2121" }} />
                  }
               </div>
               <div className={styles.buttons_wrapper}>
                  <div className={styles.item_count_buttons}>
                     <Button variant={"icon-btn-normal"}><AddIcon /></Button>
                     <Typography variant={"h5"}>1</Typography>
                     <Button variant={"icon-btn-normal"}><RemoveIcon /></Button>
                  </div>
                  <Button variant={"btn-black"}>Add to Cart</Button>
               </div>
            </div>
         </div>
         {/*********/}
         <div className={styles.related_products}>
            <Typography variant={"h3"}>Related Products</Typography>
         </div>
      </PageLayout>
   )
};

export default ProductDetails;