import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/PageLayout';
import Hero from './Components/Hero';
import TopCategoriesSection from './Components/TopCategoriesSection';
import styles from "./styles/HomePage.module.scss";
import InfoBanner from '../../components/Common/Banner/InfoBanner';
import Banner from '../../components/Common/Banner/Banner';
import BestSellingProduct from '../../components/BestSellingProduct/BestSellingProduct';
import { useDispatch } from "react-redux";
import { fetchBestSellingProducts } from "../../redux/actions/bestSellingAction";
import DiscountModal from '../../components/DiscountModal/DiscountModal';

const HomePage = () => {
   const [showPopup, setShowPopup] = useState(true)
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(fetchBestSellingProducts())
   }, [dispatch]);

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
         <section>
            <InfoBanner />
         </section>
         <section>
            <Banner />
         </section>
      </PageLayout>
   )
}

export default HomePage;