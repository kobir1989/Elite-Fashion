import * as React from 'react';
import Slider from 'react-slick';
import Button from "../../../components/Common/Button/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Hero.module.scss";
import { NextArrow, PrevArrow } from "../../../components/Common/CaroselBtn/CaroselBtn";
import Typography from "../../../components/Common/Typography/Typography";

const Hero = () => {
   const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      centerPadding: "0px",
      centerMode: true,
      // nextArrow: <NextArrow mr={"-3%"} />,
      // prevArrow: <PrevArrow ml={"-2%"} />,
   };
   return (
      <div>
         <Slider {...settings}>
            <div className={`${styles.slider_cover_wrapper} ${styles.cover_1}`}>
               <img src="assets/shoe-cover.webp" alt="cover" />
               <div className={styles.cover_text}>
                  <Typography color={"white"} variant={"h1"}>
                     Everything you <br /> need, on a
                     <span className={styles.span_text}> budget</span>
                  </Typography>
                  <Typography color={"white"} variant={"subtitle"}>
                     Buy More, Spend Less
                  </Typography>
                  <span className={styles.discount}>Up to 50% off!</span>
                  <div> <Button variant={"white"}>Shop Now</Button></div>
               </div>
            </div>
            <div className={`${styles.slider_cover_wrapper} ${styles.cover_2}`}>
               <img src="assets/model 2.webp" alt="cover" />
               <div className={styles.cover_text}>
                  <Typography color={"white"} variant={"h1"}>
                     There is
                     <span className={styles.span_text}> Luxury</span>
                     <br /> in Simplicity
                  </Typography>
                  <Typography color={"white"} variant={"subtitle"}>
                     Fall In Love with the best Things in This Season
                  </Typography>
                  <span className={styles.discount}>Up to 35% off!</span>
                  <div>   <Button variant={"white"}>Shop Now</Button></div>
               </div>
            </div>
            <div className={`${styles.slider_cover_wrapper} ${styles.cover_3}`}>
               <img src="assets/model1.webp" alt="cover" />
               <div className={styles.cover_text}>
                  <Typography color={"white"} variant={"h1"}>
                     Get the <span className={styles.span_text}>celebrity </span> <br />look you have been craving

                  </Typography>
                  <Typography color={"white"} variant={"subtitle"}>
                     Your favorite products made affordable for you
                  </Typography>
                  <span className={styles.discount}>Up to 25% off!</span>
                  <div><Button variant={"white"}>Shop Now</Button></div>
               </div>
            </div>
         </Slider>
      </div>
   )
}

export default Hero