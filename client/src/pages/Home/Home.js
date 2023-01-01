import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Hero from './Components/Hero';
import CategoriesSection from './Components/CategoriesSection';
import styles from "./styles/Home.module.scss";

const Home = () => {
   return (
      <PageLayout>
         <section>
            <Hero />
         </section>
         <section>
            <CategoriesSection />
         </section>
      </PageLayout>
   )
}

export default Home;