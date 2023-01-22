import React, { useEffect } from 'react';
import PageLayout from '../../layouts/PageLayout';
import Hero from './Components/Hero';
import TopCategoriesSection from './Components/TopCategoriesSection';
import styles from "./styles/HomePage.module.scss";
import InfoBanner from '../../components/Common/Banner/InfoBanner';
import Banner from '../../components/Common/Banner/Banner';
import BestSellingProduct from '../../components/BestSellingProduct/BestSellingProduct';
import { useDispatch } from "react-redux";
import { fetchBestSellingProducts } from "../../redux/actions/bestSellingAction";
const HomePage = () => {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(fetchBestSellingProducts())
   }, [dispatch]);

   return (
      <PageLayout>
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