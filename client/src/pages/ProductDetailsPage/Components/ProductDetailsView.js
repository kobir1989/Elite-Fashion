import React, { useState } from 'react';
import Icons from '../../../components/Common/Icons/Icons';
import Typography from '../../../components/Common/Typography/Typography';
import Button from '../../../components/Common/Button/Button';
import SelectOptions from '../../../components/Common/SelectOptions/SelectOptions';
import CardSkeleton from "../../../components/Common/Skeleton/CardSkeleton";
import TextSkeleton from '../../../components/Common/Skeleton/TextSkeleton';
import ErrorMessage from '../../../components/Common/Error/ErrorMessage';
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/ProductDetails.module.scss"
import { addToCart, removeOneFromCart } from "../../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Ratings from "../../../components/Common/Ratings/Ratings";
import toast from "react-hot-toast";
import ButtonGroup from "../../../components/Common/Button/ButtonGroup";

const ProductDetailsView = () => {
   const [color, setColor] = useState("")
   const [size, setSize] = useState("")
   const [isEmpty, setIsEmpty] = useState(false)
   const { userInfo } = useSelector(state => state.auth);
   const { error, isLoading, products } = useSelector(state => state.product);
   const { cartItem } = useSelector(state => state.cart);
   const findQntt = cartItem.find(qntt => qntt.id === products._id);
   const navigate = useNavigate()
   const dispatch = useDispatch();
   const cartHandler = (item) => {
      if (!userInfo) {
         toast.dismiss()
         toast.error("Please log in to add items to your cart")
         navigate("/login")
      }
      if (!color || !size) {
         setIsEmpty(true)
         return
      }
      if (products?.stock <= 0 || (findQntt && findQntt.quantity >= products.stock)) {
         toast.dismiss()
         return toast.error("This product is currently out of stock")
      }
      dispatch(addToCart(item));
   }
   const removeHandler = (id) => {
      dispatch(removeOneFromCart(id))
   }

   const checkoutHandler = () => {
      if (findQntt.quantity > 0) {
         navigate("/cart")
      }
   }
   return (
      <div className={styles.product_page_details_wrapper}>
         {error && <ErrorMessage />}
         <div className={styles.img_wrapper}>
            <img src={products?.image} alt="" />
            {isLoading &&
               <CardSkeleton
                  width={"100%"}
                  height={"36rem"}
                  col={1} />
            }
         </div>
         {isLoading ?
            <div className={styles.skeleton_wrapper}>
               <TextSkeleton
                  row={10}
                  height={12} />
            </div>
            :
            <div className={styles.product_info}>
               <div className={styles.text_wrapper}>
                  <Typography variant={"h3"}>{products?.title}</Typography>
                  <Ratings />
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
                  <Typography variant={"h5"} color={products?.stock > 0 ? "success" : "red"}>
                     {products?.stock > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                  {
                     products?.stock > 0 ? <Icons name={"check"} color={"#116954"} /> : <Icons name={"delete"} color={"#cc2121"} />
                  }
               </div>
               <div className={styles.buttons_wrapper}>
                  <ButtonGroup
                     onRemove={() => { removeHandler(products?._id) }}
                     onAdd={() => {
                        cartHandler({
                           title: products?.title,
                           imageUrl: products?.image,
                           price: products?.price,
                           id: products?._id,
                           quantity: 1,
                           color: color,
                           size: size
                        })
                     }}
                     quantity={findQntt?.quantity}
                  />
                  <div className={styles.checkout_btn_wrapper}>
                     {findQntt && findQntt.quantity > 0 ?
                        <Button variant={"primary"}
                           onClick={checkoutHandler}>
                           Checkout
                        </Button>
                        : <></>
                     }
                  </div>
               </div>
            </div>
         }
      </div>
   )
}

export default ProductDetailsView;