import React from 'react';
import PageLayout from '../../layouts/PageLayout';
import Hero from './Components/Hero';

const Home = () => {
   return (
      <PageLayout>
         <section>
            <Hero />
         </section>
      </PageLayout>
   )
}

export default Home;