import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Hero from './Components/Hero';
import CategoriesSection from './Components/CategoriesSection';
import styles from "./styles/HomePage.module.scss";
import InfoBanner from './Components/InfoBanner';
import Banner from './Components/Banner';

const HomePage = () => {
   return (
      <PageLayout>
         <section>
            <Hero />
         </section>
         <section>
            <InfoBanner />
         </section>
         <section>
            <CategoriesSection />
         </section>
         <section>
            <Banner />
         </section>
      </PageLayout>
   )
}

export default HomePage;