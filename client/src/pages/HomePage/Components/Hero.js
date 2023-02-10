import * as React from 'react';
import Slider from 'react-slick';
import Button from "../../../components/Common/Button/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Hero.module.scss";
import Typography from "../../../components/Common/Typography/Typography";
import { Link } from "react-router-dom";
import CardBanner from "../../../components/Common/Banner/CardBanner";

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
      centerMode: false,
   };
   return (
      <div className={styles.hero_section_wrapper}>
         <Slider {...settings}>
            <div className={styles.slider_cover_wrapper}>
               <div className={styles.cover_1}>
                  <div className={styles.cover_text}>
                     <Typography color={"white"} variant={"h1"}>
                        Everything you <br /> need, on a
                        <span className={styles.span_text}> Budget
                        </span>
                     </Typography>
                     <Typography color={"white"} variant={"subtitle"}>
                        Buy More, Spend Less
                     </Typography>
                     <span className={styles.discount}>
                        Up to 50% off!
                     </span>
                     <div>
                        <Link to="/sub-category/63b848e91e0644fd041c8ee3">
                           <Button variant={"white"}>
                              Shop Now
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.slider_cover_wrapper}>
               <div className={styles.cover_2}>
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
                     <div>
                        <Link to="sub-category/63b848501e0644fd041c8ee0">
                           <Button variant={"white"}>
                              Shop Now
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </Slider>
         <div className={styles.banner_wrapper}>
            <CardBanner
               imgUrl={"/assets/banner11.jpg"}
               title={"For Men's"}
               subTitle={"Starting at 599 TK."}
               position={"left"}
               linkTo={"sub-category/63b848501e0644fd041c8ee0"}
            />
            <CardBanner
               imgUrl={"/assets/banner-12.jpg"}
               title={"For Women's"}
               subTitle={"Up to 25% Off"}
               position={"right"}
               linkTo={"/sub-category/63b848e91e0644fd041c8ee3"}
            />
         </div>
      </div>
   )
}

export default Hero