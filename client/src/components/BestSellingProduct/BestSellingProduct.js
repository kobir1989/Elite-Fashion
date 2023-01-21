import React, { useEffect } from 'react';
import Slider from 'react-slick';
import styles from "./styles/BestSellingProduct.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Common/Card/ProductCard";
import CardSkeleton from '../Common/Skeleton/CardSkeleton';
import { useSelector } from "react-redux";
import Typography from '../Common/Typography/Typography';
import { NextArrow } from '../Common/Button/SliderButton';
import { PrevArrow } from '../Common/Button/SliderButton';

const settings = {
   // dots: true,
   infinite: true,
   // autoplay: true,
   speed: 500,
   arrows: true,
   slidesToShow: 4,
   slidesToScroll: 1,
   draggable: true,
   centerPadding: "0px",
   centerMode: true,
   nextArrow: <NextArrow />,
   prevArrow: <PrevArrow />,
   responsive: [
      {
         breakpoint: 1022,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 3,
         }
      },
      {
         breakpoint: 600,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
         }
      },
      {
         breakpoint: 480,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
         }
      }
   ]
};

const BestSellingProduct = () => {
   const { error, isLoading, bestSellingProducts } = useSelector(state => state.bestSelling);

   return (
      <div className={styles.best_selling_product_wrapper}>
         <div className={styles.best_selling_title}>
            <Typography variant={"h3"}>
               Best Selling Products
            </Typography>
         </div>
         <div className={styles.slider_wrapper}>
            <Slider {...settings}>
               {
                  bestSellingProducts.map((product) => (
                     <div className={styles.best_selling_product_card}>
                        <ProductCard
                           title={product?.title}
                           imageUrl={product?.image}
                           linkTo={`/product-details/${product?._id}`}
                           price={product?.price}
                           id={product?._id} />
                     </div>
                  ))
               }
            </Slider>
         </div>
         {isLoading &&
            <div className={styles.skeleton}>
               <CardSkeleton
                  col={4}
                  text={true}
                  width={"20rem"}
                  height={"22rem"}
               />
            </div>
         }
         {error &&
            <Typography variant={"body"}>Something went wrong!</Typography>
         }
      </div>
   )
}

export default BestSellingProduct;