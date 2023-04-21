import React, { useEffect, useState } from 'react';
import styles from "./styles/HomePage.module.scss";
import PageLayout from '../../layouts/PageLayout';
import Hero from './Components/Hero';
import TopCategoriesSection from './Components/TopCategoriesSection';
import InfoBanner from '../../components/Common/Banner/InfoBanner';
import Banner from '../../components/Common/Banner/Banner';
import BestSellingProduct from '../../components/BestSellingProduct/BestSellingProduct';
import { useSelector } from "react-redux";
import DiscountModal from '../../components/DiscountModal/DiscountModal';

const HomePage = () => {
   const [showPopup, setShowPopup] = useState(true)
   const { userInfo } = useSelector(state => state.auth)

   const discountModalHandler = () => {
      setShowPopup(false)
   }
   return (
      <PageLayout>
         {showPopup && <DiscountModal handler={discountModalHandler} />}
         <section>
            <Hero />
         </section>
         <section>
            <BestSellingProduct title={" Best Selling Products"} />
         </section>
         <section>
            <TopCategoriesSection />
         </section>
         <section className={styles.banner_section}>
            <InfoBanner />
            {userInfo ?
               <Banner
                  title={"Elevate Your Wardrobe with Elite Designer Clothes"}
                  subTitle={"Step out in style with the latest haute couture and luxury fashion pieces from the world's top designers"}
                  btnTitle={"Discover Elite Designer Wear"}
                  linkTo={"products/63c99e4120fee5a7b9298445"} />
               :
               <Banner
                  title={"New members get 10% off their first purchase! Not a member yet? Join now, it's free."}
                  subTitle={"We always offer free standard delivery and Click & Collect for orders over $20 for Members. Returns are free and flexible."}
                  btnTitle={"Become a Member"}
                  linkTo={"signup"} />}
         </section>
      </PageLayout>
   )
}

export default HomePage;