import React, { useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer/Footer';
import styles from "./styles/PageLayout.module.scss";
import { useSelector } from "react-redux";
import WisListModal from '../components/WishListModal/WishListModal';
import SearchPopup from '../components/SearchPopup/SearchPopup';
const PageLayout = (props) => {
   const { toggleWishList } = useSelector(state => state.wishList);
   const { openSearchBox } = useSelector(state => state.search);
   return (
      <>
         <Navbar />
         <main className={styles.main_wrapper}>
            {toggleWishList && <WisListModal />}
            {openSearchBox && <SearchPopup />}
            {props.children}
         </main>
         <Footer />
      </>
   )
}

export default PageLayout;