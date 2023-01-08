import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer/Footer';
import styles from "./styles/PageLayout.module.scss";

const PageLayout = (props) => {
   return (
      <>
         <Navbar />
         <main className={styles.main_wrapper}>{props.children}</main>
         <Footer />
      </>
   )
}

export default PageLayout;