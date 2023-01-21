import React, { useEffect, useState } from 'react';
import Icons from '../../components/Common/Icons/Icons';
import PageLayout from "../../layouts/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles/ProductDetails.module.scss";
import { useParams } from 'react-router-dom';
import Typography from '../../components/Common/Typography/Typography';
import Button from '../../components/Common/Button/Button';
import { fetchProducts } from "../../redux/actions/productsAction";
import SelectOptions from '../../components/Common/SelectOptions/SelectOptions';
import CardSkeleton from "../../components/Common/Skeleton/CardSkeleton";
import TextSkeleton from '../../components/Common/Skeleton/TextSkeleton';
import Error500 from "../../components/Common/Error/Error500";
import { addToCart, removeOneFromCart } from "../../redux/features/cartSlice";
import { isAuth } from "../../helpers/isAuth.helper";
import { useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
   const [color, setColor] = useState("")
   const [size, setSize] = useState("")
   const [isEmpty, setIsEmpty] = useState(false)
   const { error, isLoading, products } = useSelector(state => state.product);
   const { userInfo } = useSelector(state => state.auth);
   const { cartItem } = useSelector(state => state.cart);
   const qntt = cartItem.find(qntt => qntt.id === products._id);
   const { id } = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch();
   const isLoggedIn = isAuth(userInfo);

   useEffect(() => {
      dispatch(fetchProducts(`/product/single/${id}`));
   }, [id, dispatch]);

   const cartHandler = (item) => {
      if (!isLoggedIn) {
         navigate("/login")
      }
      if (!color || !size) {
         setIsEmpty(true)
         return
      }
      dispatch(addToCart(item));
   }

   const removeHandler = (id) => {
      dispatch(removeOneFromCart(id))
   }
   return (
      <PageLayout>
         <div className={styles.product_page_details_wrapper}>
            {error && <Error500 />}
            <div className={styles.img_wrapper}>
               <img src={products?.image} alt="" />
               {isLoading &&
                  <CardSkeleton
                     width={"100%"}
                     height={"36rem"}
                     col={1} />
               }
            </div>
            <div className={styles.product_info}>
               {isLoading &&
                  <TextSkeleton
                     row={8}
                     width={"100%"}
                     height={"100%"} />
               }
               <div className={styles.text_wrapper}>
                  <Typography variant={"h3"}>{products?.title}</Typography>
                  <Typography variant={"h3"}>&#2547; {products?.price}</Typography>
                  <Typography variant={"body"}>{products?.description}</Typography>
               </div>
               <div className={styles.options}>
                  <SelectOptions
                     label={"SIZE"}
                     error={isEmpty ? true : false}
                     errorMessage={"Color and Size are Required"}
                     onChange={(e) => { setSize(e.target.value) }}
                     value={size}
                     options={[
                        "SMALL",
                        "MEDIUM",
                        "LARGE",
                        "XL",
                        "XXL"
                     ]} />
                  <SelectOptions
                     onChange={(e) => { setColor(e.target.value) }}
                     label={"COLOR"}
                     error={isEmpty ? true : false}
                     errorMessage={"Color and Size are Required"}
                     value={color}
                     options={["BLUE", "RED"]} />
               </div>
               <div className={styles.stock}>
                  <Typography variant={"h5"} color={products?.stock > 0 ? "success" : "red"}>
                     Availability:
                  </Typography>
                  <Typography variant={"h5"} color={products?.stock > 0 ? "success" : "#cc2121"}>
                     {products?.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                  {
                     products?.stock > 0 ? <Icons name={"check"} color={"#116954"} /> : <Icons name={"delete"} color={"#cc2121"} />
                  }
               </div>
               <div className={styles.buttons_wrapper}>
                  <div className={styles.item_count_buttons}>
                     <Button variant={"icon-btn-normal"} onClick={() => { removeHandler(products?._id) }}>
                        <Icons name={"subtract"} color={"#cc2121"} />
                     </Button>
                     <Typography variant={"h5"}>
                        {qntt?.quantity || 0}
                     </Typography>
                     <Button variant={"icon-btn-normal"}
                        onClick={() => {
                           cartHandler({
                              title: products?.title,
                              imageUrl: products?.image,
                              price: products?.price,
                              id: products?._id,
                              quantity: 1,
                              color: color,
                              size: size
                           })
                        }}>
                        <Icons name={"add"} color={"#116954"} />
                     </Button>
                  </div>
                  <Button variant={"btn-black"} onClick={() => {
                     cartHandler({
                        title: products?.title,
                        imageUrl: products?.image,
                        price: products?.price,
                        id: products?._id,
                        quantity: 1
                     })
                  }}>
                     Add to Cart
                  </Button>
               </div>
            </div>
         </div>
         {/*****TODO: add later****/}
         <div className={styles.related_products}>
            <Typography variant={"h3"}>
               Related Products
            </Typography>
         </div>
      </PageLayout >
   )
};

export default ProductDetailsPage;