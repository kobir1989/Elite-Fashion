import React, { useEffect } from 'react';
import PageLayout from '../../layouts/PageLayout';
import Hero from './Components/Hero';
import CategoriesSection from './Components/CategoriesSection';
import styles from "./styles/HomePage.module.scss";
import InfoBanner from './Components/InfoBanner';
import Banner from './Components/Banner';
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
            <BestSellingProduct />
         </section>
         <section>
            <CategoriesSection />
         </section>
         <section>
            <Banner />
         </section>
         <section>
            <InfoBanner />
         </section>
      </PageLayout>
   )
}

export default HomePage;