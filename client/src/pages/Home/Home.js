import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Hero from './Components/Hero';
import CategoriesSection from './Components/CategoriesSection';
import styles from "./styles/Home.module.scss";
import DiscountSection from './Components/DiscountSection';

const Home = () => {
   return (
      <PageLayout>
         <section>
            <Hero />
         </section>
         <section>
            <CategoriesSection />
         </section>
         <section>
            <DiscountSection />
         </section>
      </PageLayout>
   )
}

export default Home;