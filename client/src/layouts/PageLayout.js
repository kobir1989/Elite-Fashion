import React, { useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer/Footer';
import styles from "./styles/PageLayout.module.scss";
import { useSelector } from "react-redux";
import WisListModal from '../components/WishListModal/WishListModal';
import SearchPopup from '../components/SearchPopup/SearchPopup';
import { motion } from "framer-motion";
const PageLayout = (props) => {
   const { toggleWishList } = useSelector(state => state.wishList);
   const { openSearchBox } = useSelector(state => state.search);
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0, transition: { duration: 0.3 } }}>
         <Navbar />
         <main className={styles.main_wrapper}>
            {toggleWishList && <WisListModal />}
            {openSearchBox && <SearchPopup />}
            {props.children}
         </main>
         <Footer />
      </motion.div>
   )
}

export default PageLayout;